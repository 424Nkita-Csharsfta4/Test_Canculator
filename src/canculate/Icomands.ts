import type { Figure } from "./Figure";

/**
 * Создаем интерфейс "ICommand" для описания команды
 */
export interface ICommand {
    /**
     * Строковое название команды
     */
    name: string;
    /**
     * Функция для выполнения команды, которая принимает массив фигур и строковые параметры и ничего не возвращает
     */
    execute: (shapes: Figure[], params: string) => void;
}
