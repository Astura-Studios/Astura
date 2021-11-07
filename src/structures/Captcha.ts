/**
 * @author cheesits456 (quin)
 * @github <https://github.com/HaileyBot/captcha-generator>
 * @npm <https://www.npmjs.com/package/@haileybot/captcha-generator>
**/

import * as Canvas from "canvas";
import { join } from "path";

Canvas.registerFont(join(__dirname, "..", "..", "assets", "Swift.ttf"), {
    family: "swift"
});

const randomText = (): string =>
    Math.random()
        .toString(36)
        .replace(/[^a-z]|[gkqr]+/gi, "")
        .substring(0, 6)
        .toUpperCase(),
    shuffleArray = (arr: number[]): number[] => {
        let i: number = arr.length,
            temp: number,
            randomIndex: number;

        while (0 !== i) {   
            randomIndex = Math.floor(Math.random() * i);
            i -= 1;
            temp = arr[i];
            arr[i] = arr[randomIndex];
            arr[randomIndex] = temp;
        };

        return arr;
    };

export class Captcha {
    private _canvas: Canvas.Canvas;
    private _value: string;

    constructor(_h: number = 250) {
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

        const coords: number[][] = [];

        for (let i = 0; i < 4; i++) {
            if (!coords[i]) coords[i] = [];
            for (let j = 0; j < 5; j++) coords[i][j] = Math.round(Math.random() * 80) + j * 80;
            if (!(i % 2)) coords[i] = shuffleArray(coords[i]);
        };

        for (let i = 0; i < coords.length; i++) {
            if (!(i % 2)) {
                for (let j = 0; j < coords[i].length; j++) {
                    if (!i) {
                        ctx.moveTo(coords[i][j], 0);
                        ctx.lineTo(coords[i + 1][j], 400);
                    } else {
                        ctx.moveTo(0, coords[i][j]);
                        ctx.lineTo(400, coords[i + 1][j]);
                    };
                };
            };
        };

        ctx.stroke();

        ctx.fillStyle = "#000";
        ctx.lineWidth = 0;

        for (let i = 0; i < 200; i++) {
            ctx.beginPath();
            ctx.arc(
                Math.round(Math.random() * 360) + 20, 
                Math.round(Math.random() * 360) + 20, 
                Math.round(Math.random() * 7) + 1, 
                0,
                Math.PI * 2 
            );

            ctx.fill();
        };

        ctx.font = "bold 90px swift";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.translate(0, _h);
        ctx.translate(
            Math.round(Math.random() * 100 - 50) + 200,
            -1 * Math.round(Math.random() * (_h / 4) - _h / 8) - _h / 2
        );
        ctx.rotate(Math.random() - 0.5);
        ctx.beginPath();
        this._value = "";
        while (this._value.length !== 6) this._value = randomText();
        ctx.fillText(this._value, 0, 0);

        ctx.restore();
        for (let i = 0; i < 5000; i++) {
            ctx.beginPath();
            let color = "#";
            while (color.length < 7) color += Math.round(Math.random() * 16).toString(16);
            color += "a0";
            ctx.fillStyle = color;
            ctx.arc(
                Math.round(Math.random() * 400), 
                Math.round(Math.random() * _h), 
                Math.random() * 2, 
                0, 
                Math.PI * 2 
            );
            ctx.fill();
        };
    };

    get value(): string {
        return this._value;
    };

    get PNGStream(): Canvas.PNGStream {
        return this._canvas.createPNGStream();
    };

    get JPEGStream(): Canvas.JPEGStream {
        return this._canvas.createJPEGStream();
    };

    get dataURL(): string {
        return this._canvas.toDataURL("image/jpeg");
    };
};