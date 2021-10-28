import { AsturaClient } from "../../client/Client";
import { ClientUser, PresenceStatus, version } from "discord.js";
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

            (client.user as ClientUser).setPresence({
                activities: [
                    {
                        name: `${client.users.cache.size}} users | a.help`,
                        type: "WATCHING"
                    }
                ],
                status: "online"
            });

            return console.log(`${client.util.date.getTime()} | [ Astura Client ] ${(client.user as ClientUser).tag} is ready and online | Status: ${statuses[(client.user as ClientUser).presence.status as PresenceStatus]} | Websocket Ping: ${client.ws.ping.toFixed(2)}ms`);
        } catch (error) {
            return console.log(`${client.util.date.getLocalTime()} | [ Ready Listener ] ${(error as Error).stack}`);
        };
    };
};