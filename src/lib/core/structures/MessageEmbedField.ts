import { MessageEmbedFieldOptions } from "../../base/interfaces";

export class MessageEmbedField {
    public name: string;
    public value: string;
    public inline: boolean;

    public constructor(options: MessageEmbedFieldOptions) {
        this.name = options.name;
        this.value = options.value;
        this.inline = options.inline || false;
    }

    public setName(name: string): this {
        this.name = name;
        return this;
    }

    public setValue(value: string): this {
        this.value = value;
        return this;
    }

    public setInline(inline: boolean): this {
        this.inline = inline;
        return this;
    }
}