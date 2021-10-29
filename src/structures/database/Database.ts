import { Configuration, Connection, IDatabaseDriver, MikroORM, Options, RequestContext } from "@mikro-orm/core";

import config from "./mikro-orm.config";
import express, { Express } from "express";

export class Database extends MikroORM {
    public app: Express;

    public constructor() {
        super({
            dbName: config.dbName,
            entities: config.entities,
            entitiesTs: config.entitiesTs,
            metadataProvider: config.metadataProvider,
            type: config.type
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
        await Database.init(config as Options<IDatabaseDriver<Connection>> | Configuration<IDatabaseDriver<Connection>> | undefined);
    };
};