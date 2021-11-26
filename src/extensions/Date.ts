import { Suffix } from "../structures/util/Types";

export class ExtendedDate extends Date {
    public getDateString(): string {
        return `${this.getUTCDay()} ${this.getUTCDay()}${this.getDateSuffix(this.getUTCDay())} of ${this.getUTCMonth()} ${this.getUTCFullYear()}`;
    };

    public getDateSuffix(dayOfWeek: number): Suffix {
        if (dayOfWeek > 3 && dayOfWeek < 21) return "th"; 
        switch (dayOfWeek % 10) {
            case 1: return "st"; 
            case 2: return "nd"; 
            case 3: return "rd"; 
            default: return "th";
        };
    };

    public getLocalTime(): string {
        return this.toLocaleTimeString("en");
    };

    public convertFromMs(ms: number, ignoreDays: boolean, format: "d:h:m:s" | "dd, hh, mm, ss", trim: "max" | "none"): string | undefined {
        const seconds: string = Math.floor((ms / 1000) % 60).toString();
        const minutes: string = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hours: string = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
        const days: string = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();

        if (format === "d:h:m:s" && ignoreDays) {
            return hours.padStart(2, '0') !== "00" && trim === "max" ? `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}` : `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
        } else if (format === "d:h:m:s" && !ignoreDays) {
            return `${days.padStart(1, '0')}:${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
        } else if (format === "dd, hh, mm, ss" && ignoreDays) {
            return hours.padStart(2, '0') !== "00" && trim === "max" ? `${hours.padStart(2, '0')}h, ${minutes.padStart(2, '0')}m, ${seconds.padStart(2, '0')}s` : `${minutes.padStart(2, '0')}m, ${seconds.padStart(2, '0')}s`;
        } else if (format === "dd, hh, mm, ss" && !ignoreDays) {
            return `${days.padStart(1, '0')}d, ${hours.padStart(2, '0')}h, ${minutes.padStart(2, '0')}m, ${seconds.padStart(2, '0')}s`;
        };
    };
};