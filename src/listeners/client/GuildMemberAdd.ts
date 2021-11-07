import { AsturaClient } from "../../client/Client";
import { GuildChannel, GuildMember, Role } from "discord.js";
import { Listener } from "../../structures/Listener";

export default class GuildMemberAddListener extends Listener {
    public constructor() {
        super("guildMemberAdd", {
            category: "client",
            emitter: "client",
            name: "guildMemberAdd"
        });
    };

    public async exec(_client: AsturaClient, member: GuildMember): Promise<void> {
        try {
            const totalMembers: GuildChannel = await member.guild.channels.resolve("811391499140595763") as GuildChannel;
            const memberCount: GuildChannel = await member.guild.channels.resolve("786354352108994621") as GuildChannel;
            const botCount: GuildChannel = await member.guild.channels.resolve("811439914980868106") as GuildChannel;
            const goalCount: GuildChannel = await member.guild.channels.resolve("787211664591814716") as GuildChannel;
            const boostTier: GuildChannel = await member.guild.channels.resolve("866510113208401940") as GuildChannel;

            totalMembers.setName(`Total Members: ${(await member.guild.members.fetch()).size.toString()}`);
            memberCount.setName(`Member Count: ${(await (await member.guild.members.fetch()).filter(m => !m.user.bot)).size.toString()}`);
            botCount.setName(`Bot Count: ${(await (await member.guild.members.fetch()).filter(m => m.user.bot)).size.toString()}`);
            
            const currentGoal: number = parseInt(goalCount.name);
            if (parseInt(totalMembers.name) > currentGoal) goalCount.setName(`Goal: ${(currentGoal + 100).toString()}`);

            switch (member.guild.premiumTier) {
                case "NONE":
                    boostTier.setName("Boost Tier: 0");
                    break;

                case "TIER_1":
                    boostTier.setName("Boost Tier: 1");
                    break;

                case "TIER_2":
                    boostTier.setName("Boost Tier: 2");
                    break;

                case "TIER_3":
                    boostTier.setName("Boost Tier: 3");
                    break;
            };

            if (member.partial) {
                member = await member.fetch();
                const memberRole: Role = member.guild.roles.cache.get("810989551162097696") as Role;
                if (member.user.bot) return;
                if (member.roles.cache.has(memberRole.id)) return;
                if (!member.pending) return this.client.util.runVerification(member, memberRole);
            } else {
                const memberRole: Role = member.guild.roles.cache.get("810989551162097696") as Role;
                if (member.user.bot) return;
                if (member.roles.cache.has(memberRole.id)) return;
                if (!member.pending) return this.client.util.runVerification(member, memberRole);
            };
        } catch (error) {
            return console.log(`${this.client.util.date.getLocalTime()} | [ Guild Member Add Listener ] ${(error as Error).stack}`);
        };
    };
};