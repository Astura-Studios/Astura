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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!client.queues.get(interaction.guildId))
                    return interaction.reply({
                        embeds: [
                            {
                                color: client.util.defaults.embed.color,
                                description: "The music queue for the current server is currently empty."
                            }
                        ]
                    });
                const guildQueue = client.queues.get(interaction.guildId);
                const next = guildQueue.queue;
                const text = next.map((song, index) => `${++index}) ${song.info.title} - ${song.info.author} - ${client.util.date.convertFromMs(song.info.length, true, "d:h:m:s", "max")}`);
                console.log(text);
                return interaction.reply({
                    embeds: [
                        {
                            color: client.util.defaults.embed.color,
                            author: {
                                name: `${interaction.guild.name} - Server Music Queue`,
                                iconURL: interaction.guild.iconURL({ dynamic: true })
                            },
                            thumbnail: {
                                url: interaction.guild.iconURL({ dynamic: true })
                            },
                            description: `${text.length <= 0 ? "**The music queue for the current server is currently empty.**" : text.join("\n")}`
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
