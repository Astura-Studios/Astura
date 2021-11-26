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
class SkipCommand extends Command_1.Command {
    constructor() {
        super("skip", {
            category: "Music",
            channel: "guild",
            cooldown: 5,
            description: "Skips the current song in the queue being played.",
            enabledByDefault: true,
            examples: [
                "skip"
            ],
            exceptions: {
                ignoreCooldown: Config_1.configOptions.owners,
                ignorePermissions: Config_1.configOptions.owners
            },
            isSubCommand: false,
            ownerOnly: false,
            permissions: {
                clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "USE_EXTERNAL_EMOJIS", "MANAGE_MESSAGES"],
                userPermissions: ["SEND_MESSAGES"]
            },
            usage: "skip"
        });
    }
    ;
    exec(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!interaction.member.voice.channel)
                    return interaction.reply({
                        embeds: [
                            {
                                color: client.util.defaults.embed.color,
                                author: {
                                    name: "Looks like you've been lost in the void.",
                                    iconURL: interaction.user.avatarURL({ dynamic: true })
                                },
                                description: `${client.markdown.userMention(interaction.user.id)}, it seems I was unable to skip the currently playing song as you requested as you are not in a voice channel. Please join a voice channel first and then rerun the command.`
                            }
                        ],
                        ephemeral: true
                    });
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
                guildQueue.playNext();
            }
            catch (error) {
                return console.log(`${client.util.date.getLocalTime()} | [ Skip Command ] ${error.stack}`);
            }
            ;
        });
    }
    ;
}
exports.default = SkipCommand;
;
