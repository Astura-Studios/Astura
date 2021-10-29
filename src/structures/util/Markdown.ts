import { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, hyperlink, hideLinkEmbed, inlineCode, codeBlock, time, userMention, memberNicknameMention, channelMention, roleMention } from "@discordjs/builders";
import { MarkdownLanguage } from "./Types";

export class Markdown {
    public bold(text: string): string {
        return bold(text);
    };

    public italic(text: string): string {
        return italic(text);
    };

    public strikeThrough(text: string): string {
        return strikethrough(text);
    };

    public underscore(text: string): string {
        return underscore(text);
    };

    public spoiler(text: string): string {
        return spoiler(text);
    };

    public quote(text: string): string {
        return quote(text);
    };

    public blockQuote(text: string): string {
        return blockQuote(text);
    };

    public hyperlink(text: string, link: string, removeEmbed: boolean): `<${string}>` | `[${string}](${string})` {
        return removeEmbed ? hyperlink(text, link) : hideLinkEmbed(link);
    };

    public inlineCode(text: string): string {
        return inlineCode(text);
    };

    public codeBlock(text: string): string {
        return codeBlock(text);
    };

    public languageCodeBlock(text: string, language: MarkdownLanguage): string {
        return codeBlock(language, text);
    };

    public timestamp(): string {
        return time(new Date());
    };

    public userMention(id: string): string {
        return userMention(id);
    };

    public memberNicknameMention(id: string): string {
        return memberNicknameMention(id);
    };

    public channelMention(id: string): string {
        return channelMention(id);
    };

    public roleMention(id: string): string {
        return roleMention(id);
    };
};