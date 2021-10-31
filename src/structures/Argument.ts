import { ArgumentOptions } from "./util/Interfaces";
import { ArgumentType } from "./util/Types";

export class Argument {
    public name: string;
    public description: string; 
    public required: boolean;
    public type: ArgumentType;

    public constructor(options: ArgumentOptions) {
        this.name = options.name;
        this.description = options.description;
        this.required = options.required;
        this.type = options.type;
    };
};