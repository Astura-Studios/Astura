import { Listener } from "../../structures/Listener";
import { GuildMember, MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";

export default class MessageReactionRemoveListener extends Listener {
    public constructor() {
        super("messageReactionRemove", {
            category: "client",
            emitter: "client",
            name: "messageReactionRemove"
        });
    };

    public async exec(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser): Promise<void | GuildMember> {
        try {
            if (reaction.message.id === "905337770778689606") {
                if (reaction.partial) {
                    try {
                        reaction = await reaction.fetch();
                    } catch (error) {
                        return console.log(`${this.client.util.date.getLocalTime()} | [ Message Reaction Add Listener ] ${(error as Error).stack}`);
                    };  
                };

                const member: GuildMember = await reaction.message.guild?.members.fetch(user.id) as GuildMember;
                const reactionRoles: {
                    emoji: string;
                    role: string;
                }[] = [
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
                    if (member.roles.cache.find(emoji => emoji.name === reactionRole.emoji)) return;
                    if (reaction.emoji.id !== reactionRole.emoji || reaction.emoji.name !== reactionRole.emoji) return;
                    return member.roles.remove(reactionRole.role);
                };
            } else if (reaction.message.id === "905337780438200320") {
                if (reaction.partial) {
                    try {
                        reaction = await reaction.fetch();
                    } catch (error) {
                        return console.log(`${this.client.util.date.getLocalTime()} | [ Message Reaction Add Listener ] ${(error as Error).stack}`);
                    };  
                };

                const member: GuildMember = await reaction.message.guild?.members.fetch(user.id) as GuildMember;
                const reactionRoles: {
                    emoji: string;
                    role: string;
                }[] = [
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
                    if (member.roles.cache.find(emoji => emoji.name === reactionRole.emoji)) return;
                    if (reaction.emoji.id !== reactionRole.emoji || reaction.emoji.name !== reactionRole.emoji) return;
                    return member.roles.remove(reactionRole.role);
                };
            } else if (reaction.message.id === "905337780438200320") {
                if (reaction.partial) {
                    try {
                        reaction = await reaction.fetch();
                    } catch (error) {
                        return console.log(`${this.client.util.date.getLocalTime()} | [ Message Reaction Add Listener ] ${(error as Error).stack}`);
                    };  
                };

                const member: GuildMember = await reaction.message.guild?.members.fetch(user.id) as GuildMember;
                const reactionRoles: {
                    emoji: string;
                    role: string;
                }[] = [
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
                    if (member.roles.cache.find(emoji => emoji.name === reactionRole.emoji)) return;
                    if (reaction.emoji.id !== reactionRole.emoji || reaction.emoji.name !== reactionRole.emoji) return;
                    return member.roles.remove(reactionRole.role);
                };
            };
        } catch (error) {
            return console.log(`${this.client.util.date.getLocalTime()} | [ Message Reaction Remove Listener ] ${(error as Error).stack}`);
        };
    };
};