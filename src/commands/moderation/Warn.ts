import { Argument, Client, SlashCommand } from "../../lib/core/exports";
import { CommandInteraction, DMChannel, Guild, GuildMember, Message, TextChannel, User } from "discord.js";
import { Constants } from "../../lib/base/constants";
import { Format, Util } from "../../lib/util/exports";
import { ModerationCase } from "@prisma/client";

export default class WarnCommand extends SlashCommand {
    public constructor() {
        super("warn", {
            aliases: [],
            arguments: [
                new Argument({
                    name: "user",
                    description: "The user to warn.",
                    required: true,
                    type: "user"
                }),
                new Argument({
                    name: "reason",
                    description: "The reason for the warning.",
                    required: false,
                    type: "string"
                })
            ],
            categoryID: "Moderation",
            channel: "guild",
            cooldown: 10,
            defaultPermission: true,
            description: "Warn a server member.",
            examples: [
                "/warn @Ascendus",
                "/warn @Ascendus Breaking rule 2.1"
            ],
            ownerOnly: false,
            permissions: {
                clientPermissions: [],
                userPermissions: ["MANAGE_ROLES"]
            },
            subCommands: [],
            usage: "/warn <user> [reason]"
        });
    }

    public async exec(client: Client, interaction: CommandInteraction, Discord: typeof import("discord.js")): Promise<void> {
        if (!interaction.guild) return;
        const user: User = interaction.options.getUser("user") as User;
        const member: GuildMember = interaction.guild.members.cache.get(user.id) as GuildMember;
        const reason: string | null = interaction.options.getString("reason");
        const logChannel: TextChannel = interaction.guild.channels.cache.get(Constants["Channels"].MODERATION_LOGGING) as TextChannel;
        const keyLength: number = 15;
        const cases: number = await client.db.moderationCase.count({
            where: {
                userID: member.id,
                type: "WARN",
            }
        });
        let caseID: string = Util.generateKey(keyLength);

        do {
            caseID = Util.generateKey(keyLength);
        } while (await client.db.moderationCase.findUnique({
            where: {
                caseID
            }
        }));

        if ((member.roles.highest.position > (interaction.member as GuildMember).roles.highest.position) || (member.roles.highest.position === (interaction.member as GuildMember).roles.highest.position)) {
            return interaction.reply({
                embeds: [
                    new Discord.MessageEmbed({
                        color: Constants["Defaults"].embed.color.default,
                        description: "**The provided member has roles either higher or equal to yours.**"
                    })
                ],
                ephemeral: true
            });
        } else if (member.user.bot) {
            return interaction.reply({
                embeds: [
                    new Discord.MessageEmbed({
                        color: Constants["Defaults"].embed.color.default,
                        description: "**The provided member cannot be a bot user.**"
                    })
                ],
                ephemeral: true
            });
        } else {
            return client.db.moderationCase.create({
                data: {
                    active: true,
                    caseID: caseID,
                    moderatorID: (interaction.member as GuildMember).id,
                    reason: reason,
                    time: new Date(),
                    type: "WARN",
                    userID: member.id
                }
            })
                .then(async (moderationCase: ModerationCase): Promise<void> => {
                    await member.createDM()
                        .then(async (channel: DMChannel): Promise<Message<boolean>> => {
                            return channel.send({
                                embeds: [
                                    new Discord.MessageEmbed({
                                        color: "RED",
                                        author: {
                                            name: `${(interaction.guild as Guild).name} - Server Warn (Case ID ${moderationCase.caseID})`,
                                            iconURL: (interaction.guild as Guild).iconURL({ dynamic: true }) as string
                                        },
                                        description: `You were warned by **${interaction.user.tag}** at ${Format.timestamp(moderationCase.time, "T")}. This is your **${cases + 1}${Util.getDateSuffix(cases + 1)}** warn case.`,
                                        fields: [
                                            { name: "Responsible Moderator", value: `${interaction.user}`, inline: true },
                                            { name: "Reason", value: moderationCase.reason || "No reason was provided by the moderator.", inline: true }
                                        ]
                                    })
                                ]
                            });
                        })
                        .catch((): null => null)
                        .finally(async (): Promise<void> => {
                            await client.db.$disconnect();

                            logChannel.send({
                                embeds: [
                                    new Discord.MessageEmbed({
                                        color: "RED",
                                        author: {
                                            name: `${member.user.tag} - Server Warn (Case ID ${caseID})`,
                                            iconURL: member.user.displayAvatarURL({ dynamic: true })
                                        },
                                        description: `${member.user.tag} (\`${member.id}\`) was warned by ${interaction.user.username} at ${Format.timestamp(moderationCase.time, "T")}. This is their **${cases + 1}${Util.getDateSuffix(cases + 1)}** warn case.`,
                                        fields: [
                                            { name: "User", value: `${member.user}`, inline: true },
                                            { name: "Responsible Moderator", value: `${interaction.user}`, inline: true },
                                            { name: "Reason", value: reason || "No reason was provided by the moderator." }
                                        ]
                                    })
                                ]
                            });

                            return interaction.reply({
                                embeds: [
                                    new Discord.MessageEmbed({
                                        color: "RED",
                                        author: {
                                            name: `${member.user.tag} - Server Warn (Case ID ${caseID})`,
                                            iconURL: member.user.displayAvatarURL({ dynamic: true })
                                        },
                                        description: `${member.user.tag} (\`${member.id}\`) was warned by ${interaction.user.username} at ${Format.timestamp(moderationCase.time, "T")}. This is their **${cases + 1}${Util.getDateSuffix(cases + 1)}** warn case.`,
                                        fields: [
                                            { name: "User", value: `${member.user}`, inline: true },
                                            { name: "Responsible Moderator", value: `${interaction.user}`, inline: true },
                                            { name: "Reason", value: reason || "No reason was provided by the moderator." }
                                        ]
                                    })
                                ]
                            });
                        });
                })
                .catch((error: Error): Promise<void> | void => {
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
        }
    }
}