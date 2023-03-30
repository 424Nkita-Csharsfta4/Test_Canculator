import { Figure } from '../Figure/Figure'//Импортируем наш файл с Интерфейсом

export class Circle implements Figure {
     type = 'circle';
     constructor(private radius: number) { }
     //Mетод getArea из интерфейса Figure
     getArea() {
          // Возвращаем площадь круга по формуле
          return Math.PI * this.radius ** 2;
     }
      //Mетод getPerimeter из интерфейса Figure
     getPerimeter() {
          // Возвращаем периметр круга по формуле
          return 2 * Math.PI * this.radius;
     }
}