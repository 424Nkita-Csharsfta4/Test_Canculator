import { Figure } from '../Figure/Figure';

export class Triangle implements Figure{
    public base:number;
    public height:number;
    public sideC:number;

    constructor(base:number,height:number,sideC:number){
        this.base = base;
        this.height = height;
        this.sideC = sideC;
    }

    getNames():string{
        return "Треугольник"
    }

    getPerimetr():number{
        return this.base + this.sideC + this.height;
    }

    getRadius():number{
        return (this.base*this.height*this.sideC)/(4*this.getArea())
    }

    NowSize(base:number,height:number,sideC:number):void{
        this.base = base;
        this.height = height;
        this.sideC = sideC;
    }

    getArea():number{
        return 0.5*this.base*this.height;
    }
}



