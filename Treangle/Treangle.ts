import { Figure } from '../Figure/Figure';

export class Triangle implements Figure {
  /**
   * Тип фигуры - треугольник
   */
    type = 'triangle';

    /**
     * конструктор, который принимает три аргумента для сторон треугольника
     * 
     * @param a 
     * @param b 
     * @param c 
     */
    constructor(private a: number, private b: number, private c: number) {}

    /**
     * Метод для вычисления площади треугольника
     */
    getArea() {
      /**
       * площадь треугольника с помощью формулы Герона
       */
      const s = (this.a + this.b + this.c) / 2;
      return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }

    /**
     *  Метод для вычисления периметра треугольника
     */
    getPerimeter() {
      //периметр треугольника, складывая длины всех его сторон
      return this.a + this.b + this.c;
    }
  }



