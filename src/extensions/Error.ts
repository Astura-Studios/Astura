import { AsturaClient } from "../client/Client";
import { ErrorKey } from "../structures/util/Types";

const Messages = {
    // Module-related
    FILE_NOT_FOUND: (filename: string): string => `File '${filename}' not found`,
    MODULE_NOT_FOUND: (constructor: string, id: string): string => `${constructor} '${id}' does not exist`,
    ALREADY_LOADED: (constructor: string, id: string): string => `${constructor} '${id}' is already loaded`,
    NOT_RELOADABLE: (constructor: string, id: string): string => `${constructor} '${id}' is not reloadable`,
    INVALID_CLASS_TO_HANDLE: (given: string, expected: string): string => `Class to handle ${given} is not a subclass of ${expected}`,

    // Command-related
    ALIAS_CONFLICT: (alias: string, id: string, conflict: string): string => `Alias '${alias}' of '${id}' already exists on '${conflict}'`,

    // Options-related
    COMMAND_UTIL_EXPLICIT: "The command handler options `handleEdits` and `storeMessages` require the `commandUtil` option to be true",
    UNKNOWN_MATCH_TYPE: (match: string): string => `Unknown match type '${match}'`,

    // Generic errors
    NOT_INSTANTIABLE: (constructor: string): string => `${constructor} is not instantiable`,
    NOT_IMPLEMENTED: (constructor: string, method: string): string => `${constructor}#${method} has not been implemented`,
    INVALID_TYPE: (name: string, expected: string, vowel: boolean = false): string => `Value of '${name}' was not ${vowel ? "an" : "a"} ${expected}`
};

export class ExtendedError extends Error {
    public client: AsturaClient;
    public code: ErrorKey;

    public constructor(key: ErrorKey, client: AsturaClient, ...args: any[]) {
        const errorMessage = Messages[key];
        if (errorMessage == null) throw new TypeError(`Error key '${key}' does not exist`);
        const message: string = typeof errorMessage === "function" ? errorMessage(args[0], args[1], args[2] as never) : errorMessage;

        super(message);
        this.client = client;
        this.code = key;
    };

    public get name(): string {
        return `${this.client.util.date.getLocalTime()} | [ AsturaClient ] Error: ${this.message}`;
    };
};