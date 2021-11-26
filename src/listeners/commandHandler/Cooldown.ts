import { AsturaClient } from "../../client/Client";
import { CommandInteraction } from "discord.js";
import { Listener } from "../../structures/Listener";

export default class CooldownListener extends Listener {
    public constructor() {
        super("cooldown", {
            category: "commandHandler",
            emitter: "commandHandler",
            name: "cooldown"
        });
    };

    public async exec(client: AsturaClient, interaction: CommandInteraction, message: string): Promise<void> {
        return interaction.reply({
            embeds: [
                {
                    color: client.util.defaults.embed.color,
                    description: message
                }
            ],
            ephemeral: true
        });
    };
};