"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleInterface = void 0;
var main_1 = require("./main");
var readline_1 = require("readline");
/**
 * * Главный класс где происходит вычесление площади различных геометрических фигур
 */
var ConsoleInterface = /** @class */ (function () {
    function ConsoleInterface(filePath) {
        this.filePath = filePath;
        // readline интерфейс
        this.rl = (0, readline_1.createInterface)({
            input: process.stdin,
            output: process.stdout,
        });
        //объект класса ShapeCalculator
        this.calculator = new main_1.ShapeCalculator(filePath);
    }
    /**
     *  @returns* позволяет пользователю добавлять геометрические фигуры
     *  (круг, квадрат, треугольник, прямоугольник) и вычислять общую площадь всех фигур
     */
    ConsoleInterface.prototype.start = function () {
        this.rl.question('Какую бы фигуру вы хотели добавить? (круг, квадрат, треугольник, прямоугольник)\n', 
        // привязываем контекст метода handleInput() к класса ConsoleInterface
        this.handleInput.bind(this));
    };
    /**
     * @param Обрабатываем ввод пользователя и вызываем соответствующий метод
     *
     */
    ConsoleInterface.prototype.handleInput = function (shape) {
        switch (shape) {
            case 'круг':
                this.handleCircleInput();
                break;
            case 'квадрат':
                this.handleSquareInput();
                break;
            case 'треугольник':
                this.handleTriangleInput();
                break;
            case 'прямоугольник':
                this.handleRectangleInput();
                break;
            default:
                console.log('Введена недопустимая величина.');
                this.rl.close();
        }
    };
    /**
     * @param Метод для вводa Кругa
     */
    ConsoleInterface.prototype.handleCircleInput = function () {
        var _this = this;
        // Запрашиваем у пользователя радиус круга
        this.rl.question('Введите радиус:\n', function (radius) {
            // вызываем метод addCircle() объекта ShapeCalculator, передавая в него радиус
            _this.calculator.addCircle(Number(radius));
            _this.printTotalAreaAndShapes();
        });
    };
    /**
     * @param Метод для вводa Квадрата
     */
    ConsoleInterface.prototype.handleSquareInput = function () {
        var _this = this;
        // Запрашиваем у пользователя длину квадрата
        this.rl.question('Введите длину стороны:\n', function (length) {
            // вызываем метод addSquare() объекта ShapeCalculator, передавая в него длину  
            _this.calculator.addSquare(Number(length));
            _this.printTotalAreaAndShapes();
        });
    };
    /**
     * @param Метод для вводa Треугольникa
     */
    ConsoleInterface.prototype.handleTriangleInput = function () {
        var _this = this;
        // Запрашиваем у пользователя длину треугольника
        this.rl.question('Укажите длину стороны A:\n', function (a) {
            // Запрашиваем у пользователя длину треугольника
            _this.rl.question('Введите длину стороны B:\n', function (b) {
                // Запрашиваем у пользователя длину треугольника
                _this.rl.question('Укажите длину стороны C:\n', function (c) {
                    // вызываем метод addTriangle() объекта ShapeCalculator, передавая длину
                    _this.calculator.addTriangle(Number(a), Number(b), Number(c));
                    _this.printTotalAreaAndShapes();
                });
            });
        });
    };
    /**
     * @param Метод для вводa Прямоугольникa
     */
    ConsoleInterface.prototype.handleRectangleInput = function () {
        var _this = this;
        // Запрашиваем у пользователя длину прямоугольника
        this.rl.question('Введите длину:\n', function (length) {
            // Запрашиваем у пользователя длину прямоугольника
            _this.rl.question('Введите ширину:\n', function (width) {
                // вызываем метод addRectangle() объекта ShapeCalculator, передавая длину
                _this.calculator.addRectangle(Number(length), Number(width));
                _this.printTotalAreaAndShapes();
            });
        });
    };
    /**
     *  @param Метод для вывода общей площади всех фигур
     */
    ConsoleInterface.prototype.printTotalAreaAndShapes = function () {
        // выводим общую площадь всех фигур
        this.calculator.printAllShapes();
        console.log("\u041E\u0431\u0449\u0430\u044F \u043F\u043B\u043E\u0449\u0430\u0434\u044C: ".concat(this.calculator.getTotalArea()));
        this.rl.close();
    };
    return ConsoleInterface;
}());
exports.ConsoleInterface = ConsoleInterface;
