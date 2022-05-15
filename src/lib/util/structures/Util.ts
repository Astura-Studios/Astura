import { Client } from "../../core/exports";
import { Console } from "./Console";
import { Constants } from "../../base/constants";
import { FetchedUser } from "../../base/interfaces";
import { GuildMember } from "discord.js";
import { ClientPlatform, MemberAcknowledgements } from "../../base/types";
import { TimerOptions } from "timers";
import { promisify } from "util";

import fetch from "node-fetch";

export class Util {
    public static capitalize: (string: string) => string = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);
    public static difference: (a: Date, b: Date) => string | undefined = (a: Date, b: Date): string | undefined => this.convertFromMs(b.getTime() - a.getTime());
    public static formatPermission: (permission: string) => string = (permission: string) => permission.replace(/_/g, " ").toLowerCase().replace(/guild/g, "server").split(" ").map((word: string): string => word.charAt(0).toUpperCase() + word.substring(1)).join(" ");
    public static wait: <T = void>(delay?: number | undefined, value?: T | undefined, options?: TimerOptions | undefined) => Promise<T> = promisify(setTimeout);

    public static convertFromMs(ms: number): string | undefined {
        const seconds: string = Math.floor((ms / 1000) % 60).toString();
        const minutes: string = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hours: string = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
        const days: string = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();

        if (hours === "0") {
            return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
        } else if (days === "0") {
            return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
        } else if (days.length < 2) {
            return `${days.padStart(1, "0")}:${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
        } else if (days.length >= 2) {
            return `${days.padStart(2, "0")}:${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
        }
    }

    public static getDateSuffix(dayOfWeek: number): "th" | "st" | "nd" | "rd" {
        if (dayOfWeek > 3 && dayOfWeek < 21) return "th";
        switch (dayOfWeek % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    public static generateKey(length: number): string {
        let result: string = "";
        const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i: number = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    }

    public static missing(array1: any[], array2: any[]): typeof array1 {
        if (typeof array1 !== typeof array2) {
            throw new TypeError("Arrays must be of the same type.");
        } else {
            const missing: typeof array1 = array1.filter((obj): boolean => {
                return array2.indexOf(obj) == -1;
            });

            return missing;
        }
    }

    public static pages(arr: any[], itemsPerPage: number, page: number = 1): typeof arr | null {
        const maxPages = Math.ceil(arr.length / itemsPerPage);
        if (page < 1 || page > maxPages) return null;
        return arr.slice((page - 1) * itemsPerPage, page * itemsPerPage) as typeof arr;
    }

    public static resolveAcknowledgements(member: GuildMember): MemberAcknowledgements[] {
        const acknowledgements: MemberAcknowledgements[] = ["None"];

        if (member.id === member.guild.ownerId) {
            acknowledgements.shift();
            acknowledgements.push("Server Owner");
        }

        if (member.permissions.has("ADMINISTRATOR")) {
            if (acknowledgements[0] === "None") {
                acknowledgements.shift();
                acknowledgements.push("Administrator");
            } else {
                acknowledgements.push("Administrator");
            }
        }

        if (member.roles.cache.has(Constants["Roles"].DEPARTMENT_LEADER)) {
            if (acknowledgements[0] === "None") {
                acknowledgements.shift();
                acknowledgements.push("Department Leader");
            } else {
                acknowledgements.push("Department Leader");
            }
        }

        if (member.roles.cache.has(Constants["Roles"].STAFF)) {
            if (acknowledgements[0] === "None") {
                acknowledgements.shift();
                acknowledgements.push("Staff Member");
            } else {
                acknowledgements.push("Staff Member");
            }
        }

        if (member.roles.cache.has(Constants["Roles"].RETIRED_STAFF)) {
            if (acknowledgements[0] === "None") {
                acknowledgements.shift();
                acknowledgements.push("Retired Staff");
            } else {
                acknowledgements.push("Retired Staff");
            }
        }

        if (member.roles.cache.has(Constants["Roles"].PARTNER)) {
            if (acknowledgements[0] === "None") {
                acknowledgements.shift();
                acknowledgements.push("Partner");
            } else {
                acknowledgements.push("Partner");
            }
        }

        if (member.roles.cache.has(Constants["Roles"].CONTRIBUTOR)) {
            if (acknowledgements[0] === "None") {
                acknowledgements.shift();
                acknowledgements.push("Contributor");
            } else {
                acknowledgements.push("Contributor");
            }
        }

        if (member.roles.cache.has(Constants["Roles"].SERVER_BOOSTER)) {
            if (acknowledgements[0] === "None") {
                acknowledgements.shift();
                acknowledgements.push("Server Booster");
            } else {
                acknowledgements.push("Server Booster");
            }
        }

        return acknowledgements;
    }

    public static resolveActivity(member: GuildMember): string | null {
        let status: string = "None";
        if (member.presence && member.presence.activities[0]) {
            status = `${this.capitalize(member.presence.activities[0].type.toLowerCase())} ${member.presence.activities[0].name}`;
            if (member.presence.activities[0].type === "LISTENING") status = `${this.capitalize(member.presence.activities[0].type.toLowerCase())} to ${member.presence.activities[0].name}`;
            if (member.presence.activities[0].type === "COMPETING") status = `${this.capitalize(member.presence.activities[0].type.toLowerCase())} in ${member.presence.activities[0].name}`;
            return status;
        } else {
            return null;
        }
    }

    public static resolveFlags(member: GuildMember): string {
        if (member.user.flags) {
            return member.user.flags.toArray().join("\n")
                .replace(
                    "HOUSE_BRAVERY",
                    `• ${Constants["Emojis"].BRAVERY} HypeSquad Bravery`
                ).replace(
                    "EARLY_SUPPORTER",
                    `• ${Constants["Emojis"].DISCORD_EARLYSUPPORTER} Early Supporter`
                ).replace(
                    "VERIFIED_DEVELOPER",
                    `• ${Constants["Emojis"].VERIFIED_BOT_DEVELOPER} Verified Bot Developer`
                ).replace(
                    "EARLY_VERIFIED_BOT_DEVELOPER",
                    `• ${Constants["Emojis"].VERIFIED_BOT_DEVELOPER} Early Verified Bot Developer`
                ).replace(
                    "HOUSE_BRILLIANCE",
                    `• ${Constants["Emojis"].BRILLIANCE} HypeSquad Brilliance`
                ).replace(
                    "HOUSE_BALANCE",
                    `• ${Constants["Emojis"].BALANCE} HypeSquad Balance`
                ).replace(
                    "PARTNERED_SERVER_OWNER",
                    `• ${Constants["Emojis"].BLURPLE_PARTNER} Discord Partnered Server Owner`
                ).replace(
                    "HYPESQUAD_EVENTS",
                    `• ${Constants["Emojis"].BLURPLE_HYPESQUAD_EVENTS} Hypesquad Events`
                ).replace(
                    "DISCORD_CLASSIC",
                    `• ${Constants["Emojis"].NITRO_CLASSIC} Discord Nitro Classic`
                );
        } else {
            return "• None";
        }
    }

    public static async resolveUser(id: string): Promise<FetchedUser | null> {
        const client: Client = new Client();
        const res = await fetch(`https://discord.com/api/v9/users/${id}`, {
            headers: {
                "Authorization": `Bot ${client.config.token}`
            }
        });

        if (!res.ok) return null;

        return res.json();
    }

    public static resolvePlatform(member: GuildMember): ClientPlatform | null {
        let platform: ClientPlatform;

        if (member.presence && member.presence.status !== ("invisible" || "offline") && member.presence.clientStatus) {
            if (member.presence.clientStatus.desktop) platform = "Desktop";
            else if (member.presence.clientStatus.mobile) platform = "Mobile";
            else if (member.presence.clientStatus.web) platform = "Browser";
            else return null;
        } else {
            return null;
        }

        return platform;
    }

    public static resolveStatus(member: GuildMember): string {
        if (member.presence && member.presence.status) {
            return member.presence.status
                .replace("online", "Online")
                .replace("idle", "Idle")
                .replace("dnd", "Do Not Disturb")
                .replace("offline", "Offline")
                .replace("invisible", "Invisible");
        } else {
            return "Offline";
        }
    }

    public static resolveTime(input: string) {
        if (input.length <= 1) {
            new Console().error("Time resolve function input must have 2 characters or more.", "astura.util", false);
            return {
                error: true,
                value: "A number value and its time suffix must be provided."
            };
        } else if (input.at(input.length - 1)?.toLowerCase() !== ("m" || "w" || "d" || "h")) {
            new Console().error("Time resolve function input must end with m, w, d or h", "astura.util", false);
            return {
                error: true,
                value: "The provided time suffix must be either m, w, d or h."
            };
        } else if (!parseInt(input.slice(0, input.length - 2))) {
            new Console().error("Time resolve function input must have a number", "astura.util", false);
            return {
                error: true,
                value: "The provided time value is not a valid number."
            };
        } else {
            switch (input.at(input.length - 1)?.toLowerCase()) {
                case "m": {
                    const number: number = parseInt(input.slice(0, input.length - 2));

                    return {
                        error: false,
                        value: new Date().setMonth(new Date().getMonth() + number)
                    };
                }
            }
        }
    }
}