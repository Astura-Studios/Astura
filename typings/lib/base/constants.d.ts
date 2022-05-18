import { BitFieldResolvable, CommandInteraction, IntentsString, MessageEmbed } from "discord.js";
import { BaseChannels, BaseEmojis, BaseRoles, BaseURLs, BaseWebhooks, ModuleDescriptions } from "./enums";
import { Defaults as _Defaults, ErrorCodes as _ErrorCodes } from "./interfaces";
declare const Embeds: {
    error(interaction: CommandInteraction): MessageEmbed;
};
declare const ReactionRoles: {
    html: string;
    css: string;
    java: string;
    javascript: string;
    typescript: string;
    c_: string;
    cplusplus: string;
    csharp: string;
    rust: string;
    ruby: string;
    go: string;
    lua: string;
    loudspeaker: string;
    clapper: string;
    video_game: string;
    pizza: string;
    tada: string;
    bar_chart: string;
    speech_balloon: string;
    question: string;
    tools: string;
};
export declare class Constants {
    static BaseGuild: string;
    static ErrorCodes: _ErrorCodes;
    static Intents: BitFieldResolvable<IntentsString, number>;
    static Defaults: _Defaults;
    static Channels: typeof BaseChannels;
    static Embeds: typeof Embeds;
    static Emojis: typeof BaseEmojis;
    static ModuleDescriptions: typeof ModuleDescriptions;
    static ReactionRoles: typeof ReactionRoles;
    static Roles: typeof BaseRoles;
    static URLs: typeof BaseURLs;
    static Webhooks: typeof BaseWebhooks;
}
export {};
//# sourceMappingURL=constants.d.ts.map