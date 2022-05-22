import { Client, Listener } from "../../lib/core/exports";
import { Constants } from "../../lib/base/constants";
import { GuildConfig } from "@prisma/client";
import { Message, MessageEmbed } from "discord.js";

export default class MessageCreateListener extends Listener {
    public constructor() {
        super("messageCreate", {
            categoryID: "client",
            emitter: "client",
            once: false
        });
    }

    public async exec(client: Client, message: Message): Promise<void> {
        const guildConfig: GuildConfig = await client.db.guildConfig.findUnique({
            where: {
                guildID: message.guildId as string
            }
        }) as GuildConfig;

        if (message.author.bot) return;
        if (!message.guild) return;
        if (message.guildId !== Constants["BaseGuild"]) return;
        if (message.channelId === guildConfig.suggestionsChannelID) {
            message.delete();

            message.channel.send({
                embeds: [
                    new MessageEmbed({
                        color: Constants["Defaults"].embed.color.default,
                        author: {
                            name: `Suggestion by ${message.author.tag}`,
                            iconURL: message.author.displayAvatarURL({ dynamic: true })
                        },
                        description: `${message.author} has added a suggestion! React with :thumbsup: if you agree with this suggestion or :thumbsdown: if you disagree.\n\n> ${message.content}`
                    })
                ]
            })
                .then(async (msg: Message): Promise<void> => {
                    await msg.react("👍");
                    await msg.react("👎");
                })
                .catch((): null => null);
        }
    }
}