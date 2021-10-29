"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Markdown = void 0;
const builders_1 = require("@discordjs/builders");
class Markdown {
    bold(text) {
        return (0, builders_1.bold)(text);
    }
    ;
    italic(text) {
        return (0, builders_1.italic)(text);
    }
    ;
    strikeThrough(text) {
        return (0, builders_1.strikethrough)(text);
    }
    ;
    underscore(text) {
        return (0, builders_1.underscore)(text);
    }
    ;
    spoiler(text) {
        return (0, builders_1.spoiler)(text);
    }
    ;
    quote(text) {
        return (0, builders_1.quote)(text);
    }
    ;
    blockQuote(text) {
        return (0, builders_1.blockQuote)(text);
    }
    ;
    hyperlink(text, link, removeEmbed) {
        return removeEmbed ? (0, builders_1.hyperlink)(text, link) : (0, builders_1.hideLinkEmbed)(link);
    }
    ;
    inlineCode(text) {
        return (0, builders_1.inlineCode)(text);
    }
    ;
    codeBlock(text) {
        return (0, builders_1.codeBlock)(text);
    }
    ;
    languageCodeBlock(text, language) {
        return (0, builders_1.codeBlock)(language, text);
    }
    ;
    timestamp() {
        return (0, builders_1.time)(new Date());
    }
    ;
    userMention(id) {
        return (0, builders_1.userMention)(id);
    }
    ;
    memberNicknameMention(id) {
        return (0, builders_1.memberNicknameMention)(id);
    }
    ;
    channelMention(id) {
        return (0, builders_1.channelMention)(id);
    }
    ;
    roleMention(id) {
        return (0, builders_1.roleMention)(id);
    }
    ;
}
exports.Markdown = Markdown;
;
