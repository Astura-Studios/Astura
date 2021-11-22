import { AsturaClient } from "../../client/Client";
import { Command } from "../../structures/Command";
import { CommandInteraction, Message } from "discord.js";
import { Queue } from "../../structures/music/Queue";
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
            const guildQueue: Queue = client.queues.get(interaction.guildId) as Queue;
            if (!guildQueue) return interaction.channel?.send({
                content: "Nothing is currently playing."
            });

            const next: any[] = guildQueue.queue;
            const text: string[] = next.map((song, index) => `${++index}) ${song.info.title} - ${song.info.author} - ${client.util.date.convertFromMs(song.info.length)}`);

            return interaction.reply({
                embeds: [
                    {
                        color: client.util.defaults.embed.color,
                        title: "Server Queue",
                        description: client.markdown.codeBlock(`${text ?? "Nothing in queue"}\n`)
                    }
                ]
            });
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ Queue Command ] ${(error as Error).stack}`);
        };
    };
};