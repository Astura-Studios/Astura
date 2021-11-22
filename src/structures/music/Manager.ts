import { AsturaClient } from "../../client/Client";
import { Manager as LavalinkManager } from "@lavacord/discord.js";

export class Manager extends LavalinkManager {
    public constructor(client: AsturaClient) {
        super(client, client.nodes);
    };
};