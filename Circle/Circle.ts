import {Figure} from '../Figure/Figure'//Импортируем наш файл с Интерфейсом

/**
 * * Наследуемся через Figure
 */
export class Circle implements Figure{

    /**
     * * Метод радиус создал
     */
    public radius:number;

    /**
     * *Конструктор класса принимает аргумент radius
     */
     constructor(radius:number){
          this.radius = radius;
     }

     /**
      * *Метод с возвратом имени фигуры
      */
     getNames():string{
       return "Круг";
     }
     /**
      * * Метод с возвратом периметра
      */
     getPerimetr():number{
          return 2 * Math.PI * this.radius; 
     }
      getType():string{
           return "Circle";
      }
     /**
      * *Возврат площяди
      */
     getRadius():number{
        return Math.PI * Math.pow(this.radius,2);
     }
     /**
      * *
      */
     public NowRadius(radius:number):void{
        this.radius = radius;
     }
}


