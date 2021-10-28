import { AsturaClient } from "../../client/Client";
import { ClientOptions, ColorResolvable, Message } from "discord.js";
import { Command } from "../Command";
import { ErrorEmbedType } from "./Types";

export interface ConfigurationOptions {
    clientOptions: ClientOptions;
    clientSecret: string;
    databaseName: string;
    owners: string[];
    token: string;
}

export interface DatabaseOptions {
    dbName: string;
}

export interface ErrorEmbedOptions {
    type: ErrorEmbedType;
    client: AsturaClient;
    command?: Command | undefined;
    message: Message;
    errorMessage: string;
}

export interface UtilityDefaults {
    embed: UtilityEmbedDefaults;
}

export interface UtilityEmbedDefaults {
    color: ColorResolvable;
}