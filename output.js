"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("./main");
var readline_1 = require("readline");
var rl = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout,
});
var calculator = new main_1.ShapeCalculator('./figure.json');
var handleInput = function (shape) {
    switch (shape) {
        case 'круг': // если введена фигура "круг"
            rl.question('Введите радиус:\n', function (radius) {
                calculator.addCircle(Number(radius)); // добавляем круг в список фигур
                printTotalAreaAndShapes(); // выводим список фигур и общую площадь
            });
            break;
        case 'квадрат': // если введена фигура "квадрат"
            rl.question('Введите длину стороны:\n', function (length) {
                calculator.addSquare(Number(length)); // добавляем квадрат в список фигур
                printTotalAreaAndShapes(); // выводим список фигур и общую площадь
            });
            break;
        case 'треугольник': // если введена фигура "треугольник"
            rl.question('Укажите длину стороны A:\n', function (a) {
                rl.question('Введите длину стороны B:\n', function (b) {
                    rl.question('Укажите длину стороны C:\n', function (c) {
                        calculator.addTriangle(Number(a), Number(b), Number(c)); // добавляем треугольник в список фигур
                        printTotalAreaAndShapes(); // выводим список фигур и общую площадь
                    });
                });
            });
            break;
        case 'прямоугольник': // если введена фигура "прямоугольник"
            rl.question('Введите длину:\n', function (length) {
                rl.question('Введите ширину:\n', function (width) {
                    calculator.addRectangle(Number(length), Number(width)); // добавляем прямоугольник в список фигур
                    printTotalAreaAndShapes(); // выводим список фигур и общую площадь
                });
            });
            break;
        default:
            console.log('Введена недопустимая величина.'); // если введена неверная фигура, выводим сообщение об ошибке
            rl.close(); // закрываем интерфейс чтения ввода
    }
};
var printTotalAreaAndShapes = function () {
    calculator.printAllShapes();
    console.log("\u041E\u0431\u0449\u0430\u044F \u043F\u043B\u043E\u0449\u0430\u0434\u044C: ".concat(calculator.getTotalArea()));
    rl.close();
};
rl.question('Какую бы фигуру вы хотели добавить? (круг, квадрат, треугольник, прямоугольник)\n', handleInput);
