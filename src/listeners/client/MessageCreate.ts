import { Client, Listener } from "../../lib/core/exports";
import { Constants } from "../../lib/base/constants"; 
import { Message, MessageEmbed } from "discord.js";

export default class MessageCreateListener extends Listener {
    public constructor() {
        super("messageCreate", {
            categoryID: "client",
            emitter: "client",
            once: false
        });
    }

    public async exec(_client: Client, message: Message): Promise<void> {
        if (message.author.bot) return;
        if (!message.guild) return;
        if (message.guildId !== Constants["BaseGuild"]) return;
        if (message.channelId === Constants["Channels"].SUGGESTIONS) {
            message.delete();

            message.channel.send({
                embeds: [
                    new MessageEmbed({
                        color: Constants["Defaults"].embed.color.default,
                        author: {
                            name: `Suggestion from ${message.author.username}`,
                            iconURL: message.author.displayAvatarURL({ dynamic: true })
                        },
                        description: `${message.author} has added a suggestion! React with :thumbsup: if you agree with this suggestion or :thumbsdown: if you disagree.\n\n> ${message.content}`,
                        timestamp: new Date()
                    })
                ]
            })
                .then(async (msg: Message): Promise<void> => {
                    await msg.react("👍");
                    await msg.react("👎");
                })
                .catch((): null => null);
        } else if (message.channelId === Constants["Channels"].REVIEWS) {
            message.delete();

            message.channel.send({
                embeds: [
                    new MessageEmbed({
                        color: Constants["Defaults"].embed.color.default,
                        author: {
                            name: `Review by ${message.author.username}`,
                            iconURL: message.author.displayAvatarURL({ dynamic: true })
                        },
                        description: `Thanks for leaving us a review for ${message.guild.name}, ${message.author}! We appreciate all feedback we receive.\n\n> ${message.content}`,
                        timestamp: new Date()
                    })
                ],
            })
                .then(async (msg: Message): Promise<void> => {
                    await msg.react(Constants["Emojis"].ASTURA);
                })
                .catch((): null => null);
        }
    }
}