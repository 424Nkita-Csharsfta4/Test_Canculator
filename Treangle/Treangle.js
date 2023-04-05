"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
/**
 * @param Triangle экспортируем и реализует интерфейс
 * в этом классе находится логика фигуры
 */
var Triangle = /** @class */ (function () {
    /**
     * конструктор, который принимает три аргумента для сторон треугольника
     *
     * @param a сторона
     * @param b сторона
     * @param c сторона
     */
    function Triangle(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        /**
         * Тип фигуры - треугольник
         */
        this.type = 'triangle';
    }
    /**
     * Метод для вычисления площади треугольника
     */
    Triangle.prototype.getArea = function () {
        /**
         * площадь треугольника с помощью формулы Герона
         */
        var s = (this.a + this.b + this.c) / 2;
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    };
    /**
     *  Метод для вычисления периметра треугольника
     */
    Triangle.prototype.getPerimeter = function () {
        //периметр треугольника, складывая длины всех его сторон
        return this.a + this.b + this.c;
    };
    return Triangle;
}());
exports.Triangle = Triangle;
