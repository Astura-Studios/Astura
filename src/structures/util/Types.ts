export type ArgumentType =
    | "user"
    | "channel"
    | "boolean"
    | "integer"
    | "mentionable"
    | "number"
    | "role"
    | "string";
    
export type CategoryType = "command" | "listener";
export type CommandChannel = "guild" | "dm" | "all";
export type Emitter = "client" | "process" | "commandHandler" | "player";

export type ErrorEmbedType =
    | "INVALID_ARGS"
    | "MISSING_ARGS"
    | "USER_PERMISSIONS_MISSING"
    | "CLIENT_PERMISSIONS_MISSING"
    | "OWNER_ONLY";

export type ErrorKey =
    | "FILE_NOT_FOUND"
    | "MODULE_NOT_FOUND"
    | "ALREADY_LOADED"
    | "NOT_RELOADABLE"
    | "INVALID_CLASS_TO_HANDLE"
    | "ALIAS_CONFLICT"
    | "COMMAND_UTIL_EXPLICIT"
    | "UNKNOWN_MATCH_TYPE"
    | "NOT_INSTANTIABLE"
    | "NOT_IMPLEMENTED"
    | "INVALID_TYPE";

export type ErrorMessage =
    | string
    | ((filename: string) => string)
    | ((constructor: string, id: string) => string)
    | ((given: string, expected: string) => string)
    | ((alias: string, id: string, conflict: string) => string)
    | ((name: string, expected: string, vowel?: boolean) => string);

export type ListenerCategory = "client" | "process" | "commandHandler" | "player";

export type ListenerType =
    // discord.js Events
    | "applicationCommandCreate"
    | "applicationCommandDelete"
    | "applicationCommandUpdate"
    | "channelCreate"
    | "channelDelete"
    | "channelPinsUpdate"
    | "channelUpdate"
    | "debug"
    | "emojiCreate"
    | "emojiDelete"
    | "emojiUpdate"
    | "error"
    | "guildBanAdd"
    | "guildBanRemove"
    | "guildCreate"
    | "guildDelete"
    | "guildIntegrationsUpdate"
    | "guildMemberAdd"
    | "guildMemberAvailable"
    | "guildMemberRemove"
    | "guildMembersChunk"
    | "guildMemberUpdate"
    | "guildUnavailable"
    | "guildUpdate"
    | "interaction"
    | "interactionCreate"
    | "invalidated"
    | "invalidRequestWarning"
    | "inviteCreate"
    | "inviteDelete"
    | "message"
    | "messageCreate"
    | "messageDelete"
    | "messageDeleteBulk"
    | "messageReactionAdd"
    | "messageReactionRemove"
    | "messageReactionRemoveAll"
    | "messageReactionRemoveEmoji"
    | "messageUpdate"
    | "presenceUpdate"
    | "rateLimit"
    | "ready"
    | "roleCreate"
    | "roleDelete"
    | "roleUpdate"
    | "shardDisconnect"
    | "shardError"
    | "shardReady"
    | "shardReonnecting"
    | "shardResume"
    | "stageInstanceCreate"
    | "stageInstanceDelete"
    | "stageInstanceUpdate"
    | "stickerCreate"
    | "stickerDelete"
    | "stickerUpdate"
    | "threadCreate"
    | "threadDelete"
    | "threadListSync"
    | "threadMembersUpdate"
    | "threadMemberUpdate"
    | "typingStart"
    | "userUpdate"
    | "voiceStateUpdate"
    | "warn"
    | "webhookUpdate"

    // Process events
    | "uncaughtException"
    | "unhandledRejection"

    // Player events
    | "songPlaying"
    | "songPaused"
    | "songResume"
    | "songEnded"
    | "queueEnded"
    | "disconnect"
    | "songNotFound"

    // Command handler events
    | "cooldown"
    | "missingPermissions"

export type MarkdownLanguage =
    | "javascript"
    | "typescript"
    | "python"
    | "lua"
    | "html"
    | "css"
    | "cmd"
    | "svg"
    | "ruby"
    | "c"
    | "c++"
    | "c#"
    | "md"
    | "json"
    | "asciidoc"
    | "autohotkey"
    | "bash"
    | "shell"
    | "coffeescript"
    | "cpp"
    | "diff"
    | "ini"
    | "ml"
    | "prolog"
    | "tex"
    | "xl"
    | "xml";

export type MissingPermissions = "USER_PERMISSIONS_MISSING" | "CLIENT_PERMISSIONS_MISSING" | "CLIENT_SEND_PERMISSIONS_MISSING" | "OWNER_ONLY";
export type Suffix = "th" | "st" | "nd" | "rd";