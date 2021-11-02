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
const discord_js_1 = require("discord.js");
const Config_1 = require("../../client/Config");
const OptionChoice_1 = require("../../structures/OptionChoice");
class SuggestCommand extends Command_1.Command {
    constructor() {
        super("suggest", {
            aliases: ["suggestion"],
            arguments: [
                new Argument_1.Argument({
                    name: "suggestion",
                    description: "Your suggestion.",
                    required: true,
                    type: "string"
                }),
                new Argument_1.Argument({
                    name: "urgent",
                    description: "Describe whether the suggestion is urgent or not",
                    required: true,
                    type: "string",
                    choices: [
                        new OptionChoice_1.OptionChoice("Yes", "Yes"),
                        new OptionChoice_1.OptionChoice("No", "No")
                    ]
                })
            ],
            category: "Miscellaneous",
            channel: "guild",
            cooldown: 60,
            description: "Add a suggestion to be added to Astura Studio's suggestions channel.",
            enabledByDefault: true,
            examples: [
                "/suggest Add a channel",
                "/suggest Remove a role"
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
                    "USE_EXTERNAL_EMOJIS"
                ],
                userPermissions: [
                    "SEND_MESSAGES"
                ]
            },
            usage: "/suggest <suggestion>"
        });
    }
    ;
    exec(client, interaction) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (interaction.channelId !== "902052635127988295")
                    return interaction.reply({
                        content: `Please ensure you enter a suggestion in the ${client.markdown.channelMention("902052635127988295")} channel!`,
                        ephemeral: true
                    });
                const suggestion = interaction.options.getString(this.arguments[0].name);
                const isUrgent = interaction.options.getString(this.arguments[0].name);
                const webhook = new discord_js_1.WebhookClient({
                    url: "https://discord.com/api/webhooks/904551726533738546/wGNBwWV23ys2isSM4V7-tWJ3cr8_O24LMJU5cHR6yti7Hw0EmYL_V_soxk_RXiictFwF"
                });
                const webhookMessage = yield webhook.send({
                    embeds: [
                        {
                            color: client.util.defaults.embed.color,
                            author: {
                                name: `Astura Studios - Suggestion by ${interaction.user.tag}`,
                                iconURL: (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.iconURL()
                            },
                            description: `${client.markdown.userMention(interaction.user.id)} submitted a suggestion on ${client.markdown.timestamp()}. This suggestion is ${client.markdown.bold(isUrgent.toLowerCase() === "yes" ? "urgent" : "not urgent")}. If you agree with this suggestion, react with :one:. If you disagree, you can react with :two:.`,
                            fields: [
                                { name: "Suggestion", value: suggestion },
                            ],
                            thumbnail: {
                                url: interaction.user.displayAvatarURL({ dynamic: true })
                            }
                        }
                    ]
                });
                const message = yield ((_b = interaction.channel) === null || _b === void 0 ? void 0 : _b.messages.fetch(webhookMessage.id));
                message.react("1️⃣");
                return message.react("2️⃣");
            }
            catch (error) {
                return console.log(`${client.util.date.getLocalTime()} | [ Suggest Command ] ${error.stack}`);
            }
            ;
        });
    }
    ;
}
exports.default = SuggestCommand;
;
