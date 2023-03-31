import * as fs from 'fs';
import { Figure } from './Figure/Figure';
import { Circle } from "./Circle/Circle";
import { Rectangle } from './Rectangle/Rectangle'
import { Square } from './Square/Square'
import { Triangle } from './Treangle/Treangle'

export class ShapeCalculator {
    /**
     * Свойство содержашие все фигуры виде массива
     */
    public shapes: Figure[] = [];
    

    constructor(private filepath: string) {//Путь файла из которого будут сохранены и загружены фигуры
        try {
            const data = fs.readFileSync(filepath, 'utf-8');
            this.shapes = JSON.parse(data);
        } catch (error) {
            console.log(`Ошибка чтения файла: ${error.message}`);
        }
    }

             /**
              * Если ошибка при записи фигуры в Json
              */
        private saveShapes() {
            fs.writeFile(this.filepath, JSON.stringify(this.shapes), (err) => {
                if (err) {
                    console.log(`Ошибка сохранения файла: ${err.message}`);
                }
            });
        }
    

    addCircle(radius: number) {
        const circle = new Circle(radius);
        this.shapes.push(circle);
        this.saveShapes();
        console.log(`Добавлен ${circle.type} с радиусом ${radius}`);
    }

    addSquare(side: number) {
        const square = new Square(side);
        this.shapes.push(square);
        this.saveShapes();
        console.log(`Добавлен ${square.type} с сторона ${side}`);
    }

    addTriangle(a: number, b: number, c: number) {
        const triangle = new Triangle(a, b, c);
        this.shapes.push(triangle);
        this.saveShapes();
        console.log(`Добавлен ${triangle.type} с сторона ${a}, ${b}, ${c}`);
    }

    addRectangle(width: number, height: number) {
        const rectangle = new Rectangle(width, height);
        this.shapes.push(rectangle);
        this.saveShapes();
        console.log(`Добавлен ${rectangle.type} с ${width} и высота ${height}`);
    }

    printAllShapes() {
        this.shapes.forEach((shape) => {
            console.log(`Тип: ${shape.type}`);
            console.log(`Площадь: ${shape.getArea()}`);
            console.log(`Периметр: ${shape.getPerimeter()}`);
            console.log('------------------------');
        });
    }

    getTotalArea() {// вычисления общей площади всех фигур
        return this.shapes.reduce((acc, shape) => acc + shape.getArea(), 0);
    }
}

