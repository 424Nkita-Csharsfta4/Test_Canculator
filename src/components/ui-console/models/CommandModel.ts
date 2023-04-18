import { ICommand } from '../interfaces/ICommand'
export class CommandModel implements ICommand {
    /**
    * Название команды
    */
    name: string;
    /**
    * Функция которая вызвана при выполнении команды
    * @param parameters параметры команды
    */
    execute: (parameters: string) => void;
    /**
     * Функция вызывается при запросе помощи в команде
     */
    help: () => void;

    constructor(name: string, execute: (parameters: string) => void, help: () => void) {
        this.name = name;
        this.execute = execute;
        this.help = help;
    }

}