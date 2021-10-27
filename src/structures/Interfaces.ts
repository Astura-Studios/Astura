import AsturaClient from "../client/Client";
import { ClientOptions, ColorResolvable, Message } from "discord.js";
import { ErrorEmbedType } from "./Types";

export interface ConfigurationOptions {
    clientOptions: ClientOptions;
    clientSecret: string;
    databaseName: string;
    owners: string[];
    token: string;
}

export interface ErrorEmbedOptions {
    type: ErrorEmbedType;
    client: AsturaClient;
    command?: Command;
    message: Message;
    errorMessage: string;
}

export interface UtilityDefaults {
    embed: UtilityEmbedDefaults;
}

export interface UtilityEmbedDefaults {
    color: ColorResolvable;
}