import { Figure } from '../Figure/Figure'

export class Rectangle implements Figure {
   type = 'rectangle';
   constructor(private width: number, private height: number) { }
   getArea() {
      // возвращаем площадь прямоугольника
      return this.width * this.height;
   }
   getPerimeter() {
      //возвращаем периметр прямоугольника
      return 2 * (this.width + this.height);
   }
}
