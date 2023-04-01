import { Figure } from '../Figure/Figure'

export class Square implements Figure {
    type = 'square';// Тип фигуры - Квадрат

    //конструктор класса принимает на вход значение длины стороны квадрата
    constructor(private side: number) { }

    /**
     * 
     * @returns Метод getArea из интерфейса Figure, возвращает площадь квадрата
     */
    getArea() {
        // получениe площади квадрата
        return this.side ** 2;
    }
    /**
    * 
    * @returns Метод getPerimeter из интерфейса Figure, возвращает периметр квадрата
    */
    getPerimeter() {
        //получениe периметра квадрата
        return 4 * this.side;
    }
}