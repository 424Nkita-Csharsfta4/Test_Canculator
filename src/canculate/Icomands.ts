interface ICommand {
    name: string;
    execute: (parameters: string) => void;
    help: () => void;
}

class Command implements ICommand {
    name: string;
    execute: (parameters: string) => void;
    help: () => void;

    constructor(name: string, execute: (parameters: string) => void, help: () => void) {
        this.name = name;
        this.execute = execute;
        this.help = help;
    }
}
