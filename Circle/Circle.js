"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
var Circle = /** @class */ (function () {
    function Circle(radius) {
        this.type = 'circle';
        this.Radiuse = radius;
    }
    Object.defineProperty(Circle.prototype, "radius", {
        get: function () {
            return this.Radiuse;
        },
        enumerable: false,
        configurable: true
    });
    //Mетод getArea из интерфейса Figure
    Circle.prototype.getArea = function () {
        // Возвращаем площадь круга по формуле
        return Math.PI * Math.pow(this.Radiuse, 2);
    };
    //Mетод getPerimeter из интерфейса Figure
    Circle.prototype.getPerimeter = function () {
        // Возвращаем периметр круга по формуле
        return 2 * Math.PI * this.Radiuse;
    };
    return Circle;
}());
exports.Circle = Circle;
