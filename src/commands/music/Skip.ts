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
                embeds: [
                    {
                        color: client.util.defaults.embed.color,
                        author: {
                            name: "Looks like you've been lost in the void.",
                            iconURL: interaction.user.avatarURL({ dynamic: true }) as string
                        },
                        description: `${client.markdown.userMention(interaction.user.id)}, it seems I was unable to skip the currently playing song as you requested as you are not in a voice channel. Please join a voice channel first and then rerun the command.` 
                    }
                ],
                ephemeral: true
            });

            if (!client.queues.get(interaction.guildId)) return interaction.reply({
                embeds: [
                    {
                        color: client.util.defaults.embed.color,
                        description: "Nothing is currently playing in a voice channel in the server."
                    }
                ]
            });

            const guildQueue: Queue = client.queues.get(interaction.guildId) as Queue;

            guildQueue.playNext();
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ Skip Command ] ${(error as Error).stack}`);
        };
    };
};