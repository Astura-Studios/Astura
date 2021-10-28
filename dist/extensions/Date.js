"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDate = void 0;
class ExtendedDate extends Date {
    getDateString() {
        return `${this.getUTCDay()} ${this.getUTCDay()}${this.getDateSuffix(
            this.getUTCDay()
        )} of ${this.getUTCMonth()} ${this.getUTCFullYear()}`;
    }
    getDateSuffix(dayOfWeek) {
        if (dayOfWeek > 3 && dayOfWeek < 21) return "th";
        switch (dayOfWeek % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }
    getLocalTime() {
        return this.toLocaleTimeString("en");
    }
}
exports.ExtendedDate = ExtendedDate;
