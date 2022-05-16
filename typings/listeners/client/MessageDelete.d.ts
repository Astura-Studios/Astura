import { Client, Listener } from "../../lib/core/exports";
import { Message } from "discord.js";
export default class MessageDeleteListener extends Listener {
    constructor();
    exec(client: Client, message: Message): Promise<void>;
}
//# sourceMappingURL=MessageDelete.d.ts.map