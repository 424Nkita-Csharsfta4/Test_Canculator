import { Figure } from '../Figure/Figure';

/**
 * @param Triangle экспортируем и реализует интерфейс
 * в этом классе находится логика фигуры
 */
export class Triangle implements Figure {
  /**
   * Тип фигуры - треугольник
   */
    type = 'triangle';

    /**
     * конструктор, который принимает три аргумента для сторон треугольника
     * 
     * @param a сторона
     * @param b сторона
     * @param c сторона
     */
    constructor(private a: number, private b: number, private c: number) {}

    /**
     * Метод для вычисления площади треугольника
     */
    public getArea(): number {
      const p = (this.a + this.b + this.c) / 2;
      return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
    }

    /**
     *  Метод для вычисления периметра треугольника
     */
    getPerimeter() {
      //периметр треугольника, складывая длины всех его сторон
      return this.a + this.b + this.c;
    }
  }



