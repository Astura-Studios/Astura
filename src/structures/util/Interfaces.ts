import { AnyEntity, Connection, Configuration, EntitySchema, IDatabaseDriver, MetadataProvider } from "@mikro-orm/core";
import { Argument } from "../Argument";
import { AsturaClient } from "../../client/Client";
import { CategoryType, CommandChannel, Emitter, ErrorEmbedType } from "./Types";
import { ClientOptions, ColorResolvable, Message, PermissionString } from "discord.js";
import { Collection } from "discord.js";
import { Command } from "../Command";
import { EntityClass, EntityClassGroup } from "@mikro-orm/core/typings";
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

export interface CommandExceptions {
    ignoreCooldown: string[];
    ignorePermissions: string[];
};

export interface CommandOptions {
    aliases?: string[];
    arguments?: Argument[];
    category: string;
    channel: CommandChannel;
    cooldown: number;
    description: string;
    enabledByDefault: boolean;
    examples: string[];
    exceptions: CommandExceptions;
    isSubCommand: boolean;
    permissions: CommandPermissions;
    ownerOnly: boolean;
    subCommands?: Command[];
    usage: string;
}

export interface CommandPermissions {
    clientPermissions: PermissionString[];
    userPermissions: PermissionString[];
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
    entities?: (string | EntityClass<AnyEntity<any>> | EntityClassGroup<AnyEntity<any>> | EntitySchema<any, undefined>)[] | undefined;
    entitiesTs?: (string | EntityClass<AnyEntity<any>> | EntityClassGroup<AnyEntity<any>> | EntitySchema<any, undefined>)[] | undefined;
    metadataProvider?: (new (config: Configuration<IDatabaseDriver<Connection>>) => MetadataProvider) | undefined;
    type?: "mongo" | "mysql" | "mariadb" | "postgresql" | "sqlite" | undefined;
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