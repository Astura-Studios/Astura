import { MessageSelectMenuOptions } from "../../base/interfaces";

export class MessageSelectMenuOption {
    public label: string;
    public description: string;
    public value: string;

    public constructor(options: MessageSelectMenuOptions) {
        this.label = options.label;
        this.description = options.description;
        this.value = options.value;
    }

    public setLabel(label: string): this {
        this.label = label;
        return this;
    }

    public setDescription(description: string): this {
        this.description = description;
        return this;
    }

    public setValue(value: string): this {
        this.value = value;
        return this;
    }
}