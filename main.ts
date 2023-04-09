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

    getTotalShapesCount() {
        return this.shapes.length;
      }
      calculateTotalArea() {
        let totalArea = 0;
        for (const shape of this.shapes) {
          totalArea += shape.getArea();
        }
        return totalArea;
      }

    /**
     *  filepath Путь файла из которого будут сохранены и загружены фигуры 
     * происходит чтение данных из файла и преобразование их в объекты фигур
     */
    constructor(private filepath: string) {
        try {
            const data = fs.readFileSync(filepath, 'utf-8');
            this.shapes = JSON.parse(data);
        } catch (error) {
            console.log(`Ошибка чтения файла: ${error.message}`);
        }
    }

    /**
     * Метод для сохранения всех фигур в файл
     * Если происходит ошибка при сохранении, выводится сообщение об ошибке
     */
    private saveShapes() {
        fs.writeFile(this.filepath, JSON.stringify(this.shapes), (err) => {
            if (err) {
                console.log(`Ошибка сохранения файла: ${err.message}`);
            }
        });
    }


    /**
     * Добавляет круг в массив фигур и сохраняет данные в файл.
     * Выводит сообщение о добавлении в консоль.
     * @param radius Радиус круга.
    */
    addCircle(radius: number) {
        const circle = new Circle(radius);
        this.shapes.push(circle);
        this.saveShapes();
        console.log(`Добавлен ${circle.type} с радиусом ${radius}`);
    }
    /**
     * Добавляет квадрат в массив фигур и сохраняет данные в файл.
     *  Выводит сообщение о добавлении в консоль.
     * @param side стороны квадрата
     */
    addSquare(side: number) {
        const square = new Square(side);
        this.shapes.push(square);
        this.saveShapes();
        console.log(`Добавлен ${square.type} с сторона ${side}`);
    }
     /**
     * Добавляет треугольник в массив фигур и сохраняет данные в файл.
     *  Выводит сообщение о добавлении в консоль.
     * @param 3 стороны треугольник
     */
    addTriangle(a: number, b: number, c: number) {
        const triangle = new Triangle(a, b, c);
        this.shapes.push(triangle);
        this.saveShapes();
        console.log(`Добавлен ${triangle.type} с сторона ${a}, ${b}, ${c}`);
    }
    /**
     * Добавляет прямоугольник в массив фигур и сохраняет данные в файл.
     *  Выводит сообщение о добавлении в консоль.
     * @param 3 стороны прямоугольник
     */
    addRectangle(width: number, height: number) {
        const rectangle = new Rectangle(width, height);
        this.shapes.push(rectangle);
        this.saveShapes();
        console.log(`Добавлен ${rectangle.type} с ${width} и высота ${height}`);
    }
    /**
      * Метод для вывода информации о всех фигурах в консоль
      */
     
    printAllShapes() {
        this.shapes.forEach((shape) => {
            console.log(`Тип: ${shape.type}`);
            console.log(`Площадь: ${shape.getArea()}`);
            console.log(`Периметр: ${shape.getPerimeter()}`);
            console.log('------------------------');
        });
    }

    /**
     * 
     * @returns вычисления общей площади всех фигур
     */
    getTotalArea() {
        return this.shapes.reduce((acc, shape) => acc + shape.getArea(), 0);
    }
}

