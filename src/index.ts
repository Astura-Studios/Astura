import { Client } from "./lib/core/exports";
import { Options } from "discord.js";

const client: Client = new Client({
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true
    },
    makeCache: Options.cacheEverything(),
    partials: ["REACTION", "MESSAGE"],
    ws: {
        properties: {
            $browser: "discord.js" // "Discord iOS" for mobile
        }
    }
});

client.start();     