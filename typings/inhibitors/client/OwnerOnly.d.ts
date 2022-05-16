import { CommandInteraction } from "discord.js";
import { Client, Inhibitor, SlashCommand } from "../../lib/core/exports";
export default class OwnerOnlyInhibitor extends Inhibitor {
    constructor();
    exec(client: Client, interaction: CommandInteraction, command: SlashCommand): Promise<boolean>;
}
//# sourceMappingURL=OwnerOnly.d.ts.map