export interface ICommand {
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
}

