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
exports.Command = void 0;
const Error_1 = require("../extensions/Error");
const builders_1 = require("@discordjs/builders");
class Command extends builders_1.SlashCommandBuilder {
    constructor(id, options) {
        super();
        this.aliases = options.aliases;
        this.arguments = options.arguments;
        this.category = options.category;
        this.channel = options.channel;
        this.cooldown = options.cooldown;
        this.description = options.description;
        this.enabledByDefault = options.enabledByDefault;
        this.examples = options.examples;
        this.exceptions = options.exceptions;
        this.id = id;
        this.isSubCommand = options.isSubCommand;
        this.permissions = options.permissions;
        this.ownerOnly = options.ownerOnly;
        this.subCommands = options.subCommands;
        this.usage = options.usage;
        this.setName(this.id);
        this.setDescription(this.description);
        this.setDefaultPermission(this.enabledByDefault);
        if (this.arguments)
            this.arguments.forEach(argument => {
                switch (argument.type) {
                    case "boolean":
                        this.addBooleanOption(option => option
                            .setName(argument.name)
                            .setDescription(argument.description)
                            .setRequired(argument.required));
                        break;
                    case "channel":
                        this.addChannelOption(option => option
                            .setName(argument.name)
                            .setDescription(argument.description)
                            .setRequired(argument.required));
                        break;
                    case "integer":
                        this.addIntegerOption(option => option
                            .setName(argument.name)
                            .setDescription(argument.description)
                            .setRequired(argument.required));
                        break;
                    case "mentionable":
                        this.addMentionableOption(option => option
                            .setName(argument.name)
                            .setDescription(argument.description)
                            .setRequired(argument.required));
                        break;
                    case "number":
                        this.addNumberOption(option => option
                            .setName(argument.name)
                            .setDescription(argument.description)
                            .setRequired(argument.required));
                        break;
                    case "role":
                        this.addRoleOption(option => option
                            .setName(argument.name)
                            .setDescription(argument.description)
                            .setRequired(argument.required));
                        break;
                    case "string":
                        if (argument.choices) {
                            const choices = [];
                            argument.choices.forEach(choice => {
                                return [choice.name, choice.value];
                            });
                            this.addStringOption(option => option
                                .setName(argument.name)
                                .setDescription(argument.description)
                                .setRequired(argument.required)
                                .addChoices(choices));
                        }
                        else {
                            this.addStringOption(option => option
                                .setName(argument.name)
                                .setDescription(argument.description)
                                .setRequired(argument.required));
                        }
                        ;
                        break;
                    case "user":
                        this.addUserOption(option => option
                            .setName(argument.name)
                            .setDescription(argument.description)
                            .setRequired(argument.required));
                        break;
                }
                ;
            });
        if (this.subCommands)
            this.subCommands.forEach(command => {
                this.addSubcommand(subcommand => subcommand
                    .setName(command.id)
                    .setDescription(command.description));
            });
    }
    ;
    exec(_client, _interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error_1.ExtendedError("NOT_IMPLEMENTED", _client, this.constructor.name, this.exec.name);
        });
    }
    ;
}
exports.Command = Command;
;
