import { Figure } from '../Figure/Figure'

/**
 * @param Square экспортируем и реализует интерфейс
 * в этом классе находится логика фигуры
 */
export class Square implements Figure {
    /** 
     * Тип фигуры - Квадрат
     */
    type = 'square';

    /**
     * конструктор класса принимает на вход значение длины стороны квадрата 
     */
    constructor(private side: number) { }

    /**
     *  Метод getArea из интерфейса Figure, возвращает площадь квадрата
     */
    public getArea(): number {
        return this.side * this.side;
      }
    /**
    *  Метод getPerimeter из интерфейса Figure, возвращает периметр квадрата
    */
    getPerimeter() {
        //получениe периметра квадрата
        return 4 * this.side;
    }
}