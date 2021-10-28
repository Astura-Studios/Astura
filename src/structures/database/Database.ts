import { DatabaseOptions } from "../util/Interfaces";
import { MikroORM, RequestContext } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

import express, { Express } from "express";

export class Database extends MikroORM {
    public app: Express;

    public constructor(options: DatabaseOptions) {
        super({
            dbName: options.dbName,
            entities: ["../../../dist/structures/database/entities/**/*.js"],
            entitiesTs: ["./entities/**/*.ts"],
            metadataProvider: TsMorphMetadataProvider,
            type: "sqlite"
        });

        this.app = express();
        
        this.app.use((_req, _res, next) => {
            RequestContext.create(this.em, next);
        });
    };

    /**
     * Initialize the ORM, load entity metadata, create EntityManager and connect to the database. If you omit the `options` parameter, your CLI config will be used.
     */
    public async init(): Promise<void> {
        await Database.init();
    };
};