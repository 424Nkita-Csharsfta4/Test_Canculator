export interface Figure{
    /**
     * Тип фигуры
     */
    type: string;
    /**
     * Возврат площяди фигуры метод
     */
    getArea(): number;
    /**
     * Возврат периметра фигуры
     */
    getPerimeter(): number;
}