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
const Queue_1 = require("../../structures/music/Queue");
const Config_1 = require("../../client/Config");
class PlayCommand extends Command_1.Command {
    constructor() {
        super("play", {
            arguments: [
                new Argument_1.Argument({
                    name: "song",
                    description: "The song to play in the voice channel.",
                    required: true,
                    type: "string"
                })
            ],
            category: "Music",
            channel: "guild",
            cooldown: 7,
            description: "Plays a given song in the voice channel the user is in.",
            enabledByDefault: true,
            examples: [
                "play Ascendus - Risen",
                "play https://www.youtube.com/watch?v=elYgELiZ2_4"
            ],
            exceptions: {
                ignoreCooldown: Config_1.configOptions.owners,
                ignorePermissions: Config_1.configOptions.owners
            },
            isSubCommand: false,
            ownerOnly: false,
            permissions: {
                clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES", "CONNECT", "SPEAK", "USE_EXTERNAL_EMOJIS",],
                userPermissions: ["SEND_MESSAGES", "CONNECT", "SPEAK"]
            },
            usage: "play <url/song title>"
        });
    }
    ;
    exec(client, interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!interaction.member.voice.channel)
                    return interaction.reply({
                        content: "You must be in a voice channel to play a song!",
                        ephemeral: true
                    });
                const inputSong = interaction.options.getString("song");
                if (!inputSong)
                    return interaction.reply({
                        content: "Please provide a song to play!",
                        ephemeral: true
                    });
                const guildQueue = client.queues.get(interaction.guildId);
                if (guildQueue)
                    client.queues.set(interaction.guildId, new Queue_1.Queue(client, {
                        guildID: interaction.guildId,
                        channelID: (_a = interaction.member.voice.channel) === null || _a === void 0 ? void 0 : _a.id,
                        textChannel: interaction.channel
                    }));
                const { song } = yield (yield guildQueue.search(inputSong)).json();
                if (!song)
                    return interaction.reply({
                        content: "Unknown song.",
                        ephemeral: true
                    });
                const isAdded = yield guildQueue.play(song);
                if (isAdded) {
                    return interaction.reply({
                        embeds: [
                            {
                                color: client.util.defaults.embed.color,
                                title: `Added to queue: ${song.info.author}`,
                                fields: [
                                    { name: "Author", value: song.info.author, inline: true },
                                    { name: "Length", value: client.util.date.convertFromMs(song.info.author), inline: true },
                                    { name: "Link", value: song.info.uri, inline: true }
                                ]
                            }
                        ]
                    });
                }
                ;
            }
            catch (error) {
                return console.log(`${client.util.date.getLocalTime()} | [ Play Command ] ${error.stack}`);
            }
            ;
        });
    }
    ;
}
exports.default = PlayCommand;
;
