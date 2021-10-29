import { ArgumentType } from "./util/Types";

export class Argument {
    public name: string;
    public description: string; 
    public required: boolean;
    public type: ArgumentType;

    public constructor(name: string, description: string, required: boolean, type: ArgumentType) {
        this.name = name;
        this.description = description;
        this.required = required;
        this.type = type;
    };
};