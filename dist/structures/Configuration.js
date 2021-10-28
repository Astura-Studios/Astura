"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
class Configuration {
    constructor(options) {
        this.clientOptions = options.clientOptions;
        this.clientSecret = options.clientSecret;
        this.databaseName = options.databaseName;
        this.owners = options.owners;
        this.token = options.token;
    }
}
exports.Configuration = Configuration;
