"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodes = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.nodes = [
    {
        id: process.env.NODE_ID,
        host: process.env.NODE_HOST,
        port: parseInt(process.env.NODE_PORT),
        password: process.env.NODE_PASSWORD,
    },
];
