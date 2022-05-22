import { APIMessage } from "discord-api-types/v9";
import { Argument, Client, MessageEmbedField, SlashCommand } from "../../lib/core/exports";
import { CommandInteraction, GuildMember, Message, TextChannel, User } from "discord.js";
import { Constants } from "../../lib/base/constants";
import { Format, Util } from "../../lib/util/exports";
import { GuildConfig } from "@prisma/client";

export default class ReportCommand extends SlashCommand {
    public constructor() {
        super("report", {
            aliases: [],
            arguments: [
                new Argument({
                    name: "user",
                    description: "The user to report.",
                    required: true,
                    type: "user"
                }),
                new Argument({
                    name: "reason",
                    description: "The reason for reporting the user.",
                    required: true,
                    type: "string"
                })
            ],
            categoryID: "Moderation",
            channel: "guild",
            cooldown: 5,
            defaultPermission: true,
            description: "Reports a user to the server moderators.",
            examples: [
                "/report @Ascendus",
                "/report @Ascendus Being toxic"
            ],
            ownerOnly: false,
            permissions: {
                clientPermissions: [],
                userPermissions: []
            },
            subCommands: [],
            usage: "/report <user> [reason]"
        });
    }

    public async exec(client: Client, interaction: CommandInteraction, Discord: typeof import("discord.js")): Promise<void> {
        if (!interaction.guild) return;

        const guildConfig: GuildConfig = await client.db.guildConfig.findUnique({
            where: {
                guildID: interaction.guildId as string
            }
        }) as GuildConfig;

        const user: User = interaction.options.getUser("user", true);
        const member: GuildMember = interaction.guild.members.cache.get(user.id) as GuildMember;
        const reason: string = interaction.options.getString("reason", true);
        const reports: TextChannel | null = guildConfig.moderationLogChannelID ? interaction.guild.channels.cache.get(guildConfig.moderationLogChannelID) as TextChannel : null;
        const now: Date = new Date();
        const keyLength: number = 15;
        let reportID: string = Util.generateKey(keyLength);

        return interaction.reply({
            embeds: [
                new Discord.MessageEmbed({
                    color: Constants["Defaults"].embed.color.default,
                    description: "**Successfully sent your report to the server moderators.**"
                })
            ],
            fetchReply: true
        })
            // @ts-ignore
            .then(async (message: APIMessage | Message<boolean>): Promise<void> => {
                do {
                    reportID = Util.generateKey(keyLength);
                } while (await client.db.report.findUnique({
                    where: {
                        reportID: reportID
                    }
                }));

                reports && reports.send({
                    embeds: [
                        new Discord.MessageEmbed({
                            color: "RED",
                            author: {
                                name: `New report for ${member.user.tag} (Report ID ${reportID})`,
                                iconURL: member.user.displayAvatarURL({ dynamic: true })
                            },
                            description: `${member} was reported by ${interaction.user} at ${Format.timestamp(now, "T")}. ${Format.hyperlink("Click here", (message as Message<boolean>).url)} to jump to the message which was sent from ${(message as Message<boolean>).channel}. The reason for the report was **${reason}**`,
                            fields: [
                                new MessageEmbedField({
                                    name: "User Information",
                                    value: `**Username:** ${interaction.user.tag}\n**Joined:** ${Format.timestamp((interaction.member as GuildMember).joinedAt as Date, "R")}\n**Created:** ${Format.timestamp(interaction.user.createdAt, "R")}`,
                                    inline: true
                                }),
                                new MessageEmbedField({
                                    name: "Reported User Information",
                                    value: `**Username:** ${member.user.tag}\n**Joined:** ${Format.timestamp(member.joinedAt as Date, "R")}\n**Created:** ${Format.timestamp(member.user.createdAt, "R")}`,
                                    inline: true
                                })
                            ]
                        })
                    ]
                });

                client.db.report.create({
                    data: {
                        reportID: reportID,
                        userID: interaction.user.id,
                        reportedID: member.id,
                        reason: reason,
                        time: now
                    }
                });
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
    }
}