"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
var Rectangle = /** @class */ (function () {
    // Конструктор принимает ширину и высоту прямоугольника
    function Rectangle(width, height) {
        this.type = 'rectangle'; // Тип фигуры - треугольник
        this.Width = width;
        this.Height = height;
    }
    Object.defineProperty(Rectangle.prototype, "width", {
        // Геттеры для получения ширины и высоты
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
    /**
    *
    * @returns Метод getArea из интерфейса Figure
    */
    Rectangle.prototype.getArea = function () {
        // возвращаем площадь прямоугольника
        return this.Width * this.Height;
    };
    /**
    *
    * @returns Метод getPerimeter из интерфейса Figure
    */
    Rectangle.prototype.getPerimeter = function () {
        //возвращаем периметр прямоугольника
        return 2 * (this.Width + this.Height);
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
