export class Command {
    id: string;
    examples: string[];
    usage: string;

    constructor(id: string, examples: string[], usage: string) {
        this.id = id;
        this.examples = examples;
        this.usage = usage;
    }
}