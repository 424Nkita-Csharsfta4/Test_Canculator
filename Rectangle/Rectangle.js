"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
/**
 * @param Rectangle экспортируем и реализует интерфейс
 * в этом классе находится логика фигуры
 */
var Rectangle = /** @class */ (function () {
    /**
     * Конструктор принимает ширину и высоту прямоугольника
     *
     * @param width ширина треугольника
     * @param height высота треугольника
     */
    function Rectangle(width, height) {
        /**
         * Тип фигуры - треугольник
         */
        this.type = 'rectangle';
        this.Width = width;
        this.Height = height;
    }
    Object.defineProperty(Rectangle.prototype, "width", {
        /**
         * Геттеры для получения ширины и высоты
         */
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
    * Метод getArea из интерфейса Figure
    */
    Rectangle.prototype.getArea = function () {
        // возвращаем площадь прямоугольника
        return this.Width * this.Height;
    };
    /**
    * Метод getPerimeter из интерфейса Figure
    */
    Rectangle.prototype.getPerimeter = function () {
        //возвращаем периметр прямоугольника
        return 2 * (this.Width + this.Height);
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
