import { Client, Listener } from "../../lib/core/exports";
import { Constants } from "../../lib/base/constants";
import { EditSnipe } from "../../lib/base/interfaces";
import { Format } from "../../lib/util/exports";
import { GuildConfig } from "@prisma/client";
import { Message, MessageAttachment, MessageEmbed, TextChannel } from "discord.js";

export default class MessageEditListener extends Listener {
    public constructor() {
        super("messageUpdate", {
            categoryID: "client",
            emitter: "client",
            once: false
        });
    }

    public async exec(client: Client, oldMessage: Message, newMessage: Message): Promise<void> {
        if (!oldMessage.guild || !newMessage.guild) return;
        if (oldMessage.guild.id !== Constants["BaseGuild"]) return;
        if (newMessage.guild.id !== Constants["BaseGuild"]) return;

        if (!newMessage.editedAt) return;
        if (!oldMessage.guild || !newMessage.guild) return;
        if (oldMessage.author.bot || newMessage.author.bot) return;
        if (oldMessage.guildId !== Constants["BaseGuild"] || newMessage.guildId !== Constants["BaseGuild"]) return;
        if (oldMessage.embeds.length > 0 || newMessage.embeds.length > 0) return;
        if (!client.editSnipes.get(oldMessage.channelId)) client.editSnipes.set(oldMessage.channelId, []);

        const guildConfig: GuildConfig = await client.db.guildConfig.findUnique({
            where: {
                guildID: newMessage.guildId
            }
        }) as GuildConfig;

        const messageLogging: TextChannel | null = guildConfig.messageLogChannelID ? oldMessage.guild.channels.cache.get(guildConfig.messageLogChannelID) as TextChannel || newMessage.guild.channels.cache.get(guildConfig.messageLogChannelID) as TextChannel : null;
        const editSnipes: EditSnipe[] = client.editSnipes.get(oldMessage.channel.id) as EditSnipe[];

        editSnipes.push({
            content: {
                before: oldMessage.content,
                after: newMessage.content,
            },
            author: newMessage.author,
            channel: newMessage.channel,
            image: {
                before: oldMessage.attachments.first() ? (oldMessage.attachments.first() as MessageAttachment).proxyURL : null,
                after: newMessage.attachments.first() ? (newMessage.attachments.first() as MessageAttachment).proxyURL : null,
            },
            time: {
                before: Format.timestamp(oldMessage.createdAt, "T"),
                after: Format.timestamp(newMessage.editedAt, "T")
            },
            url: newMessage.url ? newMessage.url : null
        });

        client.editSnipes.set(oldMessage.channelId, editSnipes);

        setTimeout((): void => {
            delete (client.editSnipes.get(oldMessage.channelId) as EditSnipe[])[0];
        }, 300000);

        const embed: MessageEmbed = new MessageEmbed({
            color: Constants["Defaults"].embed.color.default,
            author: {
                name: `Recently edited message by ${oldMessage.author.tag}`,
                iconURL: oldMessage.author.displayAvatarURL({ dynamic: true })
            },
            description: `${oldMessage.author} recently edited a message in ${oldMessage.channel} at ${Format.timestamp(newMessage.editedAt, "T")}.\n\n**Before:** ${oldMessage.content}\n**After:** ${newMessage.content}\n\n${newMessage.url ? Format.hyperlink("Jump to message", newMessage.url) : null}`,
        });

        if (oldMessage.attachments.first()) embed.setImage((oldMessage.attachments.first() as MessageAttachment).proxyURL);
        if (newMessage.attachments.first()) embed.setImage((newMessage.attachments.first() as MessageAttachment).proxyURL);

        messageLogging && messageLogging.send({
            embeds: [
                embed
            ]
        });

        if (oldMessage.mentions.members && oldMessage.mentions.members.first() && !newMessage.mentions.members && !oldMessage.mentions.repliedUser && !newMessage.mentions.repliedUser && oldMessage.mentions.roles && oldMessage.mentions.roles.first()) {
            oldMessage.reply({
                embeds: [
                    {
                        color: Constants["Defaults"].embed.color.default,
                        author: {
                            name: `Ghost ping detected from ${oldMessage.author.tag} (edited message)`,
                            iconURL: oldMessage.author.displayAvatarURL({ dynamic: true })
                        },
                        description: `${oldMessage.author} recently ghost pinged in ${oldMessage.channel} at ${Format.timestamp(new Date(), "T")}.\n\n> ${oldMessage.content}`
                    }
                ]
            });

            messageLogging && messageLogging.send({
                embeds: [
                    {
                        color: Constants["Defaults"].embed.color.default,
                        author: {
                            name: `Ghost ping detected from ${oldMessage.author.tag} (edited message)`,
                            iconURL: oldMessage.author.displayAvatarURL({ dynamic: true })
                        },
                        description: `${oldMessage.author} recently ghost pinged in ${oldMessage.channel} at ${Format.timestamp(new Date(), "T")}.\n\n> ${oldMessage.content}\n\n${newMessage.url ? Format.hyperlink("Jump to message", newMessage.url) : null}`
                    }
                ]
            });

            return;
        } else if (oldMessage.mentions.members && oldMessage.mentions.members.first() && !newMessage.mentions.members && !oldMessage.mentions.repliedUser && !newMessage.mentions.repliedUser) {
            oldMessage.reply({
                embeds: [
                    {
                        color: Constants["Defaults"].embed.color.default,
                        author: {
                            name: `Ghost ping detected from ${oldMessage.author.tag} (edited message)`,
                            iconURL: oldMessage.author.displayAvatarURL({ dynamic: true })
                        },
                        description: `${oldMessage.author} recently ghost pinged in ${oldMessage.channel} at ${Format.timestamp(new Date(), "T")}.\n\n> ${oldMessage.content}`
                    }
                ]
            });

            messageLogging && messageLogging.send({
                embeds: [
                    {
                        color: Constants["Defaults"].embed.color.default,
                        author: {
                            name: `Ghost ping detected from ${oldMessage.author.tag} (edited message)`,
                            iconURL: oldMessage.author.displayAvatarURL({ dynamic: true })
                        },
                        description: `${oldMessage.author} recently ghost pinged in ${oldMessage.channel} at ${Format.timestamp(new Date(), "T")}.\n\n> ${oldMessage.content}\n\n${newMessage.url ? Format.hyperlink("Jump to message", newMessage.url) : null}`
                    }
                ]
            });
        } else if (oldMessage.mentions.roles && oldMessage.mentions.roles.first() && !newMessage.mentions.roles) {
            oldMessage.reply({
                embeds: [
                    {
                        color: Constants["Defaults"].embed.color.default,
                        author: {
                            name: `Ghost ping detected from ${oldMessage.author.tag} (edited message)`,
                            iconURL: oldMessage.author.displayAvatarURL({ dynamic: true })
                        },
                        description: `${oldMessage.author} recently ghost pinged in ${oldMessage.channel} at ${Format.timestamp(new Date(), "T")}.\n\n> ${oldMessage.content}`
                    }
                ]
            });

            messageLogging && messageLogging.send({
                embeds: [
                    {
                        color: Constants["Defaults"].embed.color.default,
                        author: {
                            name: `Ghost ping detected from ${oldMessage.author.tag} (edited message)`,
                            iconURL: oldMessage.author.displayAvatarURL({ dynamic: true })
                        },
                        description: `${oldMessage.author} recently ghost pinged in ${oldMessage.channel} at ${Format.timestamp(new Date(), "T")}.\n\n> ${oldMessage.content}\n\n${newMessage.url ? Format.hyperlink("Jump to message", newMessage.url) : null}`
                    }
                ]
            });
        }
    }
}