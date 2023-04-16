import type { ICommand } from './Icomands';
import { Circle } from './circle/circle';
import { Rectangle } from './rectangle/rectangle';
import { Square } from './square/square';
import { Triangle } from './treangle/treangle';

export default class App {
    commands: ICommand[] = [];
    history: string[] = [];
    constructor(shapes: ICommand[]) {
        const addCommand: ICommand = {
            name: 'Добавить',
            description: 'Добавить новую фигуру',
            execute: (params: string) => {
                const [type, ...args] = params.split(' ');

                switch (type) {
                    case 'Круг':
                        shapes.push(new Circle(...args.map(Number)));
                        console.log('Круг добавлен');
                        break;
                    case 'Квадрат':
                        shapes.push(new Square(...args.map(Number)));
                        console.log('Квадрат добавлен');
                        break;
                    case 'Прямоугольник':
                        shapes.push(new Rectangle(...args.map(Number)));
                        console.log('Прямоугольник добавлен');
                        break;
                    case 'Треугольник':
                        shapes.push(new Triangle(...args.map(Number)));
                        console.log('Треугольник добавлен');
                        break;
                    default:
                        console.log('Нет такой фигуры');
                        break;
                }
            },
        };

        const listCommand: ICommand = {
            name: 'Список',
            description: 'Список всех фигур',
            execute: () => {
                shapes.forEach((shape) => {
                    console.log(shape.toString());
                });
            },
        };

        const areaCommand: ICommand = {
            name: 'площадь',
            description: 'Вычислите общую площадь всех фигур',
            execute: () => {
                const totalArea = shapes.reduce((acc, shape) => {
                    return acc + shape.getArea();
                }, 0);
                console.log(`Общая площадь: ${totalArea.toFixed(2)}`);
            },
        };

        const perimeterCommand: ICommand = {
            name: 'периметр',
            description: 'Вычислите общий периметр всех фигур',
            execute: () => {
                const totalPerimeter = shapes.reduce((acc, shape) => {
                    return acc + shape.getPerimeter();
                }, 0);
                console.log(`Общий периметр: ${totalPerimeter.toFixed(2)}`);
            },
        };

        const countCommand: ICommand = {
            name: 'считать',
            description: 'Подсчитайте количество фигур',
            execute: () => {
                console.log(`Количество фигур: ${shapes.length}`);
            },
        };

        const removeCommand: ICommand = {
            name: 'удалить',
            description: 'Удалить фигуру по индексу',
            execute: (params: string) => {
                const index = Number(params);
                if (isNaN(index) || index < 1 || index > shapes.length) {
                    console.log('Неверный индекс');
                } else {
                    shapes.splice(index - 1, 1);
                    console.log(`Форма ${index} удалено`);
                }
            },
        };

        const updateCommand: ICommand = {
            name: 'обновить',
            description: 'обновить форма по индексу и параметрам',
            execute: (params: string) => {
                const [indexStr, type, ...args] = params.split(' ');
                const index = Number(indexStr);
                if (isNaN(index) || index < 1 || index > shapes.length) {
                    console.log('Неверный индекс');
                } else {
                    switch (type) {
                        case 'Круг':
                            shapes[index - 1] = new Circle(...args.map(Number));
                            console.log(`Фигура ${index} обновлена`);
                            break;
                        case 'Квадрат':
                            shapes[index - 1] = new Square(...args.map(Number));
                            console.log(`Фигура${index} обновлена`);
                            break;
                        case 'Прямоугольник': shapes[index - 1] = new Rectangle(...args.map(Number));
                            console.log(`Фигура ${index} обновлена`);
                            break;
                        case 'Треугольник': shapes[index - 1] = new Triangle(...args.map(Number));
                            console.log(`Фигура ${index} обновлена`);
                            break;
                        default:
                            console.log('Нет такой Фигуры');
                            break;
                    }
                }
            },
        };
        this.commands.push(addCommand);
        this.commands.push(listCommand);
        this.commands.push(areaCommand);
        this.commands.push(perimeterCommand);
        this.commands.push(countCommand);
        this.commands.push(removeCommand);
        this.commands.push(updateCommand);
    }

    printHistory() {
        console.log('История команд:');
        this.history.forEach((command) => console.log(command));
    }
}
