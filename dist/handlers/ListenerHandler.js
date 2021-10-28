"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenerHandler = void 0;
const Category_1 = require("../structures/Category");
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
class ListenerHandler {
    constructor(client, options) {
        this.categories = new discord_js_1.Collection();
        this.client = client;
        this.directory = options.directory;
        this.listeners = new discord_js_1.Collection();
    }
    ;
    load() {
        try {
            const categories = [];
            for (const category of (0, fs_1.readdirSync)(this.directory)) {
                categories.push(category.toLowerCase());
            }
            ;
            categories.forEach((category) => __awaiter(this, void 0, void 0, function* () {
                const categoryName = this.client.util.string.capitalize(category);
                this.categories.set(categoryName, new Category_1.Category(categoryName, {
                    content: null,
                    description: "",
                    type: "listener"
                }));
            }));
            for (const category of categories.values()) {
                for (const listenerFileName of (0, fs_1.readdirSync)(`${this.directory}/${category}`).filter(fileName => fileName.endsWith(".js"))) {
                    const listenerFile = require(`${this.directory}/${category}/${listenerFileName}`).default;
                    const listener = new listenerFile();
                    this.listeners.set(listener.name, listener);
                    switch (listener.emitter) {
                        case "client":
                            this.client.on(listener.name, listener.exec.bind(null, this.client));
                        case "process":
                            process.on(listener.name, listener.exec.bind(null, process));
                    }
                    ;
                }
                ;
                const categoryName = this.client.util.string.capitalize(category);
                const categoryListeners = this.listeners.filter(listener => listener.category.toLowerCase() === category.toLowerCase());
                this.categories.set(categoryName, new Category_1.Category(categoryName, {
                    content: categoryListeners,
                    description: this.client.util.categoryDescriptions.listeners[category.toLowerCase()],
                    type: "listener"
                }));
            }
            ;
            return console.log(`${this.client.util.date.getLocalTime()} | [ Listener Handler ] Loaded ${(0, fs_1.readdirSync)(this.directory).length} listener event(s)`);
        }
        catch (error) {
            return console.log(`${this.client.util.date.getLocalTime()} | [ Listener Handler ] ${error.stack}`);
        }
        ;
    }
    ;
}
exports.ListenerHandler = ListenerHandler;
;
