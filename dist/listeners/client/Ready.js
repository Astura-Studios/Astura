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
const discord_js_1 = require("discord.js");
const Listener_1 = require("../../structures/Listener");
class ReadyListener extends Listener_1.Listener {
    constructor() {
        super("ready", {
            category: "client",
            emitter: "client",
            name: "ready"
        });
    }
    ;
    exec(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const statuses = {
                    "online": "Online",
                    "idle": "Idle",
                    "dnd": "Do Not Disturb",
                    "offline": "Offline",
                    "invisible": "Offline"
                };
                console.log(`${client.util.date.getLocalTime()} | [ discord.js ] discord.js Version: ${discord_js_1.version}`);
                client.user.setPresence({
                    activities: [
                        {
                            name: `${client.users.cache.size}} users | a.help`,
                            type: "WATCHING"
                        }
                    ],
                    status: "online"
                });
                return console.log(`${client.util.date.getTime()} | [ Astura Client ] ${client.user.tag} is ready and online | Status: ${statuses[client.user.presence.status]} | Websocket Ping: ${client.ws.ping.toFixed(2)}ms`);
            }
            catch (error) {
                return console.log(`${client.util.date.getLocalTime()} | [ Ready Listener ] ${error.stack}`);
            }
            ;
        });
    }
    ;
}
exports.default = ReadyListener;
;
