import { ref } from 'vue';
import type { Figure } from './Figure';
import type { ICommand } from './Icomands';
import { saveAs } from 'file-saver';

/**

Класс App является главным классом, который содержит всю логику приложения.
Он принимает дженерик типа T, который определяет тип команд, принимаемых приложением.
*/
export class App<T extends ICommand> {
    shapes = ref<Figure[]>([]);
    commands: T[];
    commandHistory = ref<string[]>([]);
    shapeHistory = ref<string[]>([]);
    static Commands: any;

    /**
    
    Конструктор принимает список команд типа T.
    @param commands - список команд типа T.
    */
    constructor(commands: T[]) {
        this.commands = commands;
    }
    /**
    
    Метод enterCommand принимает команду в виде строки и выполняет соответствующую команду.
    @param command - строка, содержащая команду для выполнения.
    */
    enterCommand(command: string): void {
        const [name, params] = this.getCommand(command);
        const commandObj = this.commands.find((c) => c.name === name);
        if (commandObj) {
            commandObj.execute(this.shapes.value, params);
            this.commandHistory.value.push(command);
            this.shapeHistory.value.push(this.shapesToString());
        }
    }
    /**
    
    Метод getCommand принимает строку с командой и возвращает ее название и параметры.
    @param command - строка с командой.
    @returns - кортеж из двух строк: название команды и параметры.
    */
    getCommand(command: string): [string, string] {
        const parts = command.trim().split(/\s+/);
        const name = parts.shift()?.toLowerCase() || '';
        const params = parts.join(' ');
        return [name, params];
    }
    /**
    
    Метод shapesToString возвращает строку, содержащую список фигур в приложении.
    @returns - строка со списком фигур.
    */
    private shapesToString(): string {
        return this.shapes.value.map((shape: Figure) => `${ shape.getArea }: ${ JSON.stringify(shape) }`).join(', ');
    }
    /**
    
    Метод downloadShapes сохраняет список фигур в файл.
    */
    downloadShapes() {
        const content = this.shapesToString();
        const filename = 'shapes.txt';
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, filename);
    }
    /**
    
    Метод saveAs сохраняет переданный файл под указанным именем.
    @param blob - содержимое файла.
    @param filename - имя файла.
    */
    saveAs(blob: Blob, filename: string) {
        saveAs(blob, filename);
    }
}