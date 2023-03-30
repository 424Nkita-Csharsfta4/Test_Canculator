import { ShapeCalculator } from './main';
import { createInterface } from 'readline';

const rl = createInterface({//экземпляр интерфейса для чтения ввода из консоли
    input: process.stdin,
    output: process.stdout,
});

const calculator = new ShapeCalculator('./figure.json');

const handleInput = (shape: string) => { //обработчик ввода
    switch (shape) {
        case 'круг': // если введена фигура "круг"
            rl.question('Введите радиус:\n', (radius) => { // запрашиваем радиус у пользователя
                calculator.addCircle(Number(radius)); // добавляем круг в список фигур
                printTotalAreaAndShapes(); // выводим список фигур и общую площадь
            });
            break;
        case 'квадрат': // если введена фигура "квадрат"
            rl.question('Введите длину стороны:\n', (length) => { // запрашиваем длину стороны у пользователя
                calculator.addSquare(Number(length)); // добавляем квадрат в список фигур
                printTotalAreaAndShapes(); // выводим список фигур и общую площадь
            });
            break;
        case 'треугольник': // если введена фигура "треугольник"
            rl.question('Укажите длину стороны A:\n', (a) => { // запрашиваем длину стороны А у пользователя
                rl.question('Введите длину стороны B:\n', (b) => { // запрашиваем длину стороны B у пользователя
                    rl.question('Укажите длину стороны C:\n', (c) => { // запрашиваем длину стороны C у пользователя
                        calculator.addTriangle(Number(a), Number(b), Number(c)); // добавляем треугольник в список фигур
                        printTotalAreaAndShapes(); // выводим список фигур и общую площадь
                    });
                });
            });
            break;
        case 'прямоугольник': // если введена фигура "прямоугольник"
            rl.question('Введите длину:\n', (length) => { // запрашиваем длину у пользователя
                rl.question('Введите ширину:\n', (width) => { // запрашиваем ширину у пользователя
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

const printTotalAreaAndShapes = () => {
    calculator.printAllShapes();
    console.log(`Общая площадь: ${calculator.getTotalArea()}`);
    rl.close();
};

rl.question(
    'Какую бы фигуру вы хотели добавить? (круг, квадрат, треугольник, прямоугольник)\n',
    handleInput
);
