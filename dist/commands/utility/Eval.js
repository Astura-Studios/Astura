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
const util_1 = require("util");
const common_tags_1 = require("common-tags");
class EvalCommand extends Command_1.Command {
    constructor() {
        super("eval", {
            aliases: ["evaluate"],
            arguments: [
                new Argument_1.Argument({
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
                ignoreCooldown: Config_1.configOptions.owners,
                ignorePermissions: Config_1.configOptions.owners
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
    }
    ;
    exec(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const code = interaction.options.getString(this.arguments[0].name);
                const start = process.hrtime();
                let output = eval(code);
                const difference = process.hrtime(start);
                if (typeof output !== "string")
                    output = (0, util_1.inspect)(output, {
                        depth: 2
                    });
                return interaction.reply((0, common_tags_1.stripIndents) `
                **Executed in ${difference[0] > 0 ? `${difference[0]}s` : ""}${difference[1] / 1e6}ms**
                \`\`\`js
                ${output.length > 1950 ? "Code length exceeds maximum size allowed." : output}
                \`\`\`
            `);
            }
            catch (error) {
                return interaction.reply((0, common_tags_1.stripIndents) `
                	**An errror occcured while attempting to evaluate the given code:**
                \`${error.stack}\`
            `);
            }
            ;
        });
    }
    ;
}
exports.default = EvalCommand;
;
