"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = void 0;
/**
 * * Наследуемся с Figure
 */
var Square = /** @class */ (function () {
    function Square(perimets) {
        this.perimetr = perimets;
    }
    Square.prototype.getNames = function () {
        return "Квадрат";
    };
    Square.prototype.getPerimetr = function () {
        return 4 * this.perimetr;
    };
    Square.prototype.getRadius = function () {
        return Math.pow(this.perimetr, 2);
    };
    Square.prototype.NowSide = function (perimetr) {
        this.perimetr = perimetr;
    };
    return Square;
}());
exports.Square = Square;
