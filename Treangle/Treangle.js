"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
var Triangle = /** @class */ (function () {
    function Triangle(base, height, sideC) {
        this.base = base;
        this.height = height;
        this.sideC = sideC;
    }
    Triangle.prototype.getNames = function () {
        return "Треугольник";
    };
    Triangle.prototype.getPerimetr = function () {
        return this.base + this.sideC + this.height;
    };
    Triangle.prototype.getRadius = function () {
        return (this.base * this.height * this.sideC) / (4 * this.getArea());
    };
    Triangle.prototype.NowSize = function (base, height, sideC) {
        this.base = base;
        this.height = height;
        this.sideC = sideC;
    };
    Triangle.prototype.getArea = function () {
        return 0.5 * this.base * this.height;
    };
    return Triangle;
}());
exports.Triangle = Triangle;
