"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Argument_1 = require("../../structures/Argument");
const Command_1 = require("../../structures/Command");
const Config_1 = require("../../client/Config");
const figlet_1 = require("figlet");
class AsciiCommand extends Command_1.Command {
    constructor() {
        super("ascii", {
            arguments: [
                new Argument_1.Argument({
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
                ignoreCooldown: Config_1.configOptions.owners,
                ignorePermissions: Config_1.configOptions.owners
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
    }
    ;
    exec(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inputText = interaction.options.getString("text");
                (0, figlet_1.text)(inputText, (_error, result) => {
                    if (result.length > 2000)
                        return interaction.reply({
                            content: "Please provide text shorter than 2000 characters!",
                            ephemeral: true
                        });
                    return interaction.reply(client.markdown.codeBlock(result));
                });
            }
            catch (error) {
                return console.log(`${client.util.date.getLocalTime()} | [ Ascii Command ] ${error.stack}`);
            }
            ;
        });
    }
    ;
}
exports.default = AsciiCommand;
;
