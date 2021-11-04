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
class MessageReactionAddListener extends Listener_1.Listener {
    constructor() {
        super("messageReactionAdd", {
            category: "client",
            emitter: "client",
            name: "messageReactionAdd"
        });
    }
    ;
    exec(reaction, user) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (reaction.message.id === "905337770778689606") {
                    if (reaction.partial) {
                        try {
                            reaction = yield reaction.fetch();
                        }
                        catch (error) {
                            return console.log(`${this.client.util.date.getLocalTime()} | [ Message Reaction Add Listener ] ${error.stack}`);
                        }
                        ;
                    }
                    ;
                    const member = yield ((_a = reaction.message.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(user.id));
                    const reactionRoles = [
                        {
                            emoji: "html",
                            role: "785217241335201832"
                        },
                        {
                            emoji: "css",
                            role: "785217241335201832"
                        },
                        {
                            emoji: "java",
                            role: "785217386327310368"
                        },
                        {
                            emoji: "javascript",
                            role: "785217561921978428"
                        },
                        {
                            emoji: "typescript",
                            role: "785217561921978428"
                        },
                        {
                            emoji: "python",
                            role: "785217761902592041"
                        },
                        {
                            emoji: "c_",
                            role: "785217785214402610"
                        },
                        {
                            emoji: "cplusplus",
                            role: "785217785214402610"
                        },
                        {
                            emoji: "csharp",
                            role: "785217785214402610"
                        },
                        {
                            emoji: "rust",
                            role: "902051596584763452"
                        },
                        {
                            emoji: "ruby",
                            role: "902051870904832010"
                        },
                        {
                            emoji: "go",
                            role: "902051749936914483"
                        },
                        {
                            emoji: "lua",
                            role: "902051802910973973"
                        }
                    ];
                    for (const reactionRole of reactionRoles) {
                        if (!member.roles.cache.find(emoji => emoji.name === reactionRole.emoji))
                            return;
                        if (reaction.emoji.id !== reactionRole.emoji || reaction.emoji.name !== reactionRole.emoji)
                            return;
                        return member.roles.add(reactionRole.role);
                    }
                    ;
                }
                else if (reaction.message.id === "905337780438200320") {
                    if (reaction.partial) {
                        try {
                            reaction = yield reaction.fetch();
                        }
                        catch (error) {
                            return console.log(`${this.client.util.date.getLocalTime()} | [ Message Reaction Add Listener ] ${error.stack}`);
                        }
                        ;
                    }
                    ;
                    const member = yield ((_b = reaction.message.guild) === null || _b === void 0 ? void 0 : _b.members.fetch(user.id));
                    const reactionRoles = [
                        {
                            emoji: "loudspeaker",
                            role: "859732969816457216"
                        },
                        {
                            emoji: "clapper",
                            role: "859733205539749909"
                        },
                        {
                            emoji: "video_game",
                            role: "904559834974785557"
                        },
                        {
                            emoji: "pizza",
                            role: "859735010852732969"
                        },
                        {
                            emoji: "tada",
                            role: "859735124320714773"
                        },
                        {
                            emoji: "bar_chart",
                            role: "859735320089591838"
                        }
                    ];
                    for (const reactionRole of reactionRoles) {
                        if (!member.roles.cache.find(emoji => emoji.name === reactionRole.emoji))
                            return;
                        if (reaction.emoji.id !== reactionRole.emoji || reaction.emoji.name !== reactionRole.emoji)
                            return;
                        return member.roles.add(reactionRole.role);
                    }
                    ;
                }
                else if (reaction.message.id === "905337780438200320") {
                    if (reaction.partial) {
                        try {
                            reaction = yield reaction.fetch();
                        }
                        catch (error) {
                            return console.log(`${this.client.util.date.getLocalTime()} | [ Message Reaction Add Listener ] ${error.stack}`);
                        }
                        ;
                    }
                    ;
                    const member = yield ((_c = reaction.message.guild) === null || _c === void 0 ? void 0 : _c.members.fetch(user.id));
                    const reactionRoles = [
                        {
                            emoji: "speech_balloon",
                            role: "899574312653164634"
                        },
                        {
                            emoji: "question",
                            role: "767250923932090378"
                        },
                        {
                            emoji: "tools",
                            role: "767179621358895134"
                        }
                    ];
                    for (const reactionRole of reactionRoles) {
                        if (!member.roles.cache.find(emoji => emoji.name === reactionRole.emoji))
                            return;
                        if (reaction.emoji.id !== reactionRole.emoji || reaction.emoji.name !== reactionRole.emoji)
                            return;
                        return member.roles.add(reactionRole.role);
                    }
                    ;
                }
                else
                    console.log("Fail", reaction.message.id);
            }
            catch (error) {
                return console.log(`${this.client.util.date.getLocalTime()} | [ Message Reaction Add Listener ] ${error.stack}`);
            }
            ;
        });
    }
    ;
}
exports.default = MessageReactionAddListener;
;
