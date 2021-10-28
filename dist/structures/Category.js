"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    constructor(id, options) {
        this.content = options.content;
        this.description = options.description;
        this.id = id;
        this.type = options.type;
    }
}
exports.Category = Category;
