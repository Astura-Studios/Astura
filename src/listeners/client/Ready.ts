import { AsturaClient } from "../../client/Client";
import { ClientUser, Presence, version } from "discord.js";
import { Listener } from "../../structures/Listener";
import { Statuses } from "../../structures/util/Interfaces";

export default class ReadyListener extends Listener {
    public constructor() {
        super("ready", {
            category: "client",
            emitter: "client",
            name: "ready"
        });
    };

    public async exec(client: AsturaClient): Promise<void> {
        try {
            const statuses: Statuses = {
                "online": "Online",
                "idle": "Idle",
                "dnd": "Do Not Disturb",
                "offline": "Offline",
                "invisible": "Offline"
            };

            console.log(`${client.util.date.getLocalTime()} | [ discord.js ] discord.js Version: ${version}`);

            const setActivity: Promise<Presence> = new Promise((resolve, reject) => {
                resolve(
                    (client.user as ClientUser).setPresence({
                        activities: [
                            {
                                name: `${client.users.cache.size} users | /help`,
                                type: "WATCHING"
                            }
                        ],
                        status: "online"
                    })
                );
            });

            setActivity
                .then((presence: Presence) => {
                    return console.log(`${client.util.date.getLocalTime()} | [ Astura Client ] ${(client.user as ClientUser).tag} is ready and online | Status: ${statuses[presence.status]} | Websocket Ping: ${client.ws.ping.toFixed(2)}ms`);
                })
                .catch((error: Error) => {
                    return console.log(`${client.util.date.getLocalTime()} | [ Ready Listener ] ${(error as Error).stack}`);
                });
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ Ready Listener ] ${(error as Error).stack}`);
        };
    };
};