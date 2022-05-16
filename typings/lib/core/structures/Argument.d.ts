import { ArgumentOptions } from "../../base/interfaces";
import { ArgumentType } from "../../base/types";
import { Choice } from "./Choice";
export declare class Argument {
    name: string;
    description: string;
    choices: Choice[];
    required: boolean;
    type: ArgumentType;
    constructor(options: ArgumentOptions);
    setName(name: string): this;
    setDescription(description: string): this;
    addChoice(choice: Choice): this;
    setChoices(choices: Choice[]): this;
    setRequired(required: boolean): this;
    setType(type: ArgumentType): this;
}
//# sourceMappingURL=Argument.d.ts.map