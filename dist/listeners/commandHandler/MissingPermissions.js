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
const Listener_1 = require("../../structures/Listener");
class MissingPermissionsListener extends Listener_1.Listener {
    constructor() {
        super("missingPermissions", {
            category: "commandHandler",
            emitter: "commandHandler",
            name: "missingPermissions"
        });
    }
    ;
    exec(_client, interaction, embed, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === "CLIENT_SEND_PERMISSIONS_MISSING") {
                return interaction.user.send({
                    embeds: [
                        embed
                    ]
                });
            }
            else {
                return interaction.reply({
                    embeds: [
                        embed
                    ],
                    ephemeral: true
                });
            }
            ;
        });
    }
    ;
}
exports.default = MissingPermissionsListener;
;
