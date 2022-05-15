import { ArgumentOptions } from "../../base/interfaces";
import { ArgumentType } from "../../base/types";
import { Choice } from "./Choice";

export class Argument {
    public name: string;
    public description: string;
    public choices: Choice[];
    public required: boolean;
    public type: ArgumentType;

    public constructor(options: ArgumentOptions) {
        this.name = options.name;
        this.description = options.description;
        this.choices = options.choices || [];
        this.required = options.required;
        this.type = options.type;
    }

    public setName(name: string): this {
        this.name = name;
        return this;
    }

    public setDescription(description: string): this {
        this.description = description;
        return this;
    }

    public addChoice(choice: Choice): this {
        this.choices.push(choice);
        return this;
    }

    public setChoices(choices: Choice[]): this {
        this.choices = choices;
        return this;
    }

    public setRequired(required: boolean): this {
        this.required = required;
        return this;
    }

    public setType(type: ArgumentType): this {
        this.type = type;
        return this;
    }
}