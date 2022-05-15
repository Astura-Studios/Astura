import { CommandInteraction } from "discord.js";
import { CommandHandlerWarnings } from "../../lib/base/interfaces";
import { Client, Inhibitor, SlashCommand } from "../../lib/core/exports";
import { Constants } from "../../lib/base/constants";

export default class OwnerOnlyInhibitor extends Inhibitor {
    public constructor() {
        super("ownerOnly", {
            categoryID: "client",
            reason: "ownerOnly",
            priority: 2
        });
    }

    public async exec(client: Client, interaction: CommandInteraction, command: SlashCommand): Promise<boolean> {
        if (command.ownerOnly && !client.config.owners.includes(interaction.user.id)) {
            interaction.reply({
                embeds: [
                    {
                        color: Constants["Defaults"].embed.color.default,
                        description: ((client.commandHandler.warnings as CommandHandlerWarnings).ownerOnly as (client: Client, interaction: CommandInteraction) => string)(client, interaction)
                    }
                ],
                ephemeral: true
            });

            return false;
        } else {
            return true;
        }
    }
}