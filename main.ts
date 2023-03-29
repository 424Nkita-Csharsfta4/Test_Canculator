import * as fs from 'fs';//Чтение и запись файла
import * as readline from 'readline';//Ввод данных пользователя
import { Figure } from './Figure/Figure';
import { Circle } from "./Circle/Circle";
import { Reactangle } from './Rectangle/Rectangle'
import { Square } from './Square/Square'
import { Triangle } from './Treangle/Treangle'

class Calculator {
    /**
     * Создаем Дженерики с фигурами
     */
    figures: Figure[];

    constructor() {
        this.figures = [];
    }

    /**
     * 
     * @param figure Добавление в Дженерики фигур
     */
    addFigure(figure) {
        this.figures.push(figure);
    }

    /**
     * 
     * @returns Получение всех фигур
     */
    getAllFigures() {
        return this.figures;
    }

    /**
     * 
     * @returns Получение количества фигур по типу
     */
    getFiguresCountByType() {
        const figuresCountByType = new Map();
        /**
         *  Для каждой фигуры определяем ее тип,
         *  проверяем есть ли уже такой тип в Map и если да, то увеличиваем значение на 1
         */
        this.figures.forEach((figure) => {
            const type = figure.getNames();
            const count = figuresCountByType.get(type) ?? 0;
            figuresCountByType.set(type, count + 1);
        });
        return figuresCountByType;
    }
    /**
     * 
     * @returns * Получение общей площади фигур
     */
    getTotalArea() {
        let totalArea = 0;
        /**
         * * Для каждой фигуры вычисляем ее площадь и добавляем ее к общей площади
         */
        this.figures.forEach((figure) => {
            totalArea += figure.getRadius();
        });
        return totalArea;
    }

    /**
     * 
     * @returns Получение общего периметра фигур
     */
    getTotalPerimeter() {
        let totalPerimeter = 0;
        /**
         * * Для каждой фигуры вычисляем ее периметр и добавляем его к общему периметру
         */
        this.figures.forEach((figure) => {
            totalPerimeter += figure.getPerimetr();
        });
        return totalPerimeter;
    }
    /**
     * 
     * @param filePath Обновление информации о фигурах в файле
     */
    updateFiguresInFile(filePath) {
        /**
         * Преобразуем массив фигур в строку JSON
         */
        const figuresData = JSON.stringify(this.figures);
        /**
         * *Записываем данные в файл
         */

        fs.writeFile(filePath, figuresData, (err) => {
            if (err) throw err;
            console.log(`Data updated in file ${filePath}`);
        });
    }

    /**
     * 
     * @param filePath Чтение информации о фигурах из файла
     */
    readFiguresFromFile(filePath) {
        /**
         * Создаем интерфейс для чтения файла построчно
         */
        const readInterface = readline.createInterface({
            input: fs.createReadStream(filePath),
            output: process.stdout,

        });

        /**
         * Обработчик события для каждой строки файла
         */
        readInterface.on('line', (line) => {
            /**
             * Преобразуем строку JSON в объект фигуры и добавляем его в Дженерики
             */
            const figureData = JSON.parse(line);
            let figure;
            switch (figureData.type) {
                case 'Circle':
                    figure = new Circle(figureData.radius);
                    break;
                case 'Rectangle':
                    figure = new Reactangle(figureData.width, figureData.height);
                    break;
                case 'Square':
                    figure = new Square(figureData.side);
                    break;
                case 'Triangle':
                    figure = new Triangle(figureData.base, figureData.height, figureData.sideC);
                    break;
                default:
                    figure = null;
            }
            if (figure) {
                this.addFigure(figure);
            }
        });

        /**
         * Обработчик события завершения чтения файла
         */
        readInterface.on('close', () => {
            console.log(`Data read from file ${filePath}`);
        });
    }
}

module.exports = {
    Calculator,
};