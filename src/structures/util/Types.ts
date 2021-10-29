export type ArgumentType = "user" | "channel" | "boolean" | "integer" | "mentionable" | "number" | "role" | "string";
export type CategoryType = "command" | "listener";
export type CommandChannel = "guild" | "dm" | "all";
export type Emitter = "client" | "process";
export type ErrorEmbedType = "INVALID_ARGS" | "MISSING_ARGS" | "USER_PERMISSIONS_MISSING" | "CLIENT_PERMISSIONS_MISSING" | "OWNER_ONLY";
export type ErrorKey = "FILE_NOT_FOUND" | "MODULE_NOT_FOUND" | "ALREADY_LOADED" | "NOT_RELOADABLE" | "INVALID_CLASS_TO_HANDLE" | "ALIAS_CONFLICT" | "COMMAND_UTIL_EXPLICIT" | "UNKNOWN_MATCH_TYPE" | "NOT_INSTANTIABLE" | "NOT_IMPLEMENTED" | "INVALID_TYPE";
export type MarkdownLanguage = "javascript" | "typescript" | "python" | "lua" | "html" | "css" | "cmd" | "svg" | "ruby" | "c" | "c++" | "c#" | "md" | "json" | "asciidoc" | "autohotkey" | "bash" | "shell" | "coffeescript" | "cpp" | "diff" | "ini" | "ml" | "prolog" | "tex" | "xl" | "xml";