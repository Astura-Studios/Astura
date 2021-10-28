"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
const Client_1 = require("../client/Client");
const Error_1 = require("../extensions/Error");
class Listener {
    constructor(id, options) {
        this.category = options.category;
        this.client = new Client_1.AsturaClient();
        this.emitter = options.emitter;
        this.id = id;
        this.name = options.name;
    }
    ;
    exec(..._args) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error_1.ExtendedError("NOT_IMPLEMENTED", new Client_1.AsturaClient(), this.constructor.name, this.exec.name);
        });
    }
    ;
}
exports.Listener = Listener;
;
