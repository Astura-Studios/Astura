import { Client, Listener } from "../../lib/core/exports";
import { Constants } from "../../lib/base/constants";
import { GuildMember, Message, MessageReaction, PartialMessage, User } from "discord.js";

async function handleReaction(reaction: MessageReaction, user: User, message: Message | PartialMessage): Promise<void> {
    const member: GuildMember | undefined = await message.guild?.members.fetch(user.id);
    const roleId: string | undefined = Constants["ReactionRoles"][reaction.emoji.name as string];
    const reactionMessages: string[] = ["905337770778689606", "905337780438200320", "905337796108107826"];

    if (reactionMessages.includes(message.id)) {
        if (roleId && member && member.roles.cache.has(roleId)) member.roles.remove(roleId);
    }
}

export default class messageReactionRemove extends Listener {
    public constructor() {
        super("messageReactionRemove", {
            categoryID: "client",
            emitter: "client",
            once: false
        });
    }

    public async exec(client: Client, reaction: MessageReaction, user: User): Promise<void> {
        if (!reaction.message.guild) return;
        if (reaction.message.guildId !== Constants["BaseGuild"]) return;
        if (user.bot) return;

        if (reaction.partial) {
            await reaction.fetch()
                .then(async (reaction: MessageReaction): Promise<void> => {
                    await handleReaction(reaction, user, reaction.message);
                })
                .catch((error: Error): void => client.console.error(error.stack, "astura.listenerHandler", false));
        } else if (reaction.message.partial) {
            try {
                await reaction.message.fetch()
                    .then(async (message: Message<boolean>): Promise<void> => {
                        await handleReaction(reaction, user, message);
                    })
                    .catch((error: Error): void => client.console.error(error.stack, "astura.listenerHandler", false));
            } catch (error) {
                return client.console.error(error.stack, "astura.listenerHandler", false);
            }
        } else {
            await handleReaction(reaction, user, reaction.message);
        }
    }
}