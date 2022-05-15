import { Argument, Client, SlashCommand } from "../../lib/core/exports";
import { CommandInteraction, Message, MessageEmbed } from "discord.js";
import { Constants } from "../../lib/base/constants";
import { EditSnipe } from "../../lib/base/interfaces";
import { Format } from "../../lib/util/exports";

export default class SnipeCommand extends SlashCommand {
    public constructor() {
        super("editsnipe", {
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
            description: "View recently edited messages in a channel.",
            examples: [
                "/editsnipe",
                "/editsnipe 2"
            ],
            ownerOnly: false,
            permissions: {
                clientPermissions: [],
                userPermissions: []
            },
            subCommands: [],
            usage: "/editsnipe [index]"
        });
    }

    public async exec(client: Client, interaction: CommandInteraction, Discord: typeof import("discord.js")): Promise<Message<boolean> | void> {
        const snipes: EditSnipe[] = client.editSnipes.get(interaction.channelId) as EditSnipe[];
        const index: number | null = interaction.options.getNumber("index") || null;

        if (interaction.channel) {
            if (!snipes || snipes.length === 0) {
                return interaction.reply({
                    embeds: [
                        {
                            color: Constants["Defaults"].embed.color.default,
                            description: `**No messages were found to have been recently edited in ${interaction.channel}.**`
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
                                description: "**Index provided exceeds the number of current edited messages in channel.**"
                            }
                        ],
                        ephemeral: true
                    });
                } else {
                    const snipe: EditSnipe = snipes[snipes.length - index];
                    
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
                                name: `Recently edited message by ${snipe.author.tag}`,
                                iconURL: snipe.author.displayAvatarURL({ dynamic: true })
                            },
                            description: `${snipe.author} recently edited a message in ${snipe.channel} at ${snipe.time.after}.\n\n**Before:** ${snipe.content.before}\n**After:** ${snipe.content.after}\n\n${snipe.url ? Format.hyperlink("Jump to message", snipe.url) : null}`
                        });
            
                        if (snipe.image.before) embed.setImage(snipe.image.before);
                        if (snipe.image.after) embed.setImage(snipe.image.after);

                        return interaction.reply({
                            embeds: [
                                embed
                            ]
                        });
                    }
                }
            } else {
                const snipe: EditSnipe = snipes[snipes.length - 1];
                const embed: MessageEmbed = new Discord.MessageEmbed({
                    color: Constants["Defaults"].embed.color.default,
                    author: {
                        name: `Recently edited message by ${snipe.author.tag}`,
                        iconURL: snipe.author.displayAvatarURL({ dynamic: true })
                    },
                    description: `${snipe.author} recently edited a message in ${snipe.channel} at ${snipe.time.after}.\n\n**Before:** ${snipe.content.before}\n**After:** ${snipe.content.after}\n\n${snipe.url ? Format.hyperlink("Jump to message", snipe.url) : null}`
                });
    
                if (snipe.image.before) embed.setImage(snipe.image.before);
                if (snipe.image.after) embed.setImage(snipe.image.after);

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