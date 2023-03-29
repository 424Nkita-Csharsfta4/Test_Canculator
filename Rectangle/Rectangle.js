"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reactangle = void 0;
var Reactangle = /** @class */ (function () {
    function Reactangle(Width, Height) {
        this.Width = Width;
        this.Height = Height;
    }
    Reactangle.prototype.getNames = function () {
        return "Прямоугльник";
    };
    Reactangle.prototype.getPerimetr = function () {
        return 2 * (this.Width + this.Height);
    };
    Reactangle.prototype.getRadius = function () {
        return this.Width + this.Height;
    };
    Reactangle.prototype.NowSize = function (Width, Height) {
        this.Width = Width;
        this.Height = Height;
    };
    return Reactangle;
}());
exports.Reactangle = Reactangle;
