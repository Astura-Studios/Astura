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
class EvalCommand extends Command_1.Command {
    constructor() {
        super("shrug", {
            arguments: [
                new Argument_1.Argument({
                    name: "message",
                    description: "Your message",
                    required: false,
                    type: "string"
                })
            ],
            category: "Fun",
            channel: "all",
            cooldown: 1,
            description: "Appends ¯\\\_(ツ)\_/¯ to your message.",
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
                    "SEND_MESSAGES",
                    "MANAGE_WEBHOOKS"
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
                const webhook = yield interaction.channel.createWebhook(interaction.member.nickname || interaction.user.username, {
                    avatar: interaction.user.displayAvatarURL()
                });
                const message = interaction.options.getString(this.arguments[0].name);
                if (message) {
                    yield webhook.send(`${message} ¯\\\_(ツ)\_/¯`)
                        .then(() => {
                        return webhook.delete();
                    });
                }
                else {
                    yield webhook.send(`¯\\\_(ツ)\_/¯`)
                        .then(() => {
                        return webhook.delete();
                    });
                }
                ;
            }
            catch (error) {
                return console.log(`${client.util.date.getLocalTime()} | [ Shrug Command ] ${error.stack}`);
            }
            ;
        });
    }
    ;
}
exports.default = EvalCommand;
;
