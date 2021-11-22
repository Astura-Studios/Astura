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
class QueueCommand extends Command_1.Command {
    constructor() {
        super("queue", {
            category: "Music",
            channel: "guild",
            cooldown: 7,
            description: "View the current music queue for the server.",
            enabledByDefault: true,
            examples: [
                "queue"
            ],
            exceptions: {
                ignoreCooldown: Config_1.configOptions.owners,
                ignorePermissions: Config_1.configOptions.owners
            },
            isSubCommand: false,
            ownerOnly: false,
            permissions: {
                clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES", "USE_EXTERNAL_EMOJIS",],
                userPermissions: ["SEND_MESSAGES"]
            },
            usage: "queue"
        });
    }
    ;
    exec(client, interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const guildQueue = client.queues.get(interaction.guildId);
                if (!guildQueue)
                    return (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send({
                        content: "Nothing is currently playing."
                    });
                const next = guildQueue.queue;
                const text = next.map((song, index) => `${++index}) ${song.info.title} - ${song.info.author} - ${client.util.date.convertFromMs(song.info.length)}`);
                return interaction.reply({
                    embeds: [
                        {
                            color: client.util.defaults.embed.color,
                            title: "Server Queue",
                            description: client.markdown.codeBlock(`${text !== null && text !== void 0 ? text : "Nothing in queue"}\n`)
                        }
                    ]
                });
            }
            catch (error) {
                return console.log(`${client.util.date.getLocalTime()} | [ Queue Command ] ${error.stack}`);
            }
            ;
        });
    }
    ;
}
exports.default = QueueCommand;
;
