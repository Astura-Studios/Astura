import { APIMessage } from "discord-api-types/v9";
import { AsturaClient } from "../../client/Client";
import { Command } from "../../structures/Command";
import { ClientUser, CommandInteraction, Message } from "discord.js";
import { configOptions } from "../../client/Config";

export default class PingCommand extends Command {
    public constructor() {
        super("ping", {
            category: "Utility",
            channel: "all",
            cooldown: 5,
            description: "Get the latency of the ping to the Discord API, RTT and ORM connection speed.",
            enabledByDefault: true,
            examples: [
                "/ping"
            ],
            exceptions: {
                ignoreCooldown: configOptions.owners,
                ignorePermissions: configOptions.owners
            },
            isSubCommand: false,
            permissions: {
                clientPermissions: [
                    "SEND_MESSAGES", 
                    "EMBED_LINKS",
                    "USE_EXTERNAL_EMOJIS", 
                    "MANAGE_MESSAGES"
                ],
                userPermissions: [
                    "SEND_MESSAGES"
                ]
            },
            ownerOnly: true,
            usage: "/ping"
        });
    };

    public async exec(client: AsturaClient, interaction: CommandInteraction): Promise<void> {
        try {
            await interaction.reply({
                embeds: [
                    client.util.embed({
                        color: client.util.defaults.embed.color,
                        description: "<a:discord_loading:796184140378144808> **Pinging...**"
                    })
                ],
                fetchReply: true
            })
            .then((loadingEmbed: Message<true> | APIMessage | Message<boolean>) => {
                setTimeout(async (): Promise<Message<true> | APIMessage | Message<boolean>> => {
                    const start: [number, number] = process.hrtime();
                    client.db;
                    const difference: [number, number] = process.hrtime(start);
    
                    return interaction.editReply({
                        embeds: [
                            client.util.embed({
                                color: client.util.defaults.embed.color,
                                author: {
                                    name: `${(client.user as ClientUser).username} - RTT, Websocket Ping and ORM Connection Speed`,
                                    iconURL: (client.user as ClientUser).displayAvatarURL({ dynamic: true }),
                                },
                                thumbnail: {    
                                    url: (client.user as ClientUser).displayAvatarURL({ dynamic: true })
                                },
                                description: `:ping_pong: ${client.markdown.bold(`Pong! ${client.markdown.userMention(interaction.user.id)}, response was received in \`${Math.floor((loadingEmbed as Message).createdTimestamp - interaction.createdTimestamp).toFixed(2)}ms\``)}`,
                                fields: [
                                    { name: `<a:loading_green_bar:796179271239467018> ${client.markdown.bold("Real-time Text")}`, value: client.markdown.languageCodeBlock(`> ${Math.floor((loadingEmbed as Message).createdTimestamp - interaction.createdTimestamp).toFixed(2)}ms`, "md"), inline: true },
                                    { name: `<:status_bar:761134398602477568> ${client.markdown.bold("Websocket Ping")}`, value: client.markdown.languageCodeBlock(`> ${client.ws.ping.toFixed(2)}ms`, "md"), inline: true },
                                    { name: `<:server:761134398619648000> ${client.markdown.bold("ORM Connection")}`, value: client.markdown.languageCodeBlock(`> ${Math.round(difference[1] / 1e3).toFixed(2)}ms`, "md"), inline: true }
                                ]
                            })
                        ]
                    });
                }, 2000);
            })
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ Ping Command ] ${(error as Error).stack}`);
        };
    };
};