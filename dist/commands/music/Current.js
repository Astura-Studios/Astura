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
class NPCommand extends Command_1.Command {
    constructor() {
        super("current", {
            category: "Music",
            channel: "guild",
            cooldown: 7,
            description: "Views the song currently being played.",
            enabledByDefault: true,
            examples: [
                "current"
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
            usage: "current"
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
                                description: "Nothing is currently playing in a voice channel in the server."
                            }
                        ]
                    });
                const guildQueue = client.queues.get(interaction.guildId);
                const song = guildQueue.currentlyPlaying;
                return interaction.reply({
                    embeds: [
                        {
                            color: client.util.defaults.embed.color,
                            title: `Currently playing: ${song.info.author}`,
                            fields: [
                                { name: "Author", value: song.info.author, inline: true },
                                { name: "Length", value: client.util.date.convertFromMs(song.info.length, true, "d:h:m:s", "max"), inline: true },
                                { name: "Link", value: song.info.uri, inline: true }
                            ]
                        }
                    ]
                });
            }
            catch (error) {
                return console.log(`${client.util.date.getLocalTime()} | [ Current Command ] ${error.stack}`);
            }
            ;
        });
    }
    ;
}
exports.default = NPCommand;
;
