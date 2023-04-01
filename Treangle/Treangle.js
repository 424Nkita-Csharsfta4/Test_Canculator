"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
var Triangle = /** @class */ (function () {
    //конструктор, который принимает три аргумента для сторон треугольника (a, b и c)
    function Triangle(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.type = 'triangle'; // Тип фигуры - треугольник
    }
    /**
     *
     * @returns Метод для вычисления площади треугольника
     */
    Triangle.prototype.getArea = function () {
        /**
         * площадь треугольника с помощью формулы Герона
         */
        var s = (this.a + this.b + this.c) / 2;
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    };
    /**
     *
     * @returns Метод для вычисления периметра треугольника
     */
    Triangle.prototype.getPerimeter = function () {
        //периметр треугольника, складывая длины всех его сторон
        return this.a + this.b + this.c;
    };
    return Triangle;
}());
exports.Triangle = Triangle;
