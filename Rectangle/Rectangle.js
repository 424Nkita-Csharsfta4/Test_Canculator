"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
var Rectangle = /** @class */ (function () {
    function Rectangle(width, height) {
        this.type = 'rectangle';
        this.Width = width;
        this.Height = height;
    }
    Object.defineProperty(Rectangle.prototype, "width", {
        get: function () {
            return this.Width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "height", {
        get: function () {
            return this.Height;
        },
        enumerable: false,
        configurable: true
    });
    Rectangle.prototype.getArea = function () {
        // возвращаем площадь прямоугольника
        return this.Width * this.Height;
    };
    Rectangle.prototype.getPerimeter = function () {
        //возвращаем периметр прямоугольника
        return 2 * (this.Width + this.Height);
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
