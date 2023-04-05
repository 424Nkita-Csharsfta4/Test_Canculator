"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = void 0;
/**
 * @param Square экспортируем и реализует интерфейс
 * в этом классе находится логика фигуры
 */
var Square = /** @class */ (function () {
    /**
     * конструктор класса принимает на вход значение длины стороны квадрата
     */
    function Square(side) {
        this.side = side;
        /**
         * Тип фигуры - Квадрат
         */
        this.type = 'square';
    }
    /**
     *  Метод getArea из интерфейса Figure, возвращает площадь квадрата
     */
    Square.prototype.getArea = function () {
        // получениe площади квадрата
        return Math.pow(this.side, 2);
    };
    /**
    *  Метод getPerimeter из интерфейса Figure, возвращает периметр квадрата
    */
    Square.prototype.getPerimeter = function () {
        //получениe периметра квадрата
        return 4 * this.side;
    };
    return Square;
}());
exports.Square = Square;
