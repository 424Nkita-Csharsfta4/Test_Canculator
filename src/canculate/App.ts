import { CommandModel } from "@/components/ui-console/models/CommandModel";
import { ICommand } from "@/components/ui-console/interfaces/ICommand";

export class App {
    private Comands:Array<ICommand>;
    helpCommand: (parameters: string) => void;
    addCommand: (parameters: string) => void;
    startCommand: (parameters: string) => void;
    exitCommand: (parameters: string) => void;
    historyCommand: (parameters: string) => void;
    helpCommandHelp: () => void;
    addCommandHelp: () => void;
    startCommandHelp: () => void;
    exitCommandHelp: () => void;
    downloadCommand: (parameters: string) => void;
    downloadCommandHelp: () => void;
    historyCommandHelp: () => void;

    constructor() {
        // инициализация команд
        this.Comands.push(new CommandModel('help', this.helpCommand, this.helpCommandHelp));
        this.Comands.push(new CommandModel('add', this.addCommand, this.addCommandHelp));
        this.Comands.push(new CommandModel('start', this.startCommand, this.startCommandHelp));
        this.Comands.push(new CommandModel('exit', this.exitCommand, this.exitCommandHelp));
        this.Comands.push(new CommandModel('download', this.downloadCommand, this.downloadCommandHelp));
        this.Comands.push(new CommandModel('history', this.historyCommand, this.historyCommandHelp));
      }

}