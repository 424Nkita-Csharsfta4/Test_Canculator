"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("./main");
var readline_1 = require("readline");
/**
 * класса App, принимающий путь к файлу JSON для сохранения данных о добавленных фигурах.
 */
var App = /** @class */ (function () {
    function App(filePath) {
        this.filePath = filePath;
        /**
         *Создание экземпляра интерфейса для взаимодействия с пользователем
         */
        this.rl = (0, readline_1.createInterface)({
            input: process.stdin,
            output: process.stdout,
        });
        /**
         *  Создание экземпляра класса ShapeCalculator
         */
        this.calculator = new main_1.ShapeCalculator(filePath);
    }
    /**
    *  метод, который запускает программу
    */
    App.prototype.Run = function () {
        /**
         * Запрос на ввод пользователем фигуры
         */
        this.rl.question('Какую бы фигуру вы хотели добавить? (круг, квадрат, треугольник, прямоугольник)\n', this.handleInput.bind(this));
    };
    /**
     * Обработка ввода пользователем фигуры
     */
    App.prototype.handleInput = function (shape) {
        var _this = this;
        switch (shape) {
            case 'круг':
                /**
                 * Запрос на ввод пользователем радиуса
                 */
                this.rl.question('Введите радиус:\n', this.handleCircleInput);
                break;
            /**
             * Запрос на ввод пользователем радиуса
             */
            case 'квадрат':
                this.rl.question('Введите длину стороны:\n', function (input) { return _this.handleSquareInput(input); });
                break;
            case 'треугольник':
                /**
                 *  Запрос на ввод пользователем длин сторон треугольника
                 */
                this.handleTriangleInput();
                break;
            case 'прямоугольник':
                /**
                 *  Запрос на ввод пользователем длины и ширины прямоугольника
                 */
                this.handleRectangleInput();
                break;
            default:
                console.log('Введена недопустимая величина.');
                this.rl.close();
        }
    };
    /**
     *  Обработка ввода пользователем радиуса круга
     */
    App.prototype.handleCircleInput = function (input) {
        var radius = Number(input);
        if (isNaN(radius)) {
            console.log('Ошибка: радиус должен быть числом.');
            return;
        }
        /**
         *  Добавление круга в список фигур и вывод общей площади всех фигур
         */
        this.calculator.addCircle(radius);
        this.printTotalAreaAndShapes();
    };
    /**
     *  Приватный метод, обрабатывающий ввод пользователя для квадрата
     */
    App.prototype.handleSquareInput = function (input) {
        /**
         * Преобразует ввод пользователя в число
         */
        var length = Number(input);
        /**
         * Проверяет, является ли введенное
         */
        if (isNaN(length)) {
            console.log('Ошибка: длина должна быть числом.');
            return;
        }
        /**
         * Добавляет квадрат в список фигур, рассчитывает и выводит общую площадь фигур
         */
        this.calculator.addSquare(length);
        this.printTotalAreaAndShapes();
    };
    /**
     * Приватный метод, обрабатывающий ввод пользователя для треугольника
     */
    App.prototype.handleTriangleInput = function () {
        var _this = this;
        /**
         * Запрашиваем у пользователя стороны треугольника
         */
        this.rl.question('Введите длины сторон треугольника, разделенные точкой с запятой (например, 5;7;8):\n', function (input) {
            var _a = input.split(';'), a = _a[0], b = _a[1], c = _a[2];
            /**
             * Добавляет треугольник в список фигур, рассчитывает и выводит общую площадь фигур
             */
            _this.calculator.addTriangle(Number(a), Number(b), Number(c));
            _this.printTotalAreaAndShapes();
        });
    };
    /**
     * ввод пользователя для прямоугольника
     */
    App.prototype.handleRectangleInput = function () {
        var _this = this;
        /**
         *  Запрашивает у пользователя ввод длин сторон прямоугольника
         */
        this.rl.question('Введите длину:\n', function (length) {
            _this.rl.question('Введите ширину:\n', function (width) {
                /**
                 * Добавляет прямоугольник в список фигур, рассчитывает и выводит общую площадь фигур
                 */
                _this.calculator.addRectangle(Number(length), Number(width));
                _this.printTotalAreaAndShapes();
            });
        });
    };
    /**
     * Вывод всех фигур общую площадь всех добавленных фигур и запрашивающий у пользователя,
     * хочет ли он добавить еще фигуру
     */
    App.prototype.printTotalAreaAndShapes = function () {
        var _this = this;
        /**
         *  вывод на экран всех добавленные фигуры
         */
        this.calculator.printAllShapes();
        /**
         * Задает вопрос пользователю, хочет ли он добавить еще фигуру
         */
        this.rl.question('Хотите добавить еще фигуру? (да/нет)\n', function (answer) {
            /**
             *  Если "да", запрашивает тип фигуры
             */
            if (answer === 'да') {
                _this.rl.question(
                /**
                 * ввод к текущему экземпляру класса App
                 */
                'Какую бы фигуру вы хотели добавить? (круг, квадрат, треугольник, прямоугольник)\n', _this.handleInput.bind(_this));
            }
            else {
                /**
                 * Если "нет", выводит на экран то пока
                 */
                console.log('Пока!');
                _this.rl.close();
            }
        });
    };
    return App;
}());
/**
 * Создание экземпляра класса App с указанием пути к файлу с данными и запуск приложения app.Run();
 */
var app = new App('./shapes.json');
app.Run();
