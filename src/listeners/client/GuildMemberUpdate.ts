import { Client, Listener } from "../../lib/core/exports";
import { Constants } from "../../lib/base/constants";
import { GuildMember, GuildChannel } from "discord.js";

export default class GuildMemberUpdateListener extends Listener {
    public constructor() {
        super("guildMemberUpdate", {
            categoryID: "client",
            emitter: "client",
            once: false
        });
    }

    public async exec(_client: Client, oldMember: GuildMember, newMember: GuildMember): Promise<void> {
        if (!oldMember.guild || !newMember.guild) return;
        if (oldMember.guild.id !== Constants["BaseGuild"]) return;
        if (newMember.guild.id !== Constants["BaseGuild"]) return;

        if (!oldMember.premiumSince && newMember.premiumSince) {
            const BOOST_TIER: GuildChannel = newMember.guild.channels.cache.get(Constants["Channels"].BOOST_TIER) as GuildChannel;

            switch (newMember.guild.premiumTier) {
                case "NONE": BOOST_TIER.setName("Boost Tier: 0"); break;
                case "TIER_1": BOOST_TIER.setName("Boost Tier: 1"); break;
                case "TIER_2": BOOST_TIER.setName("Boost Tier: 2"); break;
                case "TIER_3": BOOST_TIER.setName("Boost Tier: 3"); break;
                default: BOOST_TIER.setName("Boost Tier: 0"); break;
            }
        }
    }
}