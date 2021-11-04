"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utilities = void 0;
const discord_js_1 = require("discord.js");
const ErrorEmbed_1 = require("../ErrorEmbed");
const Date_1 = require("../../extensions/Date");
const String_1 = require("../../extensions/String");
class Utilities {
    constructor(client) {
        this.categoryDescriptions = {
            listeners: {
                "client": "The event listeners triggered by the discord.js Client",
                "process": "The event listeners triggered by process"
            }
        };
        this.client = client;
        this.date = new Date_1.ExtendedDate();
        this.defaults = {
            embed: {
                color: 0x2f3136
            }
        };
        this.string = new String_1.ExtendedString();
        /**
        const messageOne = await (interaction.guild?.channels.cache.get("785216134131351562") as TextChannel).messages.fetch("905337770778689606");
        const messageTwo = await (interaction.guild?.channels.cache.get("785216134131351562") as TextChannel).messages.fetch("905337780438200320");
        const messageThree = await (interaction.guild?.channels.cache.get("785216134131351562") as TextChannel).messages.fetch("905337796108107826");
        **/
        /**
        await messageOne.react("904556069328666664");
        await messageOne.react("904557368262668331");
        await messageOne.react("784874334577229846");
        await messageOne.react("784874345260384266");
        await wait(2000);
        await messageOne.react("785208179856113694");
        await messageOne.react("785208191851298848");
        await messageOne.react("785212068466786364");
        await messageOne.react("904557843489898516");
        await wait(2000);
        await messageOne.react("785208883202490413");
        await messageOne.react("902054964019482675");
        await messageOne.react("902054931182264351");
        await messageOne.react("902054876144619540");
        await wait(2000);
        await messageOne.react("902054910844092487");
        **/
        /**
        await messageTwo.react("📢");
        await messageTwo.react("🎬");
        await messageTwo.react("🎮");
        await messageTwo.react("🍕");
        await wait(2000);
        await messageTwo.react("🎉");
        await messageTwo.react("📊");
        **/
        /**
        messageThree.react("💬");
        messageThree.react("❓");
        messageThree.react("🛠️");
        **/
    }
    ;
    embed(options) {
        return new discord_js_1.MessageEmbed(options);
    }
    ;
    errorEmbed(options) {
        const errorEmbed = new ErrorEmbed_1.ErrorEmbed();
        switch (options.type) {
            case "INVALID_ARGS":
                return errorEmbed.invalidArguments(options.client, options.command, options.interaction, options.errorMessage);
            case "MISSING_ARGS":
                return errorEmbed.missingAruments(options.client, options.command, options.interaction, options.errorMessage);
            case "CLIENT_PERMISSIONS_MISSING":
                return errorEmbed.clientPermissionsMissing(options.client, options.errorMessage, options.interaction);
            case "USER_PERMISSIONS_MISSING":
                return errorEmbed.userPermissionsMissing(options.client, options.errorMessage, options.interaction);
            case "OWNER_ONLY":
                return errorEmbed.ownerOnly(options.client, options.errorMessage, options.interaction);
        }
        ;
    }
    ;
    pages(arr, itemsPerPage, page = 1) {
        const maxPages = Math.ceil(arr.length / itemsPerPage);
        if (page < 1 || page > maxPages)
            return null;
        return arr.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    }
    ;
    permission(permission) {
        const permissionString = permission.replace(/_/g, " ").toLowerCase().replace(/guild/g, "server").split(" ").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(" ");
        return permissionString;
    }
    ;
}
exports.Utilities = Utilities;
;
