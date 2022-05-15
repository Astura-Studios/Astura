import { APIMessage } from "discord-api-types";
import { ClientUser, CommandInteraction, Message } from "discord.js";
import { Client, SlashCommand } from "../../lib/core/exports";
import { Constants } from "../../lib/base/constants";
import { Format, Util } from "../../lib/util/exports";

export default class PingCommand extends SlashCommand {
    public constructor() {
        super("ping", {
            aliases: [],
            arguments: [],
            categoryID: "Miscallenous",
            channel: "guild",
            cooldown: 5,
            defaultPermission: true,
            description: "Get the latency of the ping to the Discord API, RTT and ORM connection speed.",
            examples: [
                "/ping"
            ],
            ownerOnly: false,
            permissions: {
                clientPermissions: ["SEND_MESSAGES", "MANAGE_MESSAGES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
                userPermissions: []
            },
            usage: "/ping"
        });
    }

    public async exec(client: Client, interaction: CommandInteraction, Discord: typeof import("discord.js")): Promise<void> {
        const start: [number, number] = process.hrtime();
        client.db;
        const difference: [number, number] = process.hrtime(start);

        await interaction.reply({
            embeds: [
                new Discord.MessageEmbed({
                    color: Constants["Defaults"].embed.color.default,
                    description: `${Constants["Emojis"].LOADING} **Pinging...**`
                })
            ],
            fetchReply: true
        })
        .then(async (loadingEmbed: Message<true> | APIMessage | Message<boolean>): Promise<Message<true> | APIMessage | Message<boolean>> => {
            await Util.wait(1000);

            return interaction.editReply({
                embeds: [
                    new Discord.MessageEmbed({
                        color: Constants["Defaults"].embed.color.default,
                        author: {
                            name: `${(client.user as ClientUser).username} - RTT, Websocket Ping and ORM Connection`,
                            iconURL: (client.user as ClientUser).displayAvatarURL({ dynamic: true }),
                        },
                        thumbnail: {    
                            url: (client.user as ClientUser).displayAvatarURL({ dynamic: true })
                        },
                        description: `:ping_pong: ${Format.bold(`Pong! You received the response from ${(client.user as ClientUser).username} in \`${Math.floor((loadingEmbed as Message).createdTimestamp - interaction.createdTimestamp).toFixed(2)}ms\``)}`,
                        fields: [
                            { name: `${Constants["Emojis"].LOADING_GREEN_BAR} ${Format.bold("Real-time Text")}`, value: Format.languageCodeBlock(`> ${Math.floor((loadingEmbed as Message).createdTimestamp - interaction.createdTimestamp).toFixed(2)}ms`, "md"), inline: true },
                            { name: `${Constants["Emojis"].STATUS_BAR} ${Format.bold("Websocket Ping")}`, value: Format.languageCodeBlock(`> ${client.ws.ping.toFixed(2)}ms`, "md"), inline: true },
                            { name: `${Constants["Emojis"].SERVER} ${Format.bold("ORM Connection")}`, value: Format.languageCodeBlock(`> ${Math.round(difference[1] / 1e3).toFixed(2)}ms`, "md"), inline: true }
                        ]
                    })
                ]
            });
        });
    }
}