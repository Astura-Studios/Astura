/// <reference types="node" />
import { ClientEvents, ClientOptions as _ClientOptions, Interaction } from "discord.js";
import { Prisma } from "@prisma/client";
export declare type ArgumentType = "user" | "channel" | "boolean" | "integer" | "mentionable" | "number" | "role" | "string";
export declare type ClientOptions = Omit<_ClientOptions, "intents" | "messageCacheLifetime" | "messageSweepInterval" | "waitGuildTimeout">;
export declare type ClientPlatform = "Desktop" | "Mobile" | "Browser";
export declare type MessageComponentCollectorFilter = (interaction: Interaction) => boolean;
export declare type CommandChannel = "guild";
export declare type ConfigOptionsSymbol = "database" | "commandHandler" | "inhibitorHandler" | "listenerHandler" | "routeOptions" | "owners" | "release" | "token" | "version";
export declare type InhibitorCategory = ListenerCategory;
export declare type HandlerListener = "error" | "ready" | "register" | "load" | "unregister";
export declare type ListenerCategory = ListenerEmitter;
export declare type ListenerEmitter = "client" | "process" | "commandHandler" | "inhibitorHandler";
export declare type ListenerName = keyof ClientEvents | HandlerListener | NodeJS.Signals | ProcessListener;
export declare type MemberAcknowledgements = "None" | "Server Owner" | "Administrator" | "Department Leader" | "Staff Member" | "Retired Staff" | "Partner" | "Contributor" | "Server Booster";
export declare type ProcessListener = "beforeExit" | "disconnect" | "exit" | "message" | "multipleResolves" | "rejectionHandled" | "uncaughtException" | "uncaughtExceptionMonitor" | "unhandledRejection" | "warning" | "worker";
export declare type TagOptions = (Prisma.Without<Prisma.TagCreateInput, Prisma.TagUncheckedCreateInput> & Prisma.TagUncheckedCreateInput) | (Prisma.Without<Prisma.TagUncheckedCreateInput, Prisma.TagCreateInput> & Prisma.TagCreateInput);
//# sourceMappingURL=types.d.ts.map