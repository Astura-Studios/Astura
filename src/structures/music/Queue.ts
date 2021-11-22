import { AsturaClient } from "../../client/Client";
import { TextChannel } from "discord.js";
import { LavalinkNode, Player as LavaPlayer } from "@lavacord/discord.js";
import { Manager } from "./Manager";
import { PlayerOptions } from "../util/Interfaces";

import { config } from "dotenv";
config();

export class Queue {
    public client: AsturaClient
    public currentlyPlaying: any;
    public guildID: string;
    public channelID: string;
    public manager: Manager;
    public player: LavaPlayer | null;
    public textChannel: TextChannel;
    public queue: any[];

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

    public async search(searchQuery: string): Promise<Response> {
        const node: LavalinkNode = this.manager.idealNodes[0];
        const urlRegex: RegExp = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        const params: URLSearchParams = new URLSearchParams();
        params.append("identifier", urlRegex.test(searchQuery) ? searchQuery : `ytsearch:${searchQuery}`);

        const data: Response = await fetch(`http://${node.host}:${node.port}/loadtracks?${params}`, {
            headers: {
                "Authorization": node.password
            }
        });

        console.log(data);

        return (data as any).data.tracks ?? [];
    };

    public async play(track: string): Promise<boolean> {
        this.queue.push(track);

        if (!this.currentlyPlaying) {
            this.playNext();
            return false;
        } else {
            return true;
        };
    };

    public async playNext() {
        const nextSong = this.queue.shift();
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
                        { name: "Author", value: nextSong.info.author, inline: true },
                        { name: "Length", value: this.client.util.date.convertFromMs(nextSong.info.author), inline: true },
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

            this.player.on("end", data => {
                if (data.reason === "REPLACED" || data.reason === "STOPPED") return;

                this.playNext();
            });
        };

        await this.player.play(nextSong.track);
    };
};