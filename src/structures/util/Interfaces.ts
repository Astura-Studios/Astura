import { AnyEntity, Connection, Configuration, EntitySchema, IDatabaseDriver, MetadataProvider } from "@mikro-orm/core";
import { Argument } from "../Argument";
import { ArgumentType, CategoryType, CommandChannel, Emitter, ErrorEmbedType } from "./Types";
import { AsturaClient } from "../../client/Client";
import { ClientOptions, Collection, ColorResolvable, CommandInteraction, PermissionString } from "discord.js";
import { Command } from "../Command";
import { EntityClass, EntityClassGroup } from "@mikro-orm/core/typings";
import { Listener } from "../Listener";

export interface ArgumentOptions {
    name: string;
    description: string;
    required: boolean;
    type: ArgumentType;
};

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

export interface CommandHandlerOptions {
    allowDirectMessages: boolean;
    blockBots: boolean;
    directory: string;
    warnings: CommandHandlerWarnings;
};

export interface CommandHandlerWarnings {
    dmOnly(interaction: CommandInteraction): string;
    guildOnly(interaction: CommandInteraction): string;
    ownerOnly(interaction: CommandInteraction): string;

    clientMissingPermissions(client: AsturaClient, interaction: CommandInteraction, permissions: string, command: Command): string;
    missingSendPermissions(interaction: CommandInteraction): string
    userMissingPermissions(client: AsturaClient, interaction: CommandInteraction, permissions: string, command: Command): string;

    cooldownWarning(interaction: CommandInteraction, remaining: string, command: Command): string;
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
    clientID: string;
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
    interaction: CommandInteraction;
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