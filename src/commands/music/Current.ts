import { AsturaClient } from "../../client/Client";
import { Command } from "../../structures/Command";
import { CommandInteraction, Message } from "discord.js";
import { Queue } from "../../structures/music/Queue";
import { Song } from "../../structures/util/Interfaces";
import { configOptions } from "../../client/Config";

export default class NPCommand extends Command {
    public constructor() {
        super("current", {
            category: "Music",
            channel: "guild",
            cooldown: 7,
            description: "Views the song currently being played.",
            enabledByDefault: true,
            examples: [
                "current"
            ],
            exceptions: {
                ignoreCooldown: configOptions.owners,
                ignorePermissions: configOptions.owners
            },
            isSubCommand: false,
            ownerOnly: false,
            permissions: {
                clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES", "USE_EXTERNAL_EMOJIS",],
                userPermissions: ["SEND_MESSAGES"]
            },
            usage: "current"
        });
    };

    public async exec(client: AsturaClient, interaction: CommandInteraction): Promise<Message<boolean> | void> {
        try {

            if (!client.queues.get(interaction.guildId)) return interaction.reply({
                embeds: [
                    {
                        color: client.util.defaults.embed.color,
                        description: "Nothing is currently playing in a voice channel in the server."
                    }
                ]
            });

            const guildQueue: Queue = client.queues.get(interaction.guildId) as Queue;
            const song: Song = guildQueue.currentlyPlaying as Song;

            return interaction.reply({
                embeds: [
                    {
                        color: client.util.defaults.embed.color,
                        title: `Currently playing: ${song.info.author}`,
                        fields: [
                            { name: "Author", value: song.info.author, inline: true },
                            { name: "Length", value: client.util.date.convertFromMs(song.info.length, true, "d:h:m:s", "max") as string, inline: true },
                            { name: "Link", value: song.info.uri, inline: true } 
                        ]
                    }
                ]
            });
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ Current Command ] ${(error as Error).stack}`);
        };
    };
};