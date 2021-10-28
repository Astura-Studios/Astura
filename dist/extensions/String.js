"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedString = void 0;
class ExtendedString extends String {
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    ;
}
exports.ExtendedString = ExtendedString;
;
