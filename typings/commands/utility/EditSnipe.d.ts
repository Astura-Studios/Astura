import { Client, SlashCommand } from "../../lib/core/exports";
import { CommandInteraction, Message } from "discord.js";
export default class SnipeCommand extends SlashCommand {
    constructor();
    exec(client: Client, interaction: CommandInteraction, Discord: typeof import("discord.js")): Promise<Message<boolean> | void>;
}
//# sourceMappingURL=EditSnipe.d.ts.map