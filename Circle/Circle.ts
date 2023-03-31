import { Figure } from '../Figure/Figure'//Импортируем наш файл с Интерфейсом

export class Circle implements Figure {
     type = 'circle';
     private Radiuse: number;

     constructor(radius: number) { 
          this.Radiuse = radius;
     }
     get radius() {
          return this.Radiuse;
     }
     /**
      * 
      * @returns Mетод getArea из интерфейса Figure
      */
     getArea() {
          // Возвращаем площадь круга по формуле
          return Math.PI * this.Radiuse ** 2;
     }
     /**
      * 
      * @returns Mетод getPerimeter из интерфейса Figure 
      */
     getPerimeter() {
          // Возвращаем периметр круга по формуле
          return 2 * Math.PI * this.Radiuse;
     }
}