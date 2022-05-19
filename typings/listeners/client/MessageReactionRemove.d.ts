import { Client, Listener } from "../../lib/core/exports";
import { MessageReaction, User } from "discord.js";
export default class messageReactionRemove extends Listener {
    constructor();
    exec(client: Client, reaction: MessageReaction, user: User): Promise<void>;
}
//# sourceMappingURL=MessageReactionRemove.d.ts.map