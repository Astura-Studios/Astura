import { AsturaClient } from "../../client/Client";
import { Manager as LavalinkManager } from "@lavacord/discord.js";
import { nodes } from "./Nodes";

export class Manager extends LavalinkManager {
    public constructor(client: AsturaClient) {
        super(client, nodes, {
            user: client.config.clientID
        });
    };
};