import { Client, Listener } from "../../lib/core/exports";
import { GuildMember } from "discord.js";
export default class GuildMemberRemoveListener extends Listener {
    constructor();
    exec(client: Client, member: GuildMember): Promise<void>;
}
//# sourceMappingURL=GuildMemberRemove.d.ts.map