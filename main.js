"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeCalculator = void 0;
var fs = require("fs");
var Circle_1 = require("./Circle/Circle");
var Rectangle_1 = require("./Rectangle/Rectangle");
var Square_1 = require("./Square/Square");
var Treangle_1 = require("./Treangle/Treangle");
var ShapeCalculator = /** @class */ (function () {
    /**
     *
     * @param filepath Путь файла из которого будут сохранены и загружены фигуры
     * происходит чтение данных из файла и преобразование их в объекты фигур
     */
    function ShapeCalculator(filepath) {
        this.filepath = filepath;
        /**
         * Свойство содержашие все фигуры виде массива
         */
        this.shapes = [];
        try {
            var data = fs.readFileSync(filepath, 'utf-8');
            this.shapes = JSON.parse(data);
        }
        catch (error) {
            console.log("\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F \u0444\u0430\u0439\u043B\u0430: ".concat(error.message));
        }
    }
    /**
     * Метод для сохранения всех фигур в файл
     * Если происходит ошибка при сохранении, выводится сообщение об ошибке
     */
    ShapeCalculator.prototype.saveShapes = function () {
        fs.writeFile(this.filepath, JSON.stringify(this.shapes), function (err) {
            if (err) {
                console.log("\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0444\u0430\u0439\u043B\u0430: ".concat(err.message));
            }
        });
    };
    /**
     * Добавляет круг в массив фигур и сохраняет данные в файл.
     * Выводит сообщение о добавлении в консоль.
     * @param radius Радиус круга.
    */
    ShapeCalculator.prototype.addCircle = function (radius) {
        var circle = new Circle_1.Circle(radius);
        this.shapes.push(circle);
        this.saveShapes();
        console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D ".concat(circle.type, " \u0441 \u0440\u0430\u0434\u0438\u0443\u0441\u043E\u043C ").concat(radius));
    };
    /**
     * Добавляет квадрат в массив фигур и сохраняет данные в файл.
     *  Выводит сообщение о добавлении в консоль.
     * @param side стороны квадрата
     */
    ShapeCalculator.prototype.addSquare = function (side) {
        var square = new Square_1.Square(side);
        this.shapes.push(square);
        this.saveShapes();
        console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D ".concat(square.type, " \u0441 \u0441\u0442\u043E\u0440\u043E\u043D\u0430 ").concat(side));
    };
    /**
    * Добавляет треугольник в массив фигур и сохраняет данные в файл.
    *  Выводит сообщение о добавлении в консоль.
    * @param 3 стороны треугольник
    */
    ShapeCalculator.prototype.addTriangle = function (a, b, c) {
        var triangle = new Treangle_1.Triangle(a, b, c);
        this.shapes.push(triangle);
        this.saveShapes();
        console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D ".concat(triangle.type, " \u0441 \u0441\u0442\u043E\u0440\u043E\u043D\u0430 ").concat(a, ", ").concat(b, ", ").concat(c));
    };
    /**
     * Добавляет прямоугольник в массив фигур и сохраняет данные в файл.
     *  Выводит сообщение о добавлении в консоль.
     * @param 3 стороны прямоугольник
     */
    ShapeCalculator.prototype.addRectangle = function (width, height) {
        var rectangle = new Rectangle_1.Rectangle(width, height);
        this.shapes.push(rectangle);
        this.saveShapes();
        console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D ".concat(rectangle.type, " \u0441 ").concat(width, " \u0438 \u0432\u044B\u0441\u043E\u0442\u0430 ").concat(height));
    };
    /**
      * Метод для вывода информации о всех фигурах в консоль
      */
    ShapeCalculator.prototype.printAllShapes = function () {
        this.shapes.forEach(function (shape) {
            console.log("\u0422\u0438\u043F: ".concat(shape.type));
            console.log("\u041F\u043B\u043E\u0449\u0430\u0434\u044C: ".concat(shape.getArea()));
            console.log("\u041F\u0435\u0440\u0438\u043C\u0435\u0442\u0440: ".concat(shape.getPerimeter()));
            console.log('------------------------');
        });
    };
    /**
     *
     * @returns вычисления общей площади всех фигур
     */
    ShapeCalculator.prototype.getTotalArea = function () {
        return this.shapes.reduce(function (acc, shape) { return acc + shape.getArea(); }, 0);
    };
    return ShapeCalculator;
}());
exports.ShapeCalculator = ShapeCalculator;
