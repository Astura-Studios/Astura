"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const discord_js_1 = require("@lavacord/discord.js");
const Nodes_1 = require("./Nodes");
class Manager extends discord_js_1.Manager {
    constructor(client) {
        super(client, Nodes_1.nodes, {
            user: client.config.clientID
        });
    }
    ;
}
exports.Manager = Manager;
;
