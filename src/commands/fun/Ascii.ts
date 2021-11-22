import { Argument } from "../../structures/Argument";
import { APIMessage } from "discord-api-types/v9";
import { AsturaClient } from "../../client/Client";
import { Command } from "../../structures/Command";
import { CommandInteraction, Message } from "discord.js";
import { configOptions } from "../../client/Config";
import { text } from "figlet";

export default class AsciiCommand extends Command {
    public constructor() {
        super("ascii", {
            arguments: [
                new Argument({
                    name: "text",
                    description: "The text you want converted to ascii.",
                    required: true,
                    type: "string"
                })
            ],
            category: "Fun",
            channel: "all",
            cooldown: 5,
            description: "Converts input text to ascii text in a codeblock.",
            enabledByDefault: true,
            examples: [
                "/ascii Hello, World!"
            ],
            exceptions: {
                ignoreCooldown: configOptions.owners,
                ignorePermissions: configOptions.owners
            },
            isSubCommand: false,
            ownerOnly: false,
            permissions: {
                clientPermissions: [
                    "SEND_MESSAGES",
                ],
                userPermissions: [
                    "SEND_MESSAGES"
                ]
            },
            usage: "/ascii <text>"
        });
    };

    public async exec(client: AsturaClient, interaction: CommandInteraction): Promise<APIMessage | Message<boolean> | void> {
        try {
            const inputText: string = interaction.options.getString("text") as string;

            text(inputText, (_error: Error | null, result?: string): Promise<void> => {
                if ((result as string).length > 2000) return interaction.reply({
                    content: "Please provide text shorter than 2000 characters!",
                    ephemeral: true
                });

                return interaction.reply(client.markdown.codeBlock(result as string));
            });
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ Ascii Command ] ${(error as Error).stack}`);
        };
    };
};