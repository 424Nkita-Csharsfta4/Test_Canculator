"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("./main");
var readline_1 = require("readline");
var App = /** @class */ (function () {
    function App(filePath) {
        this.filePath = filePath;
        this.rl = (0, readline_1.createInterface)({
            input: process.stdin,
            output: process.stdout,
        });
        this.calculator = new main_1.ShapeCalculator(filePath);
    }
    App.prototype.Run = function () {
        this.rl.question('Какую бы фигуру вы хотели добавить? (круг, квадрат, треугольник, прямоугольник)\n', this.handleInput.bind(this));
    };
    App.prototype.handleInput = function (shape) {
        var _this = this;
        switch (shape) {
            case 'круг':
                this.rl.question('Введите радиус:\n', function (input) {
                    _this.handleCircleInput(input);
                });
                break;
            case 'квадрат':
                this.rl.question('Введите длину стороны:\n', function (input) { return _this.handleSquareInput(input); });
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
    App.prototype.handleCircleInput = function (input) {
        var radius = Number(input);
        if (isNaN(radius)) {
            console.log('Ошибка: радиус должен быть числом.');
            return;
        }
        this.calculator.addCircle(radius);
        this.printTotalAreaAndShapes();
    };
    App.prototype.handleSquareInput = function (input) {
        var length = Number(input);
        if (isNaN(length)) {
            console.log('Ошибка: длина должна быть числом.');
            return;
        }
        this.calculator.addSquare(length);
        this.printTotalAreaAndShapes();
    };
    App.prototype.handleTriangleInput = function () {
        var _this = this;
        this.rl.question('Укажите длину стороны A:\n', function (a) {
            _this.rl.question('Введите длину стороны B:\n', function (b) {
                _this.rl.question('Укажите длину стороны C:\n', function (c) {
                    _this.calculator.addTriangle(Number(a), Number(b), Number(c));
                    _this.printTotalAreaAndShapes();
                });
            });
        });
    };
    App.prototype.handleRectangleInput = function () {
        var _this = this;
        this.rl.question('Введите длину:\n', function (length) {
            _this.rl.question('Введите ширину:\n', function (width) {
                _this.calculator.addRectangle(Number(length), Number(width));
                _this.printTotalAreaAndShapes();
            });
        });
    };
    App.prototype.printTotalAreaAndShapes = function () {
        var _this = this;
        this.calculator.printAllShapes();
        this.rl.question('Хотите добавить еще фигуру? (да/нет)\n', function (answer) {
            if (answer === 'да') {
                _this.rl.question('Какую бы фигуру вы хотели добавить? (круг, квадрат, треугольник, прямоугольник)\n', _this.handleInput.bind(_this));
            }
            else {
                console.log('Пока!');
                _this.rl.close();
            }
        });
    };
    return App;
}());
var app = new App('./shapes.json');
app.Run();
