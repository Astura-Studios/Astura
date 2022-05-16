import { Client, Listener } from "../../lib/core/exports";
import { GuildMember } from "discord.js";
export default class GuildMemberUpdateListener extends Listener {
    constructor();
    exec(_client: Client, oldMember: GuildMember, newMember: GuildMember): Promise<void>;
}
//# sourceMappingURL=GuildMemberUpdate.d.ts.map