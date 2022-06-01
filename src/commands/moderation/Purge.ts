import { Argument, Client, SlashCommand } from "../../lib/core/exports";
import { Collection } from "discord.js";
import { CommandInteraction, Message, TextChannel } from "discord.js";
import { Constants } from "../../lib/base/constants";
import { Format } from "../../lib/util/exports";
import { GuildConfig } from "@prisma/client";

export default class PurgeCommand extends SlashCommand {
    public constructor() {
        super("purge", {
            aliases: ["clear"],
            arguments: [
                new Argument({
                    name: "amount",
                    description: "The amoubt of messages to purge in the channel.",
                    required: true,
                    type: "number"
                }),
                new Argument({
                    name: "channel",
                    description: "The channel to purge messages in.",
                    required: false,
                    type: "channel"
                })
            ],
            categoryID: "Moderation",
            channel: "guild",
            cooldown: 10,
            defaultPermission: true,
            description: "Purge a certain amount of messages from a certain channel.",
            examples: [
                "/purge 10",
                "/purge 30",
                "/purge 50 #general"
            ],
            ownerOnly: false,
            permissions: {
                clientPermissions: ["MANAGE_MESSAGES"],
                userPermissions: ["MANAGE_MESSAGES"]
            },
            subCommands: [],
            usage: "/purge <amount> [channel]"
        });
    }

    public async exec(client: Client, interaction: CommandInteraction, Discord: typeof import("discord.js")): Promise<void> {
        const guildConfig: GuildConfig = await client.db.guildConfig.findUnique({
            where: {
                guildID: interaction.guildId as string
            }
        }) as GuildConfig;

        const amount: number = interaction.options.getNumber("amount") as number;
        const channel: TextChannel | null = interaction.options.getChannel("channel") as TextChannel | null;
        const logChannel: TextChannel | null = guildConfig.moderationLogChannelID ? interaction.guild?.channels.cache.get(guildConfig.moderationLogChannelID) as TextChannel : null;

        if (amount <= 0) {
            return interaction.reply({
                embeds: [
                    new Discord.MessageEmbed({
                        color: Constants["Defaults"].embed.color.default,
                        description: "Please provide a message amount higher than 0."
                    })
                ],
                ephemeral: true
            });
        } else if (amount > 100) {
            return interaction.reply({
                embeds: [
                    new Discord.MessageEmbed({
                        color: Constants["Defaults"].embed.color.default,
                        description: "The maximum amount of messages to purge is 100."
                    })
                ],
                ephemeral: true
            });
        } else if (channel) {
            await channel.bulkDelete(amount, true)
                .then((messages: Collection<string, Message<boolean>>): NodeJS.Timeout | PromiseLike<NodeJS.Timeout> => {
                    logChannel && logChannel.send({
                        embeds: [
                            {
                                author: {
                                    name: `Recent bulkdelete in #${channel.name} by ${interaction.user.tag}`,
                                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                                },
                                description: `${interaction.user} recently bulkdeleted ${messages.size} messages in ${channel} at ${Format.timestamp(new Date(), "T")}`
                            }
                        ]
                    });

                    interaction.reply({
                        embeds: [
                            new Discord.MessageEmbed({
                                color: Constants["Defaults"].embed.color.default,
                                description: `Successfully purged ${messages.size} messages in ${channel}`
                            })
                        ]
                    });

                    return setTimeout((): void => {
                        interaction.deleteReply();
                    }, 5000);
                })
                .catch((error: Error): Promise<void> => {
                    client.console.error(error.stack, "astura.commandHandler", false);
                    return interaction.reply({
                        embeds: [
                            new Discord.MessageEmbed({
                                color: Constants["Defaults"].embed.color.default,
                                description: "Looks like an error has occurred! Plesse try again later."
                            })
                        ]
                    });
                });
        } else {
            await (interaction.channel as TextChannel).bulkDelete(amount, true)
                .then((messages: Collection<string, Message<boolean>>): NodeJS.Timeout => {
                    logChannel && logChannel.send({
                        embeds: [
                            {
                                author: {
                                    name: `Recent bulkdelete in #${(interaction.channel as TextChannel).name} by ${interaction.user.tag}`,
                                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                                },
                                description: `${interaction.user} recently bulkdeleted ${messages.size} messages in ${interaction.channel} at ${Format.timestamp(new Date(), "T")}`
                            }
                        ]
                    });

                    interaction.reply({
                        embeds: [
                            new Discord.MessageEmbed({
                                color: Constants["Defaults"].embed.color.default,
                                description: `Successfully purged ${messages.size} messages in ${interaction.channel}`
                            })
                        ]
                    });

                    return setTimeout((): void => {
                        interaction.deleteReply();
                    }, 5000);
                })
                .catch((error: Error): Promise<void> => {
                    client.console.error(error.stack, "astura.commandHandler", false);
                    return interaction.reply({
                        embeds: [
                            new Discord.MessageEmbed({
                                color: Constants["Defaults"].embed.color.default,
                                description: "Looks like an error has occurred! Please try again later."
                            })
                        ]
                    });
                });
        }
    }
}
