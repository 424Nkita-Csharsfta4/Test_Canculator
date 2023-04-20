export interface Figure{

    /**
     * Имя фигуры
     */
    name: string;
    /**
     * Возврат площяди фигуры метод
     */
    getArea(): number;
    /**
     * Возврат периметра фигуры
     */
    getPerimeter(): number;
}