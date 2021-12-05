import { Node } from "../util/Interfaces";

import { config } from "dotenv";
config();

export const nodes: Node[] = [
    {
        id: process.env.NODE_ID as string,
        host: process.env.NODE_HOST as string,
        port: parseInt(process.env.NODE_PORT as string),
        password: process.env.NODE_PASSWORD as string
    },
];