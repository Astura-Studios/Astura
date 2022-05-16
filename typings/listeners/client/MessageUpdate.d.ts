import { Client, Listener } from "../../lib/core/exports";
import { Message } from "discord.js";
export default class MessageEditListener extends Listener {
    constructor();
    exec(client: Client, oldMessage: Message, newMessage: Message): Promise<void>;
}
//# sourceMappingURL=MessageUpdate.d.ts.map