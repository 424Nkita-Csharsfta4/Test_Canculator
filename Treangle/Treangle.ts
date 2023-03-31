import { Figure } from '../Figure/Figure';

export class Triangle implements Figure {
    type = 'triangle';
    constructor(private a: number, private b: number, private c: number) {}
    getArea() {
      /**
       * площадь треугольника с помощью формулы Герона
       */
      const s = (this.a + this.b + this.c) / 2;
      return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }
    getPerimeter() {
      //периметр треугольника, складывая длины всех его сторон
      return this.a + this.b + this.c;
    }
  }



