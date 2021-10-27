import { MessageEmbed, MessageEmbedOptions } from "discord.js";
import { ErrorEmbedOptions, UtilityDefaults } from "./Interfaces";

import AsturaClient from "../client/Client";
import ErrorEmbed from "./ErrorEmbed";
import ExtendedDate from "../extensions/Date";
import ExtendedString from "../extensions/String";

export default class Utilities {
    public client: AsturaClient;
    public date: ExtendedDate;
    public defaults: UtilityDefaults;
    public string: ExtendedString;

    constructor(client: AsturaClient) {
        this.client = client;
        this.date = new ExtendedDate();
        this.defaults = {
            embed: {
                color: 0x2f3136
            }
        }
        this.string = new ExtendedString();
    }

    public embed(options: MessageEmbedOptions): MessageEmbed {
        return new MessageEmbed(options);
    }

    public errorEmbed(options: ErrorEmbedOptions): MessageEmbed {
        const errorEmbed: ErrorEmbed = new ErrorEmbed();

        switch (options.type) {
            case "INVALID_ARGS":
                return errorEmbed.invalidArguments(options.client, options.command, options.message, options.errorMessage);
            case "MISSING_ARGS":
                return errorEmbed.missingAruments(options.client, options.command, options.message, options.errorMessage);
            case "CLIENT_PERMISSIONS_MISSING":
                return errorEmbed.clientPermissionsMissing(options.client, options.errorMessage, options.message);
            case "USER_PERMISSIONS_MISSING":
                return errorEmbed.userPermissionsMissing(options.client, options.errorMessage, options.message);
            case "OWNER_ONLY":
                return errorEmbed.ownerOnly(options.client, options.errorMessage, options.message);
        }
    }


    public pages(arr: any[], itemsPerPage: number, page: number = 1): any[] | null {
        const maxPages = Math.ceil(arr.length / itemsPerPage);
        if (page < 1 || page > maxPages) return null;
        return arr.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    }

    public permission(permission: string): string {
        const permissionString: string = permission.replace(/_/g, " ").toLowerCase().replace(/guild/g, "server").split(" ").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(" ");
        return permissionString;
    }
}