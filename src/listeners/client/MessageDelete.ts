import { Client, Listener } from "../../lib/core/exports";
import { Constants } from "../../lib/base/constants";
import { Format } from "../../lib/util/exports";
import { GuildConfig } from "@prisma/client";
import { Message, MessageAttachment, MessageEmbed, TextChannel } from "discord.js";
import { Snipe } from "../../lib/base/interfaces";

export default class MessageDeleteListener extends Listener {
    public constructor() {
        super("messageDelete", {
            categoryID: "client",
            emitter: "client",
            once: false
        });
    }

    public async exec(client: Client, message: Message): Promise<void> {
        if (!message.guild) return;
        if (message.author.bot) return;
        if (message.guildId !== Constants["BaseGuild"]) return;
        if (message.embeds.length > 0) return;
        if (!client.snipes.get(message.channelId)) client.snipes.set(message.channelId, []);

        const guildConfig: GuildConfig = await client.db.guildConfig.findUnique({
            where: {
                guildID: message.guildId as string
            }
        }) as GuildConfig;

        const messageLogging: TextChannel | null = guildConfig.messageLogChannelID ? message.guild.channels.cache.get(guildConfig.messageLogChannelID) as TextChannel : null;
        const snipes: Snipe[] = client.snipes.get(message.channelId) as Snipe[];
        snipes.push({
            content: message.content,
            author: message.author,
            channel: message.channel,
            image: message.attachments && message.attachments.first() ? (message.attachments.first() as MessageAttachment).proxyURL : null,
            time: Format.timestamp(message.createdAt, "T")
        });

        client.snipes.set(message.channelId, snipes);

        setTimeout((): void => {
            delete (client.snipes.get(message.channelId) as Snipe[])[0];
        }, 300000);

        const embed: MessageEmbed = new MessageEmbed({
            color: Constants["Defaults"].embed.color.default,
            author: {
                name: `Recently deleted message by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            },
            description: `${message.author} recently deleted a message in ${message.channel} at ${Format.timestamp(new Date(), "T")}.\n\n> ${message.content}`
        });

        if (message.attachments.first()) embed.setImage((message.attachments.first() as MessageAttachment).proxyURL);

        if (message.mentions.members && message.mentions.members.first() && !message.mentions.repliedUser && message.mentions.roles && message.mentions.roles.first()) {
            if (!(message.channel as TextChannel).name.toLowerCase().includes("announcements")) {
                message.channel.send({
                    embeds: [
                        {
                            color: Constants["Defaults"].embed.color.default,
                            author: {
                                name: `Ghost ping detected from ${message.author.tag} (deleted message)`,
                                iconURL: message.author.displayAvatarURL({ dynamic: true })
                            },
                            description: `${message.author} recently ghost pinged in ${message.channel} at ${Format.timestamp(new Date(), "T")}.\n\n> ${message.content}`
                        }
                    ]
                });
            }

            messageLogging && messageLogging.send({
                embeds: [
                    {
                        color: Constants["Defaults"].embed.color.default,
                        author: {
                            name: `Ghost ping detected from ${message.author.tag} (deleted message)`,
                            iconURL: message.author.displayAvatarURL({ dynamic: true })
                        },
                        description: `${message.author} recently ghost pinged in ${message.channel} at ${Format.timestamp(new Date(), "T")}.\n\n> ${message.content}`
                    }
                ]
            });

            return;
        } if (message.mentions.members && message.mentions.members.first() && !message.mentions.repliedUser) {
            if (!(message.channel as TextChannel).name.toLowerCase().includes("announcements")) {
                message.channel.send({
                    embeds: [
                        {
                            color: Constants["Defaults"].embed.color.default,
                            author: {
                                name: `Ghost ping detected from ${message.author.tag} (deleted message)`,
                                iconURL: message.author.displayAvatarURL({ dynamic: true })
                            },
                            description: `${message.author} recently ghost pinged in ${message.channel} at ${Format.timestamp(new Date(), "T")}.\n\n> ${message.content}`
                        }
                    ]
                });
            }

            messageLogging && messageLogging.send({
                embeds: [
                    {
                        color: Constants["Defaults"].embed.color.default,
                        author: {
                            name: `Ghost ping detected from ${message.author.tag} (deleted message)`,
                            iconURL: message.author.displayAvatarURL({ dynamic: true })
                        },
                        description: `${message.author} recently ghost pinged in ${message.channel} at ${Format.timestamp(new Date(), "T")}.\n\n> ${message.content}`
                    }
                ]
            });
        } else if (message.mentions.roles && message.mentions.roles.first()) {
            if (!(message.channel as TextChannel).name.toLowerCase().includes("announcements")) {
                message.channel.send({
                    embeds: [
                        {
                            color: Constants["Defaults"].embed.color.default,
                            author: {
                                name: `Ghost ping detected from ${message.author.tag} (deleted message)`,
                                iconURL: message.author.displayAvatarURL({ dynamic: true })
                            },
                            description: `${message.author} recently ghost pinged in ${message.channel} at ${Format.timestamp(new Date(), "T")}.\n\n> ${message.content}`
                        }
                    ]
                });
            }

            messageLogging && messageLogging.send({
                embeds: [
                    {
                        color: Constants["Defaults"].embed.color.default,
                        author: {
                            name: `Ghost ping detected from ${message.author.tag} (deleted message)`,
                            iconURL: message.author.displayAvatarURL({ dynamic: true })
                        },
                        description: `${message.author} recently ghost pinged in ${message.channel} at ${Format.timestamp(new Date(), "T")}.\n\n> ${message.content}`
                    }
                ]
            });
        } else {
            messageLogging && messageLogging.send({
                embeds: [
                    embed
                ]
            });
        }
    }
}