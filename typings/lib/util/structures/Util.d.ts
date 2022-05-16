/// <reference types="node" />
import { FetchedUser } from "../../base/interfaces";
import { GuildMember } from "discord.js";
import { ClientPlatform, MemberAcknowledgements } from "../../base/types";
import { TimerOptions } from "timers";
export declare class Util {
    static capitalize: (string: string) => string;
    static difference: (a: Date, b: Date) => string | undefined;
    static formatPermission: (permission: string) => string;
    static wait: <T = void>(delay?: number | undefined, value?: T | undefined, options?: TimerOptions | undefined) => Promise<T>;
    static convertFromMs(ms: number): string | undefined;
    static getDateSuffix(dayOfWeek: number): "th" | "st" | "nd" | "rd";
    static generateKey(length: number): string;
    static missing(array1: any[], array2: any[]): typeof array1;
    static pages(arr: any[], itemsPerPage: number, page?: number): typeof arr | null;
    static resolveAcknowledgements(member: GuildMember): MemberAcknowledgements[];
    static resolveActivity(member: GuildMember): string | null;
    static resolveFlags(member: GuildMember): string;
    static resolveUser(id: string): Promise<FetchedUser | null>;
    static resolvePlatform(member: GuildMember): ClientPlatform | null;
    static resolveStatus(member: GuildMember): string;
    static resolveTime(input: string): {
        error: boolean;
        value: string;
    } | {
        error: boolean;
        value: number;
    } | undefined;
}
//# sourceMappingURL=Util.d.ts.map