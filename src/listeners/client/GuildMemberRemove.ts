import { Client, Listener } from "../../lib/core/exports";
import { GuildChannel, GuildMember, Role, TextChannel } from "discord.js";
import { Constants } from "../../lib/base/constants";
import { Format } from "../../lib/util/exports";
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

        client.user?.setPresence({
            status: "online",
            activities: [
                {
                    name: `${(await client.guilds.fetch(Constants["BaseGuild"])).memberCount} members | /help`,
                    type: "WATCHING"
                }
            ]
        });

        const channels: MemberEventChannels = {
            ALL_MEMBERS: member.guild.channels.cache.get(Constants["Channels"].ALL_MEMBERS) as GuildChannel,
            MEMBERS: member.guild.channels.cache.get(Constants["Channels"].MEMBERS) as GuildChannel,
            BOTS: member.guild.channels.cache.get(Constants["Channels"].BOTS) as GuildChannel,
            LOBBY: member.guild.channels.cache.get(Constants["Channels"].LOBBY) as TextChannel,
            MEMBER_EVENTS: member.guild.channels.cache.get(Constants["Channels"].MEMBER_EVENTS) as TextChannel
        };

        channels["ALL_MEMBERS"].setName(`All Members: ${member.guild.memberCount}`);
        channels["MEMBERS"].setName(`Members: ${(await member.guild.members.fetch()).filter((member: GuildMember): boolean => !member.user.bot).size}`);
        channels["BOTS"].setName(`Bots: ${(await member.guild.members.fetch()).filter((member: GuildMember): boolean => member.user.bot).size}`);

        if (member.joinedAt) {
            channels["LOBBY"].send({
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