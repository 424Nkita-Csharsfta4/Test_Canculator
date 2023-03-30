"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
var Circle = /** @class */ (function () {
    function Circle(radius) {
        this.radius = radius;
        this.type = 'circle';
    }
    //Mетод getArea из интерфейса Figure
    Circle.prototype.getArea = function () {
        // Возвращаем площадь круга по формуле
        return Math.PI * Math.pow(this.radius, 2);
    };
    //Mетод getPerimeter из интерфейса Figure
    Circle.prototype.getPerimeter = function () {
        // Возвращаем периметр круга по формуле
        return 2 * Math.PI * this.radius;
    };
    return Circle;
}());
exports.Circle = Circle;
