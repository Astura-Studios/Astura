import { Client, Inhibitor, SlashCommand } from "../../lib/core/exports";
import { CommandInteraction } from "discord.js";
export default class PermissionsInhibitor extends Inhibitor {
    constructor();
    exec(client: Client, interaction: CommandInteraction, command: SlashCommand): Promise<boolean>;
}
//# sourceMappingURL=Permissions.d.ts.map