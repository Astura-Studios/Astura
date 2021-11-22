/** 
import { Argument } from "../../structures/Argument";
import { AsturaClient } from "../../client/Client";
import { Command } from "../../structures/Command";
import { CommandInteraction } from "discord.js";
import { configOptions } from "../../client/Config";

export default class MyCommand extends Command {
    public constructor() {
        super("play", {
            arguments: [
                new Argument({
                    name: "",
                    description: "",
                    required: true,
                    type: ""
                })
            ],
            category: "",
            channel: "",
            cooldown: 0,
            description: "",
            enabledByDefault: true,
            examples: [
                ""
            ],
            exceptions: {
                ignoreCooldown: configOptions.owners,
                ignorePermissions: configOptions.owners
            },
            isSubCommand: false,
            ownerOnly: false,
            permissions: {
                clientPermissions: ["SEND_MESSAGES"],
                userPermissions: ["SEND_MESSAGES"]
            },
            usage: ""
        });
    };

    public async exec(client: AsturaClient, interaction: CommandInteraction): Promise<any> {
        try {
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ My Command ] ${(error as Error).stack}`);
        };
    };
};
**/