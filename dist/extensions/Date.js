"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDate = void 0;
class ExtendedDate extends Date {
    getDateString() {
        return `${this.getUTCDay()} ${this.getUTCDay()}${this.getDateSuffix(this.getUTCDay())} of ${this.getUTCMonth()} ${this.getUTCFullYear()}`;
    }
    ;
    getDateSuffix(dayOfWeek) {
        if (dayOfWeek > 3 && dayOfWeek < 21)
            return "th";
        switch (dayOfWeek % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
        ;
    }
    ;
    getLocalTime() {
        return this.toLocaleTimeString("en");
    }
    ;
    convertFromMs(ms, ignoreDays, format, trim) {
        const seconds = Math.floor((ms / 1000) % 60).toString();
        const minutes = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hours = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
        if (format === "d:h:m:s" && ignoreDays) {
            return hours.padStart(2, '0') !== "00" && trim === "max" ? `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}` : `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
        }
        else if (format === "d:h:m:s" && !ignoreDays) {
            return `${days.padStart(1, '0')}:${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
        }
        else if (format === "dd, hh, mm, ss" && ignoreDays) {
            return hours.padStart(2, '0') !== "00" && trim === "max" ? `${hours.padStart(2, '0')}h, ${minutes.padStart(2, '0')}m, ${seconds.padStart(2, '0')}s` : `${minutes.padStart(2, '0')}m, ${seconds.padStart(2, '0')}s`;
        }
        else if (format === "dd, hh, mm, ss" && !ignoreDays) {
            return `${days.padStart(1, '0')}d, ${hours.padStart(2, '0')}h, ${minutes.padStart(2, '0')}m, ${seconds.padStart(2, '0')}s`;
        }
        ;
    }
    ;
}
exports.ExtendedDate = ExtendedDate;
;
