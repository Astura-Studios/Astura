import { AsturaClient } from "../../client/Client";
import { Command } from "../../structures/Command";
import { CommandInteraction, Guild, Message } from "discord.js";
import { Queue } from "../../structures/music/Queue";
import { Song } from "../../structures/util/Interfaces";
import { configOptions } from "../../client/Config";

export default class QueueCommand extends Command {
    public constructor() {
        super("queue", {
            category: "Music",
            channel: "guild",
            cooldown: 7,
            description: "View the current music queue for the server.",
            enabledByDefault: true,
            examples: [
                "queue"
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
            usage: "queue"
        });
    };

    public async exec(client: AsturaClient, interaction: CommandInteraction): Promise<Message<boolean> | void> {
        try {
            if (!client.queues.get(interaction.guildId)) return interaction.reply({
                embeds: [
                    {
                        color: client.util.defaults.embed.color,
                        description: "The music queue for the current server is currently empty."
                    }
                ]
            });

            const guildQueue: Queue = client.queues.get(interaction.guildId) as Queue;
            const next: Song[] = guildQueue.queue;
            const text: string[] = next.map((song: Song, index: number): string => `${++index}) ${song.info.title} - ${song.info.author} - ${client.util.date.convertFromMs(song.info.length, true, "d:h:m:s", "max") as string}`);
            console.log(text);
            return interaction.reply({
                embeds: [
                    {
                        color: client.util.defaults.embed.color,
                        author: {
                            name: `${(interaction.guild as Guild).name} - Server Music Queue`,
                            iconURL: (interaction.guild as Guild).iconURL({ dynamic: true }) as string
                        },
                        thumbnail: {
                            url: (interaction.guild as Guild).iconURL({ dynamic: true }) as string
                        },
                        description: `${text.length <= 0 ? "**The music queue for the current server is currently empty.**" : text.join("\n")}`
                    }
                ]
            });
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ Queue Command ] ${(error as Error).stack}`);
        };
    };
};