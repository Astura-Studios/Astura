import { Argument, Client, SlashCommand } from "../../lib/core/exports";
import { CommandInteraction, GuildMember, User } from "discord.js";
import { Constants } from "../../lib/base/constants"; 
import { ModerationCase } from "@prisma/client";
import { Util } from "../../lib/util/exports";
import { WarnCase } from "../../lib/base/interfaces";

export default class WarnsCommand extends SlashCommand {
    public constructor() {
        super("warns", {
            aliases: ["infractions"],
            arguments: [
                new Argument({
                    name: "user",
                    description: "The user to view the warns for.",
                    required: false,
                    type: "user"
                }),
                new Argument({
                    name: "page",
                    description: "The page of warns to view.",
                    required: false,
                    type: "number"
                })
            ],
            categoryID: "Moderation",
            channel: "guild",
            cooldown: 10,
            defaultPermission: true,
            description: "Views the existing warns of a server member.",
            examples: [
                "/warns",
                "/infractions @Ascendus",
                "/warns @Ascendus 2"
            ],
            ownerOnly: false,
            permissions: {
                clientPermissions: [],
                userPermissions: ["MANAGE_ROLES"]
            },
            subCommands: [],
            usage: "/warns [user] [page]"
        });
    }

    public async exec(client: Client, interaction: CommandInteraction, Discord: typeof import("discord.js")): Promise<void> {
        if (!interaction.guild) return;
        const user: User = interaction.options.getUser("user") || interaction.user;
        const member: GuildMember = interaction.guild.members.cache.get(user.id) || interaction.member as GuildMember;
        const warnsPerPage: number = 4;

        if (member.user.bot) {
            return interaction.reply({
                embeds: [
                    new Discord.MessageEmbed({
                        color: Constants["Defaults"].embed.color.default,
                        description: "**The provided user cannot be a bot user account.**"
                    })
                ],
                ephemeral: true
            });
        }

        const page: number = interaction.options.getNumber("page") || 1;

        const warns: ModerationCase[] = await client.db.moderationCase.findMany({
            where: {
                userID: member.id,
                type: "WARN"
            }
        });

        if (!warns || warns.length === 0) {
            return interaction.reply({
                embeds: [
                    new Discord.MessageEmbed({
                        color: Constants["Defaults"].embed.color.default,
                        description: "**No warns were found for the specified user.**"
                    })
                ],
                ephemeral: true
            });
        }

        const infractions: (void | WarnCase)[] = await Promise.all(warns.map(async (v: ModerationCase, i: number): Promise<void | WarnCase> => {
            const mod: GuildMember | null = await interaction.guild?.members.fetch(v.moderatorID).catch((): null => null) as GuildMember | null;

            if (mod) {
                return {
                    index: i + 1,
                    caseID: v.caseID,
                    user: member,
                    moderator: mod,
                    reason: v.reason || "No reason was provided by the moderator.",
                    time: v.time
                };
            }
        }));

        const pages: string[] | null = Util.pages((infractions as WarnCase[]).map((v: WarnCase): string => `**${Constants["Emojis"].DISCORD_ID_ICON} \`${v.caseID}\` | Infraction Case No.${v.index}**\n\`\`\`asciidoc\nCase ID           :: ${v.caseID}\nCase Moderator    :: ${v.moderator.user.tag} (${v.moderator.id})\nReason Of Warn    :: ${v.reason}\nTime Of Warn      :: ${v.time.toLocaleDateString()} at ${v.time.toLocaleTimeString()}\`\`\``), warnsPerPage, page);
        
        if (!pages) {
            return interaction.reply({
                embeds: [
                    new Discord.MessageEmbed({
                        color: Constants["Defaults"].embed.color.default,
                        description: "**No warns were found in this page for the specified user.**"
                    })
                ],
                ephemeral: true
            });
        } else {
            return interaction.reply({
                embeds: [
                    new Discord.MessageEmbed({
                        color: Constants["Defaults"].embed.color.default,
                        author: {
                            name: `${member.user.tag} | Server Member Infractions List (Page ${page}/${Math.ceil(warns.length / warnsPerPage)})`,
                            iconURL: member.user.displayAvatarURL({ dynamic: true })
                        },
                        description: pages.join(" \n")
                    })
                ]
            });
        }
    }
}