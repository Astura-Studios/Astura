import { Argument, Client, SlashCommand } from "../../lib/core/exports";
import { CommandInteraction, Message, MessageEmbed } from "discord.js";
import { Constants } from "../../lib/base/constants";
import { Snipe } from "../../lib/base/interfaces";

export default class SnipeCommand extends SlashCommand {
    public constructor() {
        super("snipe", {
            aliases: [],
            arguments: [
                new Argument({
                    name: "index",
                    description: "The number to index the snipes in a channel.",
                    required: false,
                    type: "number"
                })
            ],
            categoryID: "Utility",
            channel: "guild",
            cooldown: 5,
            defaultPermission: true,
            description: "View recently deleted messages in a channel.",
            examples: [
                "/snipe",
                "/snipe 2"
            ],
            ownerOnly: false,
            permissions: {
                clientPermissions: [],
                userPermissions: []
            },
            subCommands: [],
            usage: "/snipe [index]"
        });
    }

    public async exec(client: Client, interaction: CommandInteraction, Discord: typeof import("discord.js")): Promise<Message<boolean> | void> {
        const snipes: Snipe[] = client.snipes.get(interaction.channelId) as Snipe[];
        const index: number | null = interaction.options.getNumber("index") || null;

        if (interaction.channel) {
            if (!snipes || snipes.length === 0) {
                return interaction.reply({
                    embeds: [
                        {
                            color: Constants["Defaults"].embed.color.default,
                            description: `**No messages were found to have been recently deleted in ${interaction.channel}.**`
                        }
                    ]
                });
            } else if (index) {
                if (index <= 0) {
                    return interaction.reply({
                        embeds: [
                            {
                                color: Constants["Defaults"].embed.color.default,
                                description: "**Invalid number provided. Please provide a number larger than 0.**"
                            }
                        ],
                        ephemeral: true
                    });
                } else if (index > snipes.length) {
                    return interaction.reply({
                        embeds: [
                            {
                                color: Constants["Defaults"].embed.color.default,
                                description: "**Index provided exceeds the number of current deleted messages in channel.**"
                            }
                        ],
                        ephemeral: true
                    });
                } else {
                    const snipe: Snipe = snipes[snipes.length - index];

                    if (!snipe) {
                        return interaction.reply({
                            embeds: [
                                {
                                    color: Constants["Defaults"].embed.color.default,
                                    description: "**No snipes exist for the provided number. Please provide a smaller number.**"
                                }
                            ],
                            ephemeral: true
                        });
                    } else {
                        const embed: MessageEmbed = new Discord.MessageEmbed({
                            color: Constants["Defaults"].embed.color.default,
                            author: {
                                name: `Recently deleted message by ${snipe.author.tag}`,
                                iconURL: snipe.author.displayAvatarURL({ dynamic: true })
                            },
                            description: `${snipe.author} recently deleted a message in ${snipe.channel} at ${snipe.time}.\n\n${snipe.content}`
                        });

                        if (snipe.image) embed.setImage(snipe.image);

                        return interaction.reply({
                            embeds: [
                                embed
                            ]
                        });
                    }
                }
            } else {
                const snipe: Snipe = snipes[snipes.length - 1];

                const embed: MessageEmbed = new Discord.MessageEmbed({
                    color: Constants["Defaults"].embed.color.default,
                    author: {
                        name: `Recently deleted message by ${snipe.author.tag}`,
                        iconURL: snipe.author.displayAvatarURL({ dynamic: true })
                    },
                    description: `${snipe.author} recently deleted a message in ${snipe.channel} at ${snipe.time}.\n\n> ${snipe.content}`
                });

                if (snipe.image) embed.setImage(snipe.image);

                return interaction.reply({
                    embeds: [
                        embed
                    ]
                });
            }
        } else {
            return;
        }
    }
}