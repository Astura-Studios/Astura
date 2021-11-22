import { AsturaClient } from "../../client/Client";
import { Configuration, Connection, IDatabaseDriver, MikroORM, Options, RequestContext } from "@mikro-orm/core";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

import { databaseOptions } from "./mikro-orm.config";
import express, { Express, NextFunction, Request } from "express";

export class Database extends MikroORM {
    public app: Express;
    public client: AsturaClient;

    public constructor(client: AsturaClient) {
        super({
            dbName: databaseOptions.dbName,
            entities: databaseOptions.entities,
            entitiesTs: databaseOptions.entitiesTs,
            metadataProvider: databaseOptions.metadataProvider,
            type: databaseOptions.type
        });

        this.app = express();
        this.client = client;
        
        this.app.use((_req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, _res, next: NextFunction): void => {
            RequestContext.create(this.em, next);
        });
    };
    
    /**
     * Initialize the ORM, load entity metadata, create EntityManager and connect to the database. If you omit the `options` parameter, your CLI config will be used.
     */
    public async init(): Promise<void> {
        await Database.init(databaseOptions as Options<IDatabaseDriver<Connection>> | Configuration<IDatabaseDriver<Connection>> | undefined)
            .then((_connection: MikroORM<IDatabaseDriver<Connection>>): void => {
                return console.log(`${this.client.util.date.getLocalTime()} | [ MikroORM ] Successfully initialized MikroORM database connection to SQLite`);
            })
            .catch((error: Error): void => {
                return console.log(`${this.client.util.date.getLocalTime()} | [ MikroORM ] ${error.stack}`);
            });
    };
};