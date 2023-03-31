import { Figure } from '../Figure/Figure'

export class Rectangle implements Figure {
   private Width: number;
   private Height: number;

   type = 'rectangle';
   constructor(width: number,height: number) {
      this.Width = width;
      this.Height = height;
    }
    get width() {
      return this.Width;
   }
   get height() {
      return this.Height;
   }
   getArea() {
      // возвращаем площадь прямоугольника
      return this.Width * this.Height;
   }
   getPerimeter() {
      //возвращаем периметр прямоугольника
      return 2 * (this.Width + this.Height);
   }
}
