import { BitFieldResolvable, CommandInteraction, IntentsString, MessageEmbed } from "discord.js";
import { BaseChannels, BaseEmojis, BaseRoles, BaseURLs, BaseWebhooks, ModuleDescriptions } from "./enums";
import { Defaults as _Defaults, ErrorCodes as _ErrorCodes } from "./interfaces";
declare const Embeds: {
    error(interaction: CommandInteraction): MessageEmbed;
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
    static Roles: typeof BaseRoles;
    static URLs: typeof BaseURLs;
    static Webhooks: typeof BaseWebhooks;
}
export {};
//# sourceMappingURL=constants.d.ts.map