import { Figure } from '../Figure/Figure';

export class Triangle implements Figure {
    type = 'triangle';// Тип фигуры - треугольник

    //конструктор, который принимает три аргумента для сторон треугольника (a, b и c)
    constructor(private a: number, private b: number, private c: number) {}

    /**
     * 
     * @returns Метод для вычисления площади треугольника
     */
    getArea() {
      /**
       * площадь треугольника с помощью формулы Герона
       */
      const s = (this.a + this.b + this.c) / 2;
      return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }

    /**
     * 
     * @returns Метод для вычисления периметра треугольника
     */
    getPerimeter() {
      //периметр треугольника, складывая длины всех его сторон
      return this.a + this.b + this.c;
    }
  }



