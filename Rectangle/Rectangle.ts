import {Figure} from '../Figure/Figure'

export class Reactangle implements Figure{
        
     public Width:number;
     public Height:number;

     constructor(Width:number,Height:number){
         this.Width = Width;
         this.Height = Height;
     }
     getNames():string{
        return "Прямоугльник"
     }
      
     getPerimetr():number{
        return 2*(this.Width+ this.Height)
     }
     getRadius():number{
        return this.Width + this.Height;
     }
     NowSize(Width:number,Height:number):void{
          this.Width = Width;
          this.Height = Height;
     }


}
