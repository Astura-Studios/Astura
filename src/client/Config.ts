import { ConfigurationOptions } from "../structures/util/Interfaces";
import { Intents, Options } from "discord.js";
import { config } from "dotenv";

config();

export const configOptions: ConfigurationOptions = {
    clientID: process.env.CLIENT_ID as string,
    clientOptions: {
        intents: [
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
            Intents.FLAGS.DIRECT_MESSAGE_TYPING,
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_BANS,
            Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
            Intents.FLAGS.GUILD_INTEGRATIONS,
            Intents.FLAGS.GUILD_INVITES,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_MESSAGE_TYPING,
            Intents.FLAGS.GUILD_PRESENCES,
            Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.GUILD_WEBHOOKS
        ],
        makeCache: Options.cacheEverything(),
        partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
        ws: {
            properties: {
                $browser: "discord.js"
            }
        }
    },
    clientSecret: process.env.CLIENT_SECRET as string,
    databaseName: "AsturaDB",
    owners: ["760995822120468511", "752114457202917436"], // Ascendus, lucaslah,
    token: process.env.TOKEN as string
};