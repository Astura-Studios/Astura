import { DatabaseOptions } from "../util/Interfaces";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

export default {
    dbName: "AsturaDB",
    entities: [
        "./entities/Prefix"
    ],
    entitiesTs: [
        "./entities/Prefix"
    ],
    metadataProvider: TsMorphMetadataProvider,
    type: "sqlite" as "sqlite" | "mongo" | "mysql" | "mariadb" | "postgresql" | undefined
} as DatabaseOptions;   