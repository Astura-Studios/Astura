"use strict";
/**
 * @author cheesits456 (quin)
 * @github <https://github.com/HaileyBot/captcha-generator>
 * @npm <https://www.npmjs.com/package/@haileybot/captcha-generator>
**/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Captcha = void 0;
const Canvas = __importStar(require("canvas"));
const path_1 = require("path");
Canvas.registerFont((0, path_1.join)(__dirname, "..", "..", "assets", "Swift.ttf"), {
    family: "swift"
});
const randomText = () => Math.random()
    .toString(36)
    .replace(/[^a-z]|[gkqr]+/gi, "")
    .substring(0, 6)
    .toUpperCase(), shuffleArray = (arr) => {
    let i = arr.length, temp, randomIndex;
    while (0 !== i) {
        randomIndex = Math.floor(Math.random() * i);
        i -= 1;
        temp = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = temp;
    }
    ;
    return arr;
};
class Captcha {
    constructor(_h = 250) {
        _h = typeof _h !== "number" || _h < 250 ? 250 : _h > 400 ? 400 : _h;
        this._canvas = Canvas.createCanvas(400, _h);
        const ctx = this._canvas.getContext("2d");
        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.fillRect(0, 0, 400, _h);
        ctx.save();
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 4;
        ctx.beginPath();
        const coords = [];
        for (let i = 0; i < 4; i++) {
            if (!coords[i])
                coords[i] = [];
            for (let j = 0; j < 5; j++)
                coords[i][j] = Math.round(Math.random() * 80) + j * 80;
            if (!(i % 2))
                coords[i] = shuffleArray(coords[i]);
        }
        ;
        for (let i = 0; i < coords.length; i++) {
            if (!(i % 2)) {
                for (let j = 0; j < coords[i].length; j++) {
                    if (!i) {
                        ctx.moveTo(coords[i][j], 0);
                        ctx.lineTo(coords[i + 1][j], 400);
                    }
                    else {
                        ctx.moveTo(0, coords[i][j]);
                        ctx.lineTo(400, coords[i + 1][j]);
                    }
                    ;
                }
                ;
            }
            ;
        }
        ;
        ctx.stroke();
        ctx.fillStyle = "#000";
        ctx.lineWidth = 0;
        for (let i = 0; i < 200; i++) {
            ctx.beginPath();
            ctx.arc(Math.round(Math.random() * 360) + 20, Math.round(Math.random() * 360) + 20, Math.round(Math.random() * 7) + 1, 0, Math.PI * 2);
            ctx.fill();
        }
        ;
        ctx.font = "bold 90px swift";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.translate(0, _h);
        ctx.translate(Math.round(Math.random() * 100 - 50) + 200, -1 * Math.round(Math.random() * (_h / 4) - _h / 8) - _h / 2);
        ctx.rotate(Math.random() - 0.5);
        ctx.beginPath();
        this._value = "";
        while (this._value.length !== 6)
            this._value = randomText();
        ctx.fillText(this._value, 0, 0);
        ctx.restore();
        for (let i = 0; i < 5000; i++) {
            ctx.beginPath();
            let color = "#";
            while (color.length < 7)
                color += Math.round(Math.random() * 16).toString(16);
            color += "a0";
            ctx.fillStyle = color;
            ctx.arc(Math.round(Math.random() * 400), Math.round(Math.random() * _h), Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
        }
        ;
    }
    ;
    get value() {
        return this._value;
    }
    ;
    get PNGStream() {
        return this._canvas.createPNGStream();
    }
    ;
    get JPEGStream() {
        return this._canvas.createJPEGStream();
    }
    ;
    get dataURL() {
        return this._canvas.toDataURL("image/jpeg");
    }
    ;
}
exports.Captcha = Captcha;
;
