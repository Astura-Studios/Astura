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
class PingCommand extends Command_1.Command {
    constructor() {
        super("ping", {
            category: "Utility",
            channel: "all",
            cooldown: 5,
            description: "Get the latency of the ping to the Discord API.",
            enabledByDefault: true,
            examples: ["/ping"],
            exceptions: {
                ignoreCooldown: Config_1.configOptions.owners,
                ignorePermissions: Config_1.configOptions.owners
            },
            isSubCommand: false,
            permissions: {
                clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "USE_EXTERNAL_EMOJIS", "MANAGE_MESSAGES"],
                userPermissions: ["SEND_MESSAGES"]
            },
            ownerOnly: false,
            usage: "/ping"
        });
    }
    ;
    exec(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return interaction.reply(`:ping_pong: **Pong!** \`${client.ws.ping}ms\``);
            }
            catch (error) {
                return console.log(`${client.util.date.getLocalTime()} | [ Ping Command ] ${error.stack}`);
            }
            ;
        });
    }
    ;
}
exports.default = PingCommand;
;
