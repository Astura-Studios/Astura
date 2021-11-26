import { AsturaClient } from "../../client/Client";
import { TextChannel } from "discord.js";
import { LavalinkEvent, LavalinkNode, Player as LavaPlayer } from "@lavacord/discord.js";
import { Manager } from "./Manager";
import { PlayerOptions, SearchResult, Song } from "../util/Interfaces";
import { config } from "dotenv";
config();

import fetch, { Response } from "node-fetch";

export class Queue {
    public client: AsturaClient;
    public currentlyPlaying: Song | null;
    public guildID: string;
    public channelID: string;
    public manager: Manager;
    public player: LavaPlayer | null;
    public textChannel: TextChannel;
    public queue: Song[];

    public constructor(client: AsturaClient, options: PlayerOptions) {
        this.client = client;
        this.currentlyPlaying = null;
        this.guildID = options.guildID;
        this.channelID = options.channelID;
        this.manager = this.client.manager;
        this.player = null;
        this.textChannel = options.textChannel;
        this.queue = [];
    };

    public async search(searchQuery: string): Promise<Song[] | []> {
        const node: LavalinkNode = this.manager.idealNodes[0];
        const urlRegex: RegExp = new RegExp( /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        const params: URLSearchParams = new URLSearchParams();
        params.append("identifier", urlRegex.test(searchQuery) ? searchQuery : `ytsearch:${searchQuery}`);

        const data: SearchResult = await fetch(
            `http://${node.host}:${node.port}/loadtracks?${params}`,
            {
                headers: {
                    Authorization: node.password
                }
            }
        )
            .then((res: Response) => res.json())

        return data.tracks ?? [];
    };

    public async play(song: Song): Promise<boolean> {
        this.queue.push(song);

        if (!this.currentlyPlaying) {
            this.playNext();
            return false;
        } else {
            return true;
        };
    };

    public async playNext(): Promise<void> {
        const nextSong: Song = this.queue.shift() as Song;
        this.currentlyPlaying = nextSong;

        if (!nextSong) {
            this.player = null;
            this.currentlyPlaying = null;

            await this.manager.leave(this.guildID);
            this.textChannel.send("Finished playing.");
        };

        this.textChannel.send({
            embeds: [
                {
                    color: this.client.util.defaults.embed.color,
                    title: `Now playing: ${nextSong.info.title}`,
                    fields: [
                        {
                            name: "Author",
                            value: nextSong.info.author,
                            inline: true
                        },
                        {
                            name: "Length",
                            value: this.client.util.date.convertFromMs(
                                nextSong.info.length,
                                true,
                                "d:h:m:s",
                                "max"
                            ) as string,
                            inline: true
                        },
                        { name: "Link", value: nextSong.info.uri, inline: true }
                    ]
                }
            ]
        });

        if (!this.player) {
            this.player = await this.manager.join({
                guild: this.guildID,
                channel: this.channelID,
                node: this.manager.idealNodes[0].id
            });

            this.player.on("end", (data: LavalinkEvent): void => {
                if (data.reason === "REPLACED" || data.reason === "STOPPED") return;
                this.playNext();
            });
        };

        await this.player.play(nextSong.track);
    };
};