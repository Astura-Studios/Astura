"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reflection_1 = require("@mikro-orm/reflection");
exports.default = {
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
