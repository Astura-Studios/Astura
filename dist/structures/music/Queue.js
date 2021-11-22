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
exports.Queue = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class Queue {
    constructor(client, options) {
        this.client = client;
        this.currentlyPlaying = null;
        this.guildID = options.guildID;
        this.channelID = options.channelID;
        this.manager = this.client.manager;
        this.player = null;
        this.textChannel = options.textChannel;
        this.queue = [];
    }
    ;
    search(searchQuery) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const node = this.manager.idealNodes[0];
            const urlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            const params = new URLSearchParams();
            params.append("identifier", urlRegex.test(searchQuery) ? searchQuery : `ytsearch:${searchQuery}`);
            const data = yield fetch(`http://${node.host}:${node.port}/loadtracks?${params}`, {
                headers: {
                    "Authorization": node.password
                }
            });
            console.log(data);
            return (_a = data.data.tracks) !== null && _a !== void 0 ? _a : [];
        });
    }
    ;
    play(track) {
        return __awaiter(this, void 0, void 0, function* () {
            this.queue.push(track);
            if (!this.currentlyPlaying) {
                this.playNext();
                return false;
            }
            else {
                return true;
            }
            ;
        });
    }
    ;
    playNext() {
        return __awaiter(this, void 0, void 0, function* () {
            const nextSong = this.queue.shift();
            this.currentlyPlaying = nextSong;
            if (!nextSong) {
                this.player = null;
                this.currentlyPlaying = null;
                yield this.manager.leave(this.guildID);
                this.textChannel.send("Finished playing.");
            }
            ;
            this.textChannel.send({
                embeds: [
                    {
                        color: this.client.util.defaults.embed.color,
                        title: `Now playing: ${nextSong.info.title}`,
                        fields: [
                            { name: "Author", value: nextSong.info.author, inline: true },
                            { name: "Length", value: this.client.util.date.convertFromMs(nextSong.info.author), inline: true },
                            { name: "Link", value: nextSong.info.uri, inline: true }
                        ]
                    }
                ]
            });
            if (!this.player) {
                this.player = yield this.manager.join({
                    guild: this.guildID,
                    channel: this.channelID,
                    node: this.manager.idealNodes[0].id
                });
                this.player.on("end", data => {
                    if (data.reason === "REPLACED" || data.reason === "STOPPED")
                        return;
                    this.playNext();
                });
            }
            ;
            yield this.player.play(nextSong.track);
        });
    }
    ;
}
exports.Queue = Queue;
;
