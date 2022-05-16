import { BitFieldResolvable, CommandInteraction, Intents as _Intents, IntentsString, MessageEmbed } from "discord.js";
import { Client } from "../core/exports";
import { BaseChannels, BaseEmojis, BaseRoles, BaseURLs, BaseWebhooks, ModuleDescriptions } from "./enums";
import { Defaults as _Defaults, ErrorCodes as _ErrorCodes } from "./interfaces";

const Intents: BitFieldResolvable<IntentsString, number> = [
    _Intents.FLAGS.DIRECT_MESSAGES,
    _Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    _Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    _Intents.FLAGS.GUILDS,
    _Intents.FLAGS.GUILD_BANS,
    _Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    _Intents.FLAGS.GUILD_INTEGRATIONS,
    _Intents.FLAGS.GUILD_INVITES,
    _Intents.FLAGS.GUILD_MEMBERS,
    _Intents.FLAGS.GUILD_MESSAGES,
    _Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    _Intents.FLAGS.GUILD_MESSAGE_TYPING,
    _Intents.FLAGS.GUILD_PRESENCES,
    _Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
    _Intents.FLAGS.GUILD_VOICE_STATES,
    _Intents.FLAGS.GUILD_WEBHOOKS
];

const Defaults: _Defaults = {
    embed: {
        color: {
            default: 0x2f3136
        }
    }
};

const Embeds = {
    error(interaction: CommandInteraction): MessageEmbed {
        const client: Client = new Client();
        const developers: string = `${[client.config.owners[0], client.config.owners[1]].slice(0, [client.config.owners[0], client.config.owners[1]].length - 1).map((id: string): string => `${interaction.guild?.members.cache.get(id)?.user}`).join(", ")} or ${interaction.guild?.members.cache.get([client.config.owners[0], client.config.owners[1]].pop() as string)?.user}`;

        return new MessageEmbed({
            color: Defaults.embed.color.default,
            author: {
                name: "Whoops! Look like an error has occured.",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            },
            description: `Hey there, **${interaction.user.username}**. Unfortunately, an internal error has occurred inside Astura, so this command is currently unavailable. Please report this to one of the developers (${developers}) and they'll get the issue sorted out as soon as possible.`,
        });
    }
};

const ErrorCodes: _ErrorCodes = {
    0: "success",
    1: "uncaught fatal exception",
    2: "bash error",
    3: "internal JavaScript parse error",
    4: "internal javascript evaluation failure",
    5: "fatal error",
    6: "non-function internal exception handler",
    7: "internal exception handler run-time failure",
    8: "uncaught exception (deprecated)",
    9: "invalid argument",
    10: "internal JavaScript run-time failure",
    12: "invalid debug argument"
};

const BaseGuild: string = "760659394370994197";
const Channels: typeof BaseChannels = BaseChannels;
const Emojis: typeof BaseEmojis = BaseEmojis;
const Roles: typeof BaseRoles = BaseRoles;
const URLs: typeof BaseURLs = BaseURLs;
const Webhooks: typeof BaseWebhooks = BaseWebhooks;

export class Constants {
    static BaseGuild: string = BaseGuild;
    static ErrorCodes: _ErrorCodes = ErrorCodes;
    static Intents: BitFieldResolvable<IntentsString, number> = Intents;
    static Defaults: _Defaults = Defaults;
    static Channels: typeof BaseChannels = Channels;
    static Embeds: typeof Embeds = Embeds;
    static Emojis: typeof BaseEmojis = Emojis;
    static ModuleDescriptions: typeof ModuleDescriptions = ModuleDescriptions;
    static Roles: typeof BaseRoles = Roles;
    static URLs: typeof BaseURLs = URLs;
    static Webhooks: typeof BaseWebhooks = Webhooks;
}