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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../structures/Command");
const Config_1 = require("../../client/Config");
const node_fetch_1 = __importDefault(require("node-fetch"));
class MemeCommand extends Command_1.Command {
    constructor() {
        super("meme", {
            category: "Fun",
            channel: "all",
            cooldown: 5,
            description: "Fetches a random meme post from Reddit.",
            enabledByDefault: true,
            examples: [
                "/meme"
            ],
            exceptions: {
                ignoreCooldown: Config_1.configOptions.owners,
                ignorePermissions: Config_1.configOptions.owners
            },
            isSubCommand: false,
            ownerOnly: false,
            permissions: {
                clientPermissions: [
                    "SEND_MESSAGES"
                ],
                userPermissions: [
                    "SEND_MESSAGES"
                ]
            },
            usage: "/meme"
        });
    }
    ;
    exec(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, node_fetch_1.default)("https://www.reddit.com/r/memes/random/.json") //fetch("https://meme-api.herokuapp.com/gimme")
                    .then((response) => response.json())
                    .then((data) => {
                    const content = data[0].data.children[0].data;
                    const permalink = content.permalink;
                    const memeURL = `https://www.reddit.com${permalink}`; // content.postLink
                    const memeImage = content.url;
                    const memeTitle = content.title;
                    const memeUpvotes = content.ups;
                    const memeDownvotes = content.downs;
                    const memeComments = content.num_comments;
                    return interaction.reply({
                        embeds: [
                            {
                                color: client.util.defaults.embed.color,
                                title: `${memeTitle}`,
                                url: memeURL,
                                image: {
                                    url: memeImage // content.url
                                },
                                description: `<:thumbs_up_white:796179483253538898> ${memeUpvotes}, <:thumbs_down_white:796178894809202719> ${memeDownvotes}, <:chat_white_icon:796178895119581224> ${memeComments}`
                            }
                        ]
                    });
                })
                    .catch((error) => {
                    console.log(`${client.util.date.getLocalTime()} | [ Shrug Command ] ${error.stack}`);
                    return interaction.reply({
                        content: "Something went wrong! Please try again.",
                        ephemeral: true
                    });
                });
            }
            catch (error) {
                return console.log(`${client.util.date.getLocalTime()} | [ Meme Command ] ${error.stack}`);
            }
            ;
        });
    }
    ;
}
exports.default = MemeCommand;
;
