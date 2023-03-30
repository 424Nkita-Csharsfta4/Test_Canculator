"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
var Rectangle = /** @class */ (function () {
    function Rectangle(width, height) {
        this.width = width;
        this.height = height;
        this.type = 'rectangle';
    }
    Rectangle.prototype.getArea = function () {
        // возвращаем площадь прямоугольника
        return this.width * this.height;
    };
    Rectangle.prototype.getPerimeter = function () {
        //возвращаем периметр прямоугольника
        return 2 * (this.width + this.height);
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
