"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseOptions = void 0;
const reflection_1 = require("@mikro-orm/reflection");
exports.databaseOptions = {
    dbName: "AsturaDB",
    entities: [
        "./entities/Prefix"
    ],
    entitiesTs: [
        "./entities/Prefix"
    ],
    metadataProvider: reflection_1.TsMorphMetadataProvider,
    type: "sqlite"
};
