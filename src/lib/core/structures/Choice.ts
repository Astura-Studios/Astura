export class Choice {
    public name: string;
    public value: string;

    public constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }

    public setName(name: string): this {
        this.name = name;
        return this;
    }

    public setValue(value: string): this {
        this.value = value;
        return this;
    }
}