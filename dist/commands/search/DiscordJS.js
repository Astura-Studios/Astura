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
class DiscordJSCommand extends Command_1.Command {
    constructor() {
        super("djs", {
            aliases: ["discordjs"],
            category: "Search",
            channel: "all",
            cooldown: 4,
            description: "Fetches information from the official discord.js documentation using a provided search query.",
            enabledByDefault: true,
            examples: [
                "djs Client",
                "discordjs TextChannel#send()"
            ],
            exceptions: {
                ignoreCooldown: Config_1.configOptions.owners,
                ignorePermissions: Config_1.configOptions.owners
            },
            isSubCommand: false,
            ownerOnly: false,
            permissions: {
                clientPermissions: ["SEND_MESSAGES", "MANAGE_MESSAGES", "ADD_REACTIONS", "USE_EXTERNAL_EMOJIS"],
                userPermissions: ["SEND_MESSAGES"]
            },
            usage: "djs <query>",
        });
    }
    ;
    exec(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = interaction.options.getString("query");
                const URL = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`;
                const data = yield fetch(URL);
                const embed = yield data.json();
                if (!embed || embed.error) {
                    const promise = new Promise((resolve, _reject) => {
                        return resolve(interaction.reply({
                            embeds: [
                                {
                                    color: 0x2296f3,
                                    author: {
                                        name: `Discord.js Docs (stable)`,
                                        iconURL: "https://images-ext-1.discordapp.net/external/5T4uh_keplxixt9k8Rnivq5dMvrLOW2Z11k-OXn-3io/https/discord.js.org/favicon.ico"
                                    },
                                    title: "Search results:",
                                    description: "No results found."
                                }
                            ]
                        }));
                    });
                    promise.then(() => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        const message = (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.lastMessage;
                        message.react("🗑️");
                        let react;
                        const filter = (reaction, user) => reaction.emoji.name === "🗑️" && user.id === message.author.id;
                        react = yield message.awaitReactions({ filter, time: undefined, max: 1, errors: ["time"] });
                        if (react && react.first())
                            message.delete();
                    }));
                }
                else {
                    const promise = new Promise((resolve, _reject) => {
                        return resolve(interaction.reply({
                            embeds: [
                                embed
                            ]
                        }));
                    });
                    promise.then(() => __awaiter(this, void 0, void 0, function* () {
                        var _b;
                        const message = (_b = interaction.channel) === null || _b === void 0 ? void 0 : _b.lastMessage;
                        message.react("🗑️");
                        let react;
                        const filter = (reaction, user) => reaction.emoji.name === "🗑️" && user.id === message.author.id;
                        react = yield message.awaitReactions({ filter, time: undefined, max: 1, errors: ["time"] });
                        if (react && react.first())
                            message.delete();
                    }));
                }
                ;
            }
            catch (error) {
                return console.log(`${client.util.date.getLocalTime()} | [ DiscordJS Command ] ${error.stack}`);
            }
            ;
        });
    }
    ;
}
exports.default = DiscordJSCommand;
;
