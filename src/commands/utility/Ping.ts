import { AsturaClient } from "../../client/Client";
import { Command } from "../../structures/Command";
import { CommandInteraction } from "discord.js";
import { configOptions } from "../../client/Config";

export default class PingCommand extends Command {
    public constructor() {
        super("ping", {
            category: "Utility",
            channel: "all",
            cooldown: 5,
            description: "Get the latency of the ping to the Discord API.",
            enabledByDefault: true,
            examples: ["/ping"],
            exceptions: {
                ignoreCooldown: configOptions.owners,
                ignorePermissions: configOptions.owners
            },
            isSubCommand: false,
            permissions: {
                clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "USE_EXTERNAL_EMOJIS", "MANAGE_MESSAGES"],
                userPermissions: ["SEND_MESSAGES"]
            },
            ownerOnly: false,
            usage: "/ping"
        });
    };

    public async exec(client: AsturaClient, interaction: CommandInteraction) {
        try {
            return interaction.reply(`:ping_pong: **Pong!** \`${client.ws.ping}ms\``);
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ Ping Command ] ${(error as Error).stack}`);
        };
    };
};