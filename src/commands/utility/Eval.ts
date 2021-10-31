import { Argument } from "../../structures/Argument";
import { AsturaClient } from "../../client/Client";
import { Command } from "../../structures/Command";
import { CommandInteraction } from "discord.js";
import { configOptions } from "../../client/Config";
import { inspect } from "util";
import { stripIndents } from "common-tags";

export default class EvalCommand extends Command {
    public constructor() {
        super("eval", {
            aliases: ["evaluate"],
            arguments: [
                new Argument({
                    name: "input",
                    description: "The JavaScript code to be executed.",
                    required: false,
                    type: "string"
                })
            ],
            category: "Utility",
            channel: "all",
            cooldown: 5,
            description: "Evalute JavaScript code with the integrated discord.js library.",
            enabledByDefault: true,
            examples: [
                "/eval 2+2",
                "/eval this.client.user.id",
                "/eval console.log(\"Hello, World!\")"
            ],
            exceptions: {
                ignoreCooldown: configOptions.owners,
                ignorePermissions: configOptions.owners
            },
            isSubCommand: false,
            permissions: {
                clientPermissions: [
                    "SEND_MESSAGES"
                ],
                userPermissions: [
                    "SEND_MESSAGES",
                    "ADMINISTRATOR"
                ]
            },
            ownerOnly: true,
            usage: "/eval <code>"
        });
    };

    public async exec(client: AsturaClient, interaction: CommandInteraction): Promise<void> {
        try {
            const code: string = interaction.options.getString((this.arguments as Argument[])[0].name) as string;
            const start: [number, number] = process.hrtime();
            let output: string = eval(code);
            const difference: [number, number] = process.hrtime(start);
            if (typeof output !== "string") output = inspect(output, {
                depth: 2
            });

            return interaction.reply(stripIndents`
                **Executed in ${difference[0] > 0 ? `${difference[0]}s` : ""}${difference[1] / 1e6}ms**
                \`\`\`js
                ${output.length > 1950 ? "Code length exceeds maximum size allowed." : output}
                \`\`\`
            `);
        } catch (error) {
            return interaction.reply(stripIndents`
                	**An errror occcured while attempting to evaluate the given code:**
                \`${(error as Error).stack}\`
            `);
        };
    };
};