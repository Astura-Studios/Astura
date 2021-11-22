export class ExtendedDate extends Date {
    public getDateString(): string {
        return `${this.getUTCDay()} ${this.getUTCDay()}${this.getDateSuffix(this.getUTCDay())} of ${this.getUTCMonth()} ${this.getUTCFullYear()}`;
    };

    public getDateSuffix(dayOfWeek: number): "th" | "st" | "nd" | "rd" {
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

    public convertFromMs(duration: string): string {
        let seconds: number = (parseInt(duration) / 1000) % 60;
        let minutes: number = (parseInt(duration) / 1000 * 60) % 60;
        let hours: number = (parseInt(duration) / (1000 * 60 * 60));

        hours = hours < 10 ? 0 + hours : hours;
        minutes = minutes < 10 ? 0 + minutes : minutes;        
        seconds = seconds < 10 ? 0 + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    };
};