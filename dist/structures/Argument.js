"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Argument = void 0;
class Argument {
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.choices = options.choices;
        this.required = options.required;
        this.type = options.type;
    }
    ;
}
exports.Argument = Argument;
;
