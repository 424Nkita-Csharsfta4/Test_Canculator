import { Figure } from '../Figure/Figure'

export class Rectangle implements Figure {
   private Width: number;
   private Height: number;

   type = 'rectangle';// Тип фигуры - треугольник
   
   // Конструктор принимает ширину и высоту прямоугольника
   constructor(width: number, height: number) {
      this.Width = width;
      this.Height = height;
   }

   // Геттеры для получения ширины и высоты
   get width() {
      return this.Width;
   }
   get height() {
      return this.Height;
   }
   /**
   *
   * @returns Метод getArea из интерфейса Figure
   */
   getArea() {
      // возвращаем площадь прямоугольника
      return this.Width * this.Height;
   }
   /**
   *
   * @returns Метод getPerimeter из интерфейса Figure
   */
   getPerimeter() {
      //возвращаем периметр прямоугольника
      return 2 * (this.Width + this.Height);
   }
}
