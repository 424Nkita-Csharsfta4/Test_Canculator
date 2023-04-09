"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("./main");
var readline_1 = require("readline");
/**
 * Класс App, принимающий путь к файлу JSON для сохранения данных о добавленных фигурах.
 */
var App = /** @class */ (function () {
    function App(filePath) {
        this.filePath = filePath;
        this.rl = (0, readline_1.createInterface)({
            input: process.stdin,
            output: process.stdout,
        });
        this.calculator = new main_1.ShapeCalculator(filePath);
        this.handleCircleInput = this.handleCircleInput.bind(this);
    }
    App.prototype.run = function () {
        var _this = this;
        var askForShape = function () {
            _this.rl.question('Какую бы фигуру вы хотели добавить?\n (1) круг, \n 2) квадрат,\n  3) треугольник,\n  4) прямоугольник,\n  5) вся площадь и количество фигур)\n', _this.handleInput.bind(_this));
        };
        askForShape();
        // Запуск цикла, чтобы пользователь мог продолжать добавлять фигуры
        this.rl.on('close', function () {
            console.log('До свидания!');
            process.exit(0);
        });
        this.rl.on('line', function () {
            askForShape();
        });
    };
    App.prototype.printTotalAreaAndShapes = function () {
        var totalArea = this.calculator.calculateTotalArea();
        var totalShapes = this.calculator.getTotalShapesCount();
        console.log("\u041E\u0431\u0449\u0430\u044F \u043F\u043B\u043E\u0449\u0430\u0434\u044C \u0432\u0441\u0435\u0445 \u0444\u0438\u0433\u0443\u0440: ".concat(totalArea));
        console.log("\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0444\u0438\u0433\u0443\u0440: ".concat(totalShapes));
    };
    App.prototype.handleInput = function (shape) {
        var _this = this;
        switch (shape) {
            case '1':
                this.rl.question('Введите радиус:\n', this.handleCircleInput);
                break;
            case '2':
                this.rl.question('Введите длину стороны:\n', function (input) { return _this.handleSquareInput(input); });
                break;
            case '3':
                this.handleTriangleInput();
                break;
            case '4':
                this.handleRectangleInput();
                break;
            case '5':
                this.printTotalAreaAndShapes();
                break;
            default:
                console.log('Введена недопустимая величина.');
                break;
        }
    };
    App.prototype.handleCircleInput = function (input) {
        var radius = Number(input);
        if (isNaN(radius)) {
            console.log('Ошибка: радиус должен быть числом.');
            this.rl.prompt();
            return;
        }
        this.calculator.addCircle(radius);
        this.rl.prompt();
    };
    App.prototype.handleSquareInput = function (input) {
        var length = Number(input);
        if (isNaN(length)) {
            console.log('Ошибка: длина должна быть числом.');
            this.rl.prompt();
            return;
        }
        this.calculator.addSquare(length);
        this.rl.prompt();
    };
    App.prototype.handleTriangleInput = function () {
        var _this = this;
        var onInputReceived = function (input) {
            var _a = input.split(',').map(Number), a = _a[0], b = _a[1], c = _a[2];
            _this.calculator.addTriangle(a, b, c);
            _this.rl.prompt();
        };
        this.rl.question('Введите длины сторон треугольника, разделенные точкой с запятой (например, 5,7,8):\n', onInputReceived);
    };
    App.prototype.handleRectangleInput = function () {
        var _this = this;
        var onLengthAndWidthReceived = function (input) {
            var _a = input.split(',').map(Number), length = _a[0], width = _a[1];
            _this.calculator.addRectangle(length, width);
            _this.rl.prompt();
        };
        this.rl.question('Введите длину и ширину прямоугольника, разделенные точкой с запятой (например, 5,7):\n', onLengthAndWidthReceived);
    };
    return App;
}());
// Создание экземпляра приложения
var app = new App('./shapes.json');
// Запуск приложения
app.run();
