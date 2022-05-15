import { Client, Listener } from "../../lib/core/exports";
import { Webhook, WebhookClient } from "discord.js";
import { Constants } from "../../lib/base/constants";
import { ExecException, exec } from "child_process";
import { Format } from "../../lib/util/exports";

import os from "os";

export default class ReadyListener extends Listener {
    public constructor() {
        super("ready", {
            categoryID: "client",
            emitter: "client",
            once: true
        });
    }

    public async exec(client: Client): Promise<void> {
        if (client.user) {
            client.user.setPresence({
                status: "online",
                activities: [
                    {
                        name: `${(await client.guilds.fetch(Constants["BaseGuild"])).memberCount} members | /help`,
                        type: "WATCHING"
                    }
                ]
            });

            const webhook: WebhookClient = new WebhookClient({ url: Constants["Webhooks"].BOT_LOGS });
            let branch: string;

            exec("git rev-parse --abbrev-ref HEAD", (err: ExecException | null, stdout: string): void => {
                if (err) {
                    return;
                }

                if (typeof stdout === "string") {
                    branch = stdout.trim();
                }
            });

            webhook.edit({
                avatar: client.user.displayAvatarURL({ dynamic: true })
            }).then((webhook: Webhook): void => {
                if (client.user) {
                    webhook.send({
                        embeds: [
                            {
                                color: Constants["Defaults"].embed.color.default,
                                author: {
                                    name: `${client.user.username} v${client.config.version} startup process initiated at ${new Date().toLocaleTimeString()}`,
                                    iconURL: client.user.displayAvatarURL({ dynamic: true }),
                                },
                                thumbnail: {
                                    url: client.user.displayAvatarURL({ dynamic: true })
                                },
                                fields: [
                                    {
                                        name: "System Information",
                                        value: [
                                            `**Username:** ${os.userInfo().username}`,
                                            `**System:** ${os.platform()} ${os.arch()} (${os.release()})`,
                                            `**CPU Usage:** ${Math.floor((process.cpuUsage().user / process.cpuUsage().system) * 100)}%`,
                                            `**Memory Usage:** ${(Math.round(((os.totalmem() / 1e9 - os.freemem() / 1e9) + Number.EPSILON) * 100) / 100).toFixed(2)}/${(Math.round((os.totalmem() / 1e9 + Number.EPSILON) * 100) / 100).toFixed(2)} GB (${Math.floor((process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100)}%)`
                                        ].join("\n"),
                                        inline: true
                                    },
                                    {
                                        name: "Instance Details",
                                        value: [
                                            `**Version:**  ${Format.hyperlink(`v${client.config.version} (${client.config.release} release)`, `${Constants["URLs"].REPOSITORY}/releases/tag/v${client.config.version}`)}`,
                                            `**Instance:** ${process.env.NODE_ENV}`,
                                            `**Repository Branch:** ${Format.hyperlink(branch, `${Constants["URLs"].REPOSITORY}/tree/${branch}`)}`,
                                            `**Node Version:** ${process.version}`
                                        ].join("\n"),
                                        inline: true
                                    }
                                ]
                            }
                        ]
                    });
                }
            })
                .catch((error: Error) => client.console.error(error.stack, "astura.client", false));

            const status: string = client.user.presence.status
                .replace("online", "Online")
                .replace("idle", "Idle")
                .replace("dnd", "Do Not Disturb")
                .replace("offline", "Offline");

            return client.console.ready(`${client.user.username} client successfully initiated | Status: ${status} | Release: v${client.config.version} (${client.config.release})`, "astura.client");
        }
    }
}