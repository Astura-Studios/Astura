import { Client } from "discord.js";
import Configuration from "../structures/Configuration";
import Utilities from "../structures/Utilities";
import { configOptions } from "./Config";

declare module "discord.js" {
    interface Client {
        config: Configuration;
        util: Utilities;
    }
}

export default class AsturaClient extends Client {
    public config: Configuration;
    public util: Utilities;

    public constructor() {
        super(configOptions.clientOptions);

        this.config = new Configuration(configOptions);
        this.util = new Utilities(this);
    }

    private async init() {

    }

    public async start(): Promise<string> {
        await this.init();
        return this.login(this.config.token);
    }
}