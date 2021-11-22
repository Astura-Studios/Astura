import { AsturaClient } from "../../client/Client";
import { Command } from "../../structures/Command";
import { CommandInteraction, GuildMember, Message, TextChannel } from "discord.js";
import { Queue } from "../../structures/music/Queue";
import { configOptions } from "../../client/Config";

export default class SkipCommand extends Command {
    public constructor() {
        super("skip", {
            category: "Music",
            channel: "guild",
            cooldown: 5,
            description: "Skips the current song in the queue being played.",
            enabledByDefault: true,
            examples: [
                "skip"
            ],
            exceptions: {
                ignoreCooldown: configOptions.owners,
                ignorePermissions: configOptions.owners
            },
            isSubCommand: false,
            ownerOnly: false,
            permissions: {
                clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "USE_EXTERNAL_EMOJIS", "MANAGE_MESSAGES"],
                userPermissions: ["SEND_MESSAGES"]
            },
            usage: "skip"
        });
    };

    public async exec(client: AsturaClient, interaction: CommandInteraction): Promise<any> {
        try {
            if (!(interaction.member as GuildMember).voice.channel) return interaction.reply({
                content: "You aren't in a voice channel",
                ephemeral: true
            });

            const guildQueue: Queue = client.queues.get(interaction.guildId) as Queue;

            if (!guildQueue) return interaction.reply({
                content: "Nothing is playing.",
                ephemeral: true
            });

            guildQueue.playNext();
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ Skip Command ] ${(error as Error).stack}`);
        };
    };
};