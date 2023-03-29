import {Figure} from '../Figure/Figure'

/**
 * * Наследуемся с Figure
 */
export class Square implements Figure{
 

    /**
     * * Периметр
     */
    public perimetr:number;

    constructor(perimets:number){
        this.perimetr = perimets;
    }

    getNames():string{
        return "Квадрат"
    }

    getPerimetr():number{
        return 4 * this.perimetr;
    }

    getRadius():number{
        return Math.pow(this.perimetr,2);
    }
    NowSide(perimetr:number):void{
      this.perimetr = perimetr;
    }
}

