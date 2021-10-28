"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const core_1 = require("@mikro-orm/core");
const reflection_1 = require("@mikro-orm/reflection");
class Database extends core_1.MikroORM {
    constructor(options) {
        super({
            dbName: options.dbName,
            entities: [],
            entitiesTs: [],
            metadataProvider: reflection_1.TsMorphMetadataProvider,
            type: "sqlite",
        });
    }
}
exports.Database = Database;
