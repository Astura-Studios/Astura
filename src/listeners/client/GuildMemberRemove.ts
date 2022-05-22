import { Client, Listener } from "../../lib/core/exports";
import { Constants } from "../../lib/base/constants";
import { Format } from "../../lib/util/exports";
import { GuildConfig } from "@prisma/client";
import { GuildChannel, GuildMember, Role, TextChannel } from "discord.js";
import { MemberEventChannels } from "../../lib/base/interfaces";

export default class GuildMemberRemoveListener extends Listener {
    public constructor() {
        super("guildMemberRemove", {
            categoryID: "client",
            emitter: "client",
            once: false
        });
    }

    public async exec(client: Client, member: GuildMember): Promise<void> {
        if (!member.guild) return;
        if (member.guild.id !== Constants["BaseGuild"]) return;

        const guildConfig: GuildConfig = await client.db.guildConfig.findUnique({
            where: {
                guildID: member.guild.id
            }
        }) as GuildConfig;

        client.user?.setPresence({
            status: "online",
            activities: [
                {
                    name: `${(await client.guilds.fetch(Constants["BaseGuild"])).memberCount} members | /help`,
                    type: "WATCHING"
                }
            ]
        });

        if (guildConfig.totalMembersChannelID && guildConfig.memberCountChannelID && guildConfig.botCountChannelID && guildConfig.serverLogChannelID && guildConfig.serverLogChannelID) {
            const channels: MemberEventChannels = {
                ALL_MEMBERS: member.guild.channels.cache.get(guildConfig.totalMembersChannelID) as GuildChannel,
                MEMBERS: member.guild.channels.cache.get(guildConfig.memberCountChannelID) as GuildChannel,
                BOTS: member.guild.channels.cache.get(guildConfig.botCountChannelID) as GuildChannel,
                LOBBY: member.guild.channels.cache.get(guildConfig.serverLogChannelID) as TextChannel,
                MEMBER_EVENTS: member.guild.channels.cache.get(guildConfig.serverLogChannelID) as TextChannel
            };

            channels["ALL_MEMBERS"].setName(`Total Members: ${member.guild.memberCount}`);
            channels["MEMBERS"].setName(`Member Count: ${(await member.guild.members.fetch()).filter((member: GuildMember): boolean => !member.user.bot).size}`);
            channels["BOTS"].setName(`Bot Count: ${(await member.guild.members.fetch()).filter((member: GuildMember): boolean => member.user.bot).size}`);

            if (member.joinedAt) {
                // channels["LOBBY"].send({
                //     embeds: [
                //         {
                //             color: "GREEN",
                //             author: {
                //                 name: `${member.user.tag} (${member.id})`,
                //                 iconURL: member.user.displayAvatarURL({ dynamic: true })
                //             },
                //             thumbnail: {
                //                 url: member.user.displayAvatarURL({ dynamic: true })
                //             },
                //             description: `${member.user} joined **${member.guild.name}** at ${Format.timestamp(member.joinedAt, "T")} and is the **${(await member.guild.members.fetch()).size}${Util.getDateSuffix((await member.guild.members.fetch()).size)}** member to join. This account was created ${Format.timestamp(member.user.createdAt, "R")}`
                //         }
                //     ]
                // });

                channels["MEMBER_EVENTS"].send({
                    embeds: [
                        {
                            color: "RED",
                            author: {
                                name: `${member.user.tag} (${member.id})`,
                                iconURL: member.user.displayAvatarURL({ dynamic: true })
                            },
                            thumbnail: {
                                url: member.user.displayAvatarURL({ dynamic: true })
                            },
                            description: `${member.user} left **${member.guild.name}** at ${Format.timestamp(new Date(), "T")}. This user joined ${Format.timestamp(member.joinedAt, "R")}.\n\n**Roles:** ${member.roles.cache.map((role: Role): Role => role).join(" ")}`
                        }
                    ]
                });
            }
        }
    }
}