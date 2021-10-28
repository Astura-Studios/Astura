import { AsturaClient } from "../../client/Client";
import { ClientOptions, ColorResolvable, Message } from "discord.js";
import { Collection } from "discord.js";
import { Command } from "../Command";
import { CategoryType, Emitter, ErrorEmbedType } from "./Types";
import { Listener } from "../Listener";

export interface CategoryDescriptions {
    listeners: CategoryListenerDescriptions;
};

export interface CategoryListenerDescriptions {
    "client": string;
    "process": string;
};

export interface CategoryOptions {
    content: Collection<string, Command> | Collection<string, Listener> | null;
    description: string;
    type: CategoryType;
};

export interface ConfigurationOptions {
    clientOptions: ClientOptions;
    clientSecret: string;
    databaseName: string;
    owners: string[];
    token: string;
};

export interface DatabaseOptions {
    dbName: string;
};

export interface ErrorEmbedOptions {
    type: ErrorEmbedType;
    client: AsturaClient;
    command?: Command | undefined;
    message: Message;
    errorMessage: string;
};

export interface ListenerOptions {
    category: string;
    emitter: Emitter;
    name: string;
};

export interface ListenerHandlerOptions {
    directory: string;
};

export interface Statuses {
    "online": string;
    "idle": string;
    "dnd": string;
    "offline": string;
    "invisible": string;
};

export interface UtilityDefaults {
    embed: UtilityEmbedDefaults;
};

export interface UtilityEmbedDefaults {
    color: ColorResolvable;
};