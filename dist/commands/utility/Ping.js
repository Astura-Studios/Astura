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
const Command_1 = require("../../structures/Command");
const Config_1 = require("../../client/Config");
const util_1 = require("util");
class PingCommand extends Command_1.Command {
    constructor() {
        super("ping", {
            category: "Utility",
            channel: "all",
            cooldown: 5,
            description: "Get the latency of the ping to the Discord API, RTT and ORM connection speed.",
            enabledByDefault: true,
            examples: [
                "/ping"
            ],
            exceptions: {
                ignoreCooldown: Config_1.configOptions.owners,
                ignorePermissions: Config_1.configOptions.owners
            },
            isSubCommand: false,
            permissions: {
                clientPermissions: [
                    "SEND_MESSAGES",
                    "EMBED_LINKS",
                    "USE_EXTERNAL_EMOJIS",
                    "MANAGE_MESSAGES"
                ],
                userPermissions: [
                    "SEND_MESSAGES"
                ]
            },
            ownerOnly: true,
            usage: "/ping"
        });
    }
    ;
    exec(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wait = (0, util_1.promisify)(setTimeout);
                yield interaction.reply({
                    embeds: [
                        client.util.embed({
                            color: client.util.defaults.embed.color,
                            description: "<a:discord_loading:796184140378144808> **Pinging...**"
                        })
                    ],
                    fetchReply: true
                })
                    .then((loadingEmbed) => {
                    wait(2000);
                    const start = process.hrtime();
                    client.db;
                    const difference = process.hrtime(start);
                    return interaction.editReply({
                        embeds: [
                            client.util.embed({
                                color: client.util.defaults.embed.color,
                                author: {
                                    name: `${client.user.username} - RTT, Websocket Ping and ORM Connection Speed`,
                                    iconURL: client.user.displayAvatarURL({ dynamic: true }),
                                },
                                thumbnail: {
                                    url: client.user.displayAvatarURL({ dynamic: true })
                                },
                                description: `:ping_pong: ${client.markdown.bold(`Pong! ${client.markdown.userMention(interaction.user.id)}, response was received in \`${Math.floor(loadingEmbed.createdTimestamp - interaction.createdTimestamp).toFixed(2)}ms\``)}`,
                                fields: [
                                    { name: `<a:loading_green_bar:796179271239467018> ${client.markdown.bold("Real-time Text")}`, value: client.markdown.languageCodeBlock(`> ${Math.floor(loadingEmbed.createdTimestamp - interaction.createdTimestamp).toFixed(2)}ms`, "md"), inline: true },
                                    { name: `<:status_bar:761134398602477568> ${client.markdown.bold("Websocket Ping")}`, value: client.markdown.languageCodeBlock(`> ${client.ws.ping.toFixed(2)}ms`, "md"), inline: true },
                                    { name: `<:server:761134398619648000> ${client.markdown.bold("ORM Connection")}`, value: client.markdown.languageCodeBlock(`> ${Math.round(difference[1] / 1e3).toFixed(2)}ms`, "md"), inline: true }
                                ]
                            })
                        ]
                    });
                });
            }
            catch (error) {
                return console.log(`${client.util.date.getLocalTime()} | [ Ping Command ] ${error.stack}`);
            }
            ;
        });
    }
    ;
}
exports.default = PingCommand;
;
