"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
/**
 * Класс Circle экспортируем и реализует интерфейс
 * в этом классе находится логика фигуры
 */
var Circle = /** @class */ (function () {
    function Circle(radius) {
        this.type = 'circle'; // Тип фигуры - круг
        this.Radiuse = radius;
    }
    Object.defineProperty(Circle.prototype, "radius", {
        // Геттер для получения радиуса круга
        get: function () {
            return this.Radiuse;
        },
        enumerable: false,
        configurable: true
    });
    /**
      * Метод для вычисления площади круга
      * @returns Площадь круга по формуле Math.PI * radius^2
      */
    Circle.prototype.getArea = function () {
        return Math.PI * this.radius * this.radius;
    };
    /**
    * Метод для вычисления периметра круга
    * @returns Периметр круга по формуле 2 * Math.PI * radius
    */
    Circle.prototype.getPerimeter = function () {
        // Возвращаем периметр круга по формуле
        return 2 * Math.PI * this.Radiuse;
    };
    return Circle;
}());
exports.Circle = Circle;
