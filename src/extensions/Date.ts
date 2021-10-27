export default class ExtendedDate extends Date {
    public getDateString(): string {
        return `${this.getUTCDay()} ${this.getUTCDay()}${this.getDateSuffix(this.getUTCDay())} of ${this.getUTCMonth()} ${this.getUTCFullYear()}`;
    }

    public getDateSuffix(dayOfWeek: number): "th" | "st" | "nd" | "rd" {
        if (dayOfWeek > 3 && dayOfWeek < 21) return "th"; 
        switch (dayOfWeek % 10) {
            case 1: return "st"; 
            case 2: return "nd"; 
            case 3: return "rd"; 
            default: return "th";
        };
    }

    public getLocalTime(): string {
        return this.toLocaleTimeString("en");
    }
}