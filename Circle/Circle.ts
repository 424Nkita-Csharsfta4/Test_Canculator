import { Figure } from '../Figure/Figure'

/**
 * Класс Circle экспортируем и реализует интерфейс
 * в этом классе находится логика фигуры
 */
export class Circle implements Figure {
     type = 'circle';// Тип фигуры - круг
     private Radiuse: number;// Радиус круга

     constructor(radius: number) { 
          this.Radiuse = radius;
     }
     // Геттер для получения радиуса круга
     get radius() {
          return this.Radiuse;
     }
    /**
      * Метод для вычисления площади круга
      * @returns Площадь круга по формуле Math.PI * radius^2
      */
    public getArea(): number {
     return Math.PI * this.radius * this.radius;
   }
      /**
      * Метод для вычисления периметра круга
      * @returns Периметр круга по формуле 2 * Math.PI * radius
      */
     getPerimeter() {
          // Возвращаем периметр круга по формуле
          return 2 * Math.PI * this.Radiuse;
     }
}