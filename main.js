"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs"); //Чтение и запись файла
var readline = require("readline"); //Ввод данных пользователя
var Circle_1 = require("./Circle/Circle");
var Rectangle_1 = require("./Rectangle/Rectangle");
var Square_1 = require("./Square/Square");
var Treangle_1 = require("./Treangle/Treangle");
var Calculator = /** @class */ (function () {
    function Calculator() {
        this.figures = [];
    }
    /**
     *
     * @param figure Добавление в Дженерики фигур
     */
    Calculator.prototype.addFigure = function (figure) {
        this.figures.push(figure);
    };
    /**
     *
     * @returns Получение всех фигур
     */
    Calculator.prototype.getAllFigures = function () {
        return this.figures;
    };
    /**
     *
     * @returns Получение количества фигур по типу
     */
    Calculator.prototype.getFiguresCountByType = function () {
        var figuresCountByType = new Map();
        /**
         *  Для каждой фигуры определяем ее тип,
         *  проверяем есть ли уже такой тип в Map и если да, то увеличиваем значение на 1
         */
        this.figures.forEach(function (figure) {
            var _a;
            var type = figure.getNames();
            var count = (_a = figuresCountByType.get(type)) !== null && _a !== void 0 ? _a : 0;
            figuresCountByType.set(type, count + 1);
        });
        return figuresCountByType;
    };
    /**
     *
     * @returns * Получение общей площади фигур
     */
    Calculator.prototype.getTotalArea = function () {
        var totalArea = 0;
        /**
         * * Для каждой фигуры вычисляем ее площадь и добавляем ее к общей площади
         */
        this.figures.forEach(function (figure) {
            totalArea += figure.getRadius();
        });
        return totalArea;
    };
    /**
     *
     * @returns Получение общего периметра фигур
     */
    Calculator.prototype.getTotalPerimeter = function () {
        var totalPerimeter = 0;
        /**
         * * Для каждой фигуры вычисляем ее периметр и добавляем его к общему периметру
         */
        this.figures.forEach(function (figure) {
            totalPerimeter += figure.getPerimetr();
        });
        return totalPerimeter;
    };
    /**
     *
     * @param filePath Обновление информации о фигурах в файле
     */
    Calculator.prototype.updateFiguresInFile = function (filePath) {
        /**
         * Преобразуем массив фигур в строку JSON
         */
        var figuresData = JSON.stringify(this.figures);
        /**
         * *Записываем данные в файл
         */
        fs.writeFile(filePath, figuresData, function (err) {
            if (err)
                throw err;
            console.log("Data updated in file ".concat(filePath));
        });
    };
    /**
     *
     * @param filePath Чтение информации о фигурах из файла
     */
    Calculator.prototype.readFiguresFromFile = function (filePath) {
        var _this = this;
        /**
         * Создаем интерфейс для чтения файла построчно
         */
        var readInterface = readline.createInterface({
            input: fs.createReadStream(filePath),
            output: process.stdout,
        });
        /**
         * Обработчик события для каждой строки файла
         */
        readInterface.on('line', function (line) {
            /**
             * Преобразуем строку JSON в объект фигуры и добавляем его в Дженерики
             */
            var figureData = JSON.parse(line);
            var figure;
            switch (figureData.type) {
                case 'Circle':
                    figure = new Circle_1.Circle(figureData.radius);
                    break;
                case 'Rectangle':
                    figure = new Rectangle_1.Reactangle(figureData.width, figureData.height);
                    break;
                case 'Square':
                    figure = new Square_1.Square(figureData.side);
                    break;
                case 'Triangle':
                    figure = new Treangle_1.Triangle(figureData.base, figureData.height, figureData.sideC);
                    break;
                default:
                    figure = null;
            }
            if (figure) {
                _this.addFigure(figure);
            }
        });
        /**
         * Обработчик события завершения чтения файла
         */
        readInterface.on('close', function () {
            console.log("Data read from file ".concat(filePath));
        });
    };
    return Calculator;
}());
module.exports = {
    Calculator: Calculator,
};
