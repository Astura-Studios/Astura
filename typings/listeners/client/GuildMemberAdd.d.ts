import { Client, Listener } from "../../lib/core/exports";
import { GuildMember } from "discord.js";
export default class GuildMemberAddListener extends Listener {
    constructor();
    exec(client: Client, member: GuildMember): Promise<void>;
}
//# sourceMappingURL=GuildMemberAdd.d.ts.map