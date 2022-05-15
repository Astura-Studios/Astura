import { ArgumentType, CommandChannel, InhibitorCategory, ListenerCategory, ListenerEmitter } from "./types";
import { Argument, Choice, Client, Inhibitor, Listener, SlashCommand, SlashSubCommand } from "../core/exports";
import { Collection, CommandInteraction, GuildChannel, GuildMember, PermissionString, Snowflake, TextBasedChannel, TextChannel, User } from "discord.js";

export interface ArgumentOptions {
    name: string;
    description: string;
    choices?: Choice[];
    required: boolean;
    type: ArgumentType;
}

export interface CategoryOptions {
    commands?: Collection<string, SlashCommand>;
    enabled?: boolean | undefined;
    description?: string | undefined;
    inhibitors?: Collection<string, Inhibitor>;
    listeners?: Collection<string, Listener>;
    ownerOnly?: boolean;
}

export interface ConfigOptions {
    /**
     * The command handler configuration options for the client's command handler.
     * @ignore
     * @type {InhibitorOptions}
     */
    commandHandler: CommandHandlerOptions;

    /**
     * The inhibitor handler configuration options for the client's inhibitor handler.
     * @ignore
     * @type {DatabaseOptions}
     */
    inhibitorHandler: InhibitorHandlerOptions;

    /**
     * The listener handler configuration options for the client's listener handler.
     * @ignore
     * @type {ListenerOptions}
     */
    listenerHandler: ListenerHandlerOptions;

    /**
     * The options for setting the correct Discord API route url for posting application commands.
     * @ignore
     * @type {RouteOptions}
     */
    routeOptions: RouteOptions;

    /**
     * An array of IDs of Discord users to grant owner access to.
     * @default ["760995822120468511", "752114457202917436", "599324888716804108"]
     * @ignore
     * @type {Snowflake[]}
     */
    owners: Snowflake[];

    /**
     * The current release stage for Astura.
     * @default "delta"
     * @ignore
     * @type {string}
     */
    release: string;

    /**
     * The token for Astura.
     * @type {string} 
     */
    token: string;

    /**
     * The current version of Astura.
     * @default version
     * @ignore
     * @type {string}
     */
    version: string;
}

export interface CommandHandlerOptions {
    /**
     * The Discord API version to use.
     * @default "9"
     * @ignore
     * @type {string}
     */
    apiVersion: string;

    /**
     * Determines whether to prevent bots from running commands or triggering the bot.
     * @default true
     * @ignore
     * @type {boolean}
     */
    blockBots?: boolean;
    
    /**
     * The path for the directory containing all the command files to be loaded.
     * @ignore
     * @type {string}
     */
    directory: string;

    /**
     * The warning messages to be displayed when a command is blocked for certain reasons.
     * @ignore
     * @type {CommandHandlerWarnings}
     */
    warnings?: CommandHandlerWarnings;
};

export interface CommandHandlerWarnings {
    /**
     * The message to be displayed when a command is blocked for bot ownership.
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @type {(interaction: CommandInteraction) => string}
     */
    ownerOnly?(client: Client, interaction: CommandInteraction): string;

    /**
     * The message to be displayed when the bot is missing the required permissions to run the command.
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {string} permissions 
     * @param {SlashCommand} command 
     * @type {(client: Client, interaction: CommandInteraction, permissions: string, command: SlashCommand) => string}
     */
    clientMissingPermissions?(client: Client, interaction: CommandInteraction, permissions: string, command: SlashCommand): string;

    /**
     * The message to be displayed when the bot is missing the `Send Messages` permission in the guild.
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @type {(client: Client, interaction: CommandInteraction) => string}
     */
    missingSendPermissions?(client: Client, interaction: CommandInteraction): string

    /**
     * The message to be displayed when a user is missing the required permissions to run the command.
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {string} permissions 
     * @param {SlashCommand} command 
     * @type {(client: Client, interaction: CommandInteraction, permissions: string, command: SlashCommand) => string}
     */
    userMissingPermissions?(client: Client, interaction: CommandInteraction, permissions: string, command: SlashCommand): string;

    /**
     * The message to be displayed when a user exceeds a commands cooldown limit.
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {string} remaining 
     * @param {SlashCommand} command 
     * @type {(client: Client, interaction: CommandInteraction, remaining: string, command: SlashCommand) => string}
     */
    cooldownWarning?(client: Client, interaction: CommandInteraction, remaining: string, command: SlashCommand): string;
};

export interface CommandExceptions {
    ignoreCooldown?: string[] | [];
    ignorePermissions?: string[] | [];
}

export interface CommandPermissions {
    clientPermissions?: PermissionString[] | [];
    userPermissions?: PermissionString[] | [];
}

export interface Defaults {
    embed: EmbedDefault;
}

export interface EditSnipe {
    content: EditSnipeContent;
    author: User;
    channel: TextBasedChannel;
    image: EditSnipeImage;
    time: EditSnipeTime;
    url: string | null;
}

export interface EditSnipeContent {
    before: string;
    after: string;
}

export interface EditSnipeImage {
    before: string | null;
    after: string | null;
}

export interface EditSnipeTime {
    before: string;
    after: string;
}

export interface EmbedColors {
    default: number;
}

export interface EmbedDefault {
    color: EmbedColors;
}

export interface ErrorCodes {
    0: "success";
    1: "uncaught fatal exception";
    2: "bash error";
    3: "internal JavaScript parse error";
    4: "internal javascript evaluation failure";
    5: "fatal error";
    6: "non-function internal exception handler";
    7: "internal exception handler run-time failure";
    8: "uncaught exception (deprecated)";
    9: "invalid argument";
    10: "internal JavaScript run-time failure";
    12: "invalid debug argument";
}

export interface FetchedUser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    bot: boolean;
    banner: null | string;
    banner_color: null | string;
    accent_color: null | number;
}

export interface InhibitorHandlerOptions {
    /**
     * The path for the directory containing all the listener files to be loaded.
     * @ignore
     * @type {string}
     */
    directory: string;  
}

export interface InhibitorOptions {
    categoryID: InhibitorCategory;
    reason: string;
    priority: number;
}

export interface ListenerHandlerOptions {
    /**
     * The path for the directory containing all the listener files to be loaded.
     * @ignore
     * @type {string}
     */
    directory: string;  
}

export interface ListenerOptions {
    categoryID: ListenerCategory;
    emitter: ListenerEmitter;
    once: boolean;
}

export interface AsturaErrorOptions {
    emitter: string;
    kill: boolean;
}

export interface MemberEventChannels {
    ALL_MEMBERS: GuildChannel;
    MEMBERS: GuildChannel;
    BOTS: GuildChannel;
    LOBBY: TextChannel;
    MEMBER_EVENTS: TextChannel;
}

export interface MessageEmbedFieldOptions {
    name: string;
    value: string;
    inline?: boolean;
}

export interface MessageSelectMenuOptions {
    label: string;
    description: string;
    value: string;
}

export interface RouteOptions {
    /**
     * The ID of the application client user.
     * @ignore
     * @type {string}
     */
    clientID: string;

    /**
     * The ID of the guild to register the guild slash commands to.
     * @ignore 
     * @type {string}
     */
    guildID: string;
}

export interface SlashCommandOptions {
    aliases: string[] | [];
    arguments: Argument[] | [];
    categoryID: string;
    channel: CommandChannel;
    cooldown: number;
    defaultPermission: boolean;
    description: string;
    examples: string[] | [];
    permissions: CommandPermissions;
    ownerOnly: boolean;
    subCommands?: SlashSubCommand[];
    usage: string;
}

export interface SlashSubCommandOptions {
    arguments?: Argument[];
    description: string;
    name: string;
}

export interface Snipe {
    content: string;
    author: User;
    channel: TextBasedChannel;
    image: string | null;
    time: string;
}

export interface Table {
    options: TableOptions;
    rows: TableRow[];
}

export interface TableOptions {
    padLeft?: number;
    columns: TableColumn[];
}

export interface TableColumn {
    field: string;
    name: string;
}

export interface TableRow {
    id: number;
    key: string;
    value?: string;
}

export interface WarnCase { 
    index: number; 
    caseID: string; 
    user: GuildMember;
    moderator: GuildMember;
    reason: string | null; 
    time: Date; 
}