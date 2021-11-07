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
class GuildMemberRemoveListener extends Listener_1.Listener {
    constructor() {
        super("guildMemberRemove", {
            category: "client",
            emitter: "client",
            name: "guildMemberRemove"
        });
    }
    ;
    exec(_client, member) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalMembers = yield member.guild.channels.resolve("811391499140595763");
                const memberCount = yield member.guild.channels.resolve("786354352108994621");
                const botCount = yield member.guild.channels.resolve("811439914980868106");
                const goalCount = yield member.guild.channels.resolve("787211664591814716");
                const boostTier = yield member.guild.channels.resolve("866510113208401940");
                totalMembers.setName(`Total Members: ${(yield member.guild.members.fetch()).size.toString()}`);
                memberCount.setName(`Member Count: ${(yield (yield member.guild.members.fetch()).filter(m => !m.user.bot)).size.toString()}`);
                botCount.setName(`Bot Count: ${(yield (yield member.guild.members.fetch()).filter(m => m.user.bot)).size.toString()}`);
                const currentGoal = parseInt(goalCount.name);
                if (parseInt(totalMembers.name) > currentGoal)
                    goalCount.setName(`Goal: ${(currentGoal + 100).toString()}`);
                switch (member.guild.premiumTier) {
                    case "NONE":
                        boostTier.setName("Boost Tier: 0");
                        break;
                    case "TIER_1":
                        boostTier.setName("Boost Tier: 1");
                        break;
                    case "TIER_2":
                        boostTier.setName("Boost Tier: 2");
                        break;
                    case "TIER_3":
                        boostTier.setName("Boost Tier: 3");
                        break;
                }
                ;
            }
            catch (error) {
                return console.log(`${this.client.util.date.getLocalTime()} | [ Guild Member Remove Listener ] ${error.stack}`);
            }
            ;
        });
    }
    ;
}
exports.default = GuildMemberRemoveListener;
;
