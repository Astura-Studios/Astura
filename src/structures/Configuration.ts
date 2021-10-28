import { ClientOptions } from "discord.js";
import { ConfigurationOptions } from "./util/Interfaces";

export class Configuration {
    public clientOptions: ClientOptions;
    public clientSecret: string;
    public databaseName: string;
    public owners: string[];
    public token: string;

    public constructor(options: ConfigurationOptions) {
        this.clientOptions = options.clientOptions;
        this.clientSecret = options.clientSecret;
        this.databaseName = options.databaseName;
        this.owners = options.owners;
        this.token = options.token;
    };
};