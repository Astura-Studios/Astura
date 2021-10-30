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
