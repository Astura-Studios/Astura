import { Client } from "../../lib/core/exports";
import { CommandInteraction } from "discord.js";
import { SlashCommand } from "../../lib/core/exports";
export declare type GuildConfig = {
    guildID?: string;
    owners?: string[];
    verificationChannelID?: string | null;
    verificationRoleID?: string | null;
    suggestionsChannelID?: string | null;
    muteRoleID?: string | null;
    serverStatisticsEnabled?: boolean | null;
    totalMembersChannelID?: string | null;
    memberCountChannelID?: string | null;
    botCountChannelID?: string | null;
    goalCountChannelID?: string | null;
    goalCount?: number | null;
    boostTierChannelID?: string | null;
    staffRoleID?: string | null;
    adminRoleID?: string | null;
    executiveRoleID?: string | null;
    messageLogChannelID?: string | null;
    moderationLogChannelID?: string | null;
    serverLogChannelID?: string | null;
    asturaLogChannelID?: string | null;
};
export default class GuildConfigCommand extends SlashCommand {
    constructor();
    exec(client: Client, interaction: CommandInteraction, Discord: typeof import("discord.js")): Promise<void>;
}
//# sourceMappingURL=GuildConfig.d.ts.map