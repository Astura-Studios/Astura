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
class SearchCommand extends Command_1.Command {
    constructor() {
        super("search", {
            arguments: [
                new Argument_1.Argument({
                    name: "query",
                    description: "The search queury you want to use to search for a song.",
                    required: true,
                    type: "string"
                })
            ],
            category: "Music",
            channel: "guild",
            cooldown: 5,
            description: "Uses a provided search query and returns a list of songs with names similiar to the search query.",
            enabledByDefault: true,
            examples: [
                "search Ascendus - Legacy",
                "search Ascendus - Resurgence"
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
            usage: "search <query>"
        });
    }
    ;
    exec(client, interaction) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchQuery = interaction.options.getString("query");
                if (!interaction.member.voice.channel)
                    return interaction.reply({
                        content: "You are not in a voice channel.",
                        ephemeral: true
                    });
                if (!client.queues.get(interaction.guildId))
                    client.queues.set(interaction.guildId, new Queue_1.Queue(client, {
                        guildID: interaction.guildId,
                        channelID: (_a = interaction.member.voice.channel) === null || _a === void 0 ? void 0 : _a.id,
                        textChannel: interaction.channel
                    }));
                const guildQueue = client.queues.get(interaction.guildId);
                const songs = yield guildQueue.search(searchQuery);
                if (!songs || songs.length === 0)
                    return interaction.reply({
                        content: "Unknown song.",
                        ephemeral: true
                    });
                const list = songs.slice(0, 5);
                const options = list.map((song, index) => `**${++index})** ${song.info.title} (${song.info.author}) - ${client.util.date.convertFromMs(song.info.length, true, "d:h:m:s", "max")}`);
                interaction.reply({
                    embeds: [
                        {
                            color: client.util.defaults.embed.color,
                            author: {
                                name: `Search results for: ${searchQuery} (${interaction.user.username})`,
                                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                            },
                            description: `${options.join("\n")}\n`
                        }
                    ]
                });
                const filter = (m) => m.author.id === interaction.user.id && ["1", "2", "3", "4", "5", "cancel"].includes(m.content.toLowerCase());
                const chosenSong = (_b = (yield (yield interaction.channel.awaitMessages({ filter, max: 1 }))).first()) === null || _b === void 0 ? void 0 : _b.content;
                if (chosenSong === "cancel")
                    return interaction.reply({
                        content: "Cancelled search command.",
                        ephemeral: true
                    });
                const song = list[parseInt(chosenSong) - 1];
                const isAdded = yield guildQueue.play(song);
                if (isAdded) {
                    return interaction.reply({
                        embeds: [
                            {
                                color: client.util.defaults.embed.color,
                                title: `Added to queue: ${song.info.author}`,
                                fields: [
                                    { name: "Author", value: song.info.author, inline: true },
                                    { name: "Length", value: client.util.date.convertFromMs(song.info.length, true, "d:h:m:s", "max"), inline: true },
                                    { name: "Link", value: song.info.uri, inline: true }
                                ]
                            }
                        ]
                    });
                }
            }
            catch (error) {
                return console.log(`${client.util.date.getLocalTime()} | [ Search Command ] ${error.stack}`);
            }
            ;
        });
    }
    ;
}
exports.default = SearchCommand;
;
