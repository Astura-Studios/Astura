"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const discord_js_1 = require("@lavacord/discord.js");
class Manager extends discord_js_1.Manager {
    constructor(client) {
        super(client, client.nodes);
    }
    ;
}
exports.Manager = Manager;
;
