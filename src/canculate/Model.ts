import  Circle from "./circle/circle";
import  Square from "./square/square";
import  Rectangle from "./rectangle/rectangle";
import  Triangle from "./treangle/treangle";
import  ICommand from "./Icomands";

export default class Model {
    shapes: (Circle | Square | Rectangle | Triangle)[] = [];
    commands: ICommand[] = [];
    commandHistory: string[] = [];

    addShape(shape: Circle | Square | Rectangle | Triangle): void {
        this.shapes.push(shape);
    }

    removeShape(shape: Circle | Square | Rectangle | Triangle): void {
        const index = this.shapes.indexOf(shape);
        if (index !== -1) {
            this.shapes.splice(index, 1);
        }
    }

    getShapes(): (Circle | Square | Rectangle | Triangle)[] {
        return this.shapes;
    }

    getShapeCount(): number {
        return this.shapes.length;
    }

    getArea(): number {
        return this.shapes.reduce((total, shape) => {
            return total + shape.getArea();
        }, 0);
    }

    getPerimeter(): number {
        return this.shapes.reduce((total, shape) => {
            return total + shape.getPerimeter();
        }, 0);
    }

    getShapeCountByType(type: string): number {
        return this.shapes.filter((shape) => shape.getType() === type).length;
    }

    addCommand(command: ICommand): void {
        this.commands.push(command);
    }

    getCommands(): ICommand[] {
        return this.commands;
    }

    executeCommand(command: string): void {
        this.commandHistory.push(command);

        const [name, parameters] = command.split(" ");
        const matchingCommands = this.commands.filter((cmd) => cmd.name === name);

        if (matchingCommands.length === 1) {
            matchingCommands[0].execute(parameters);
        } else {
            console.log(`Команда '${name}'не распознается. Введите 'help' для получения списка команд.`);
        }
    }

    getCommandHistory(): string[] {
        return this.commandHistory;
    }
}
