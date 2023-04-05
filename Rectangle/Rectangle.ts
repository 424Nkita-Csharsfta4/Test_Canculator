import { Figure } from '../Figure/Figure'

/**
 * @param Rectangle экспортируем и реализует интерфейс
 * в этом классе находится логика фигуры
 */
export class Rectangle implements Figure {
   /**
    * @param width ширина треугольника
    */
   private Width: number;
   /**
    * @param height высота треугольника
    */
   private Height: number;

   /** 
    * Тип фигуры - треугольник
    */
   type = 'rectangle';
   
   /**
    * Конструктор принимает ширину и высоту прямоугольника
    * 
    * @param width ширина треугольника
    * @param height высота треугольника
    */
   constructor(width: number, height: number) {
      this.Width = width;
      this.Height = height;
   }
   /** 
    * Геттеры для получения ширины и высоты
    */
   get width() {
      return this.Width;
   }
   get height() {
      return this.Height;
   }
   /**
   * Метод getArea из интерфейса Figure
   */
   getArea() {
      // возвращаем площадь прямоугольника
      return this.Width * this.Height;
   }
   /**
   * Метод getPerimeter из интерфейса Figure
   */
   getPerimeter() {
      //возвращаем периметр прямоугольника
      return 2 * (this.Width + this.Height);
   }
}
