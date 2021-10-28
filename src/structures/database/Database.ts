import { DatabaseOptions } from "../util/Interfaces";
import { MikroORM } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

export class Database extends MikroORM {
    public constructor(options: DatabaseOptions) {
        super({
            dbName: options.dbName,
            entities: [],
            entitiesTs: [],
            metadataProvider: TsMorphMetadataProvider,
            type: "sqlite"
        });
    }
}