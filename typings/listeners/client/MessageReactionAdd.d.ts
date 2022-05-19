import { Client, Listener } from "../../lib/core/exports";
import { MessageReaction, User } from "discord.js";
export default class MessageReactionAddistener extends Listener {
    constructor();
    exec(client: Client, reaction: MessageReaction, user: User): Promise<void>;
}
//# sourceMappingURL=MessageReactionAdd.d.ts.map