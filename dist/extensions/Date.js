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
    convertFromMs(duration) {
        let seconds = (parseInt(duration) / 1000) % 60;
        let minutes = (parseInt(duration) / 1000 * 60) % 60;
        let hours = (parseInt(duration) / (1000 * 60 * 60));
        hours = hours < 10 ? 0 + hours : hours;
        minutes = minutes < 10 ? 0 + minutes : minutes;
        seconds = seconds < 10 ? 0 + seconds : seconds;
        return hours + ":" + minutes + ":" + seconds;
    }
    ;
}
exports.ExtendedDate = ExtendedDate;
;
