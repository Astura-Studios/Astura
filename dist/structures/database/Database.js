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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
class Database extends core_1.MikroORM {
    constructor(client) {
        super({
            dbName: mikro_orm_config_1.default.dbName,
            entities: mikro_orm_config_1.default.entities,
            entitiesTs: mikro_orm_config_1.default.entitiesTs,
            metadataProvider: mikro_orm_config_1.default.metadataProvider,
            type: mikro_orm_config_1.default.type
        });
        this.app = (0, express_1.default)();
        this.client = client;
        this.app.use((_req, _res, next) => {
            core_1.RequestContext.create(this.em, next);
        });
    }
    ;
    /**
     * Initialize the ORM, load entity metadata, create EntityManager and connect to the database. If you omit the `options` parameter, your CLI config will be used.
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Database.init(mikro_orm_config_1.default)
                .then((_connection) => {
                return console.log(`${this.client.util.date.getLocalTime()} | [ MikroORM ] Successfully initialized MikroORM database connection to SQLite`);
            })
                .catch((error) => {
                return console.log(`${this.client.util.date.getLocalTime()} | [ MikroORM ] ${error.stack}`);
            });
        });
    }
    ;
}
exports.Database = Database;
;
