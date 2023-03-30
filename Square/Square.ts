import { Figure } from '../Figure/Figure'

export class Square implements Figure {
    type = 'square';
    constructor(private side: number) { }
    getArea() {
        // получениe площади квадрата
        return this.side ** 2;
    }
    getPerimeter() {
        //получениe периметра квадрата
        return 4 * this.side;
    }
}