"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsturaClient = void 0;
const discord_js_1 = require("discord.js");
const Configuration_1 = require("../structures/Configuration");
const Database_1 = require("../structures/database/Database");
const ListenerHandler_1 = require("../handlers/ListenerHandler");
const Utilities_1 = require("../structures/Utilities");
const Config_1 = require("./Config");
const path_1 = require("path");
class AsturaClient extends discord_js_1.Client {
    constructor() {
        super(Config_1.configOptions.clientOptions);
        this.config = new Configuration_1.Configuration(Config_1.configOptions);
        this.db = new Database_1.Database({
            dbName: this.config.databaseName,
        });
        this.listenerHandler = new ListenerHandler_1.ListenerHandler(this, {
            directory: (0, path_1.join)(__dirname, "..", "commands"),
        });
        this.util = new Utilities_1.Utilities(this);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // this.commandHandler.load();
            this.listenerHandler.load();
            yield this.db.connect();
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.init();
                return this.login(this.config.token);
            } catch (error) {
                return console.log(
                    `${this.util.date.getLocalTime()} | [ Astura Client ] ${
                        error.stack
                    }`
                );
            }
        });
    }
}
exports.AsturaClient = AsturaClient;
