"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
/**
 * * Наследуемся через Figure
 */
var Circle = /** @class */ (function () {
    /**
     * *Конструктор класса принимает аргумент radius
     */
    function Circle(radius) {
        this.radius = radius;
    }
    /**
     * *Метод с возвратом имени фигуры
     */
    Circle.prototype.getNames = function () {
        return "Круг";
    };
    /**
     * * Метод с возвратом периметра
     */
    Circle.prototype.getPerimetr = function () {
        return 2 * Math.PI * this.radius;
    };
    Circle.prototype.getType = function () {
        return "Circle";
    };
    /**
     * *Возврат площяди
     */
    Circle.prototype.getRadius = function () {
        return Math.PI * Math.pow(this.radius, 2);
    };
    /**
     * *
     */
    Circle.prototype.NowRadius = function (radius) {
        this.radius = radius;
    };
    return Circle;
}());
exports.Circle = Circle;
