import { ClientEvents, ClientOptions as _ClientOptions, Interaction } from "discord.js";
import { Prisma } from "@prisma/client";

export type ArgumentType = "user" | "channel" | "boolean" | "integer" | "mentionable" | "number" | "role" | "string";
export type ClientOptions = Omit<_ClientOptions, "intents" | "messageCacheLifetime" | "messageSweepInterval" | "waitGuildTimeout">;
export type ClientPlatform = "Desktop" | "Mobile" | "Browser";
export type MessageComponentCollectorFilter = (interaction: Interaction) => boolean;
export type CommandChannel = "guild";
export type ConfigOptionsSymbol = "database" | "commandHandler" | "inhibitorHandler" | "listenerHandler" | "routeOptions" | "owners" | "release" | "token" | "version";
export type InhibitorCategory = ListenerCategory;
export type HandlerListener = "error" | "ready" | "register" | "load" | "unregister";
export type ListenerCategory = ListenerEmitter;
export type ListenerEmitter = "client" | "process" | "commandHandler" | "inhibitorHandler";
export type ListenerName = keyof ClientEvents | HandlerListener | NodeJS.Signals | ProcessListener;
export type MemberAcknowledgements = "None" | "Server Owner" | "Administrator" | "Department Leader" | "Staff Member" | "Retired Staff" | "Partner" | "Contributor" | "Server Booster";
export type ProcessListener = "beforeExit" | "disconnect" | "exit" | "message" | "multipleResolves" | "rejectionHandled" | "uncaughtException" | "uncaughtExceptionMonitor" | "unhandledRejection" | "warning" | "worker";
export type TagOptions = (Prisma.Without<Prisma.TagCreateInput, Prisma.TagUncheckedCreateInput> & Prisma.TagUncheckedCreateInput) | (Prisma.Without<Prisma.TagUncheckedCreateInput, Prisma.TagCreateInput> & Prisma.TagCreateInput)