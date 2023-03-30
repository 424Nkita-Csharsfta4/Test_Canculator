"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = void 0;
var Square = /** @class */ (function () {
    function Square(side) {
        this.side = side;
        this.type = 'square';
    }
    Square.prototype.getArea = function () {
        // получениe площади квадрата
        return Math.pow(this.side, 2);
    };
    Square.prototype.getPerimeter = function () {
        //получениe периметра квадрата
        return 4 * this.side;
    };
    return Square;
}());
exports.Square = Square;
