import { Client, Listener } from "../../lib/core/exports";
import { Constants } from "../../lib/base/constants";
import { GuildMember, Message, MessageReaction, User } from "discord.js";

export default class MessageReactionAddistener extends Listener {
    public constructor() {
        super("messageReactionAdd", {
            categoryID: "client",
            emitter: "client",
            once: false
        });
    }

    public async exec(_client: Client, messageReaction: MessageReaction, user: User): Promise<void> {
        const reaction: MessageReaction = await messageReaction.fetch();
        const message: Message = await messageReaction.message.fetch();

        if (!message.guild) return;
        if (reaction.message.guildId !== Constants["BaseGuild"]) return;
        if (user.bot) return;
 
        const member: GuildMember | undefined = await message.guild.members.fetch(user.id);
        const roleId: string | undefined = Constants["ReactionRoles"][reaction.emoji.name as string];
        const reactionMessages: string[] = ["905337770778689606", "905337780438200320", "905337796108107826"];
    
        if (reactionMessages.includes(message.id)) {
            if (roleId && member && !member.roles.cache.has(roleId)) member.roles.add(roleId);
        }
    }
}