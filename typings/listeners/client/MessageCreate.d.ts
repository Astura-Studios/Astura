import { Client, Listener } from "../../lib/core/exports";
import { Message } from "discord.js";
export default class MessageCreateListener extends Listener {
    constructor();
    exec(_client: Client, message: Message): Promise<void>;
}
//# sourceMappingURL=MessageCreate.d.ts.map