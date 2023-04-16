import type { Circle } from './circle/circle';
import type { Rectangle } from './rectangle/rectangle';
import type { Square } from './square/square';
import type { Triangle } from './treangle/treangle';

class ListCommand implements Command {
  name = 'Список';

  execute(): void {
    console.log('Фигуры:');
    this.app.shapes.forEach((shape) => console.log(`- ${shape.name}`));
  }

  help(): string {
    return 'Перечислите все фигуры в калькуляторе';
  }

  constructor(private app: App) { }
}

class AreaCommand implements Command {
  name = 'площадь';

  execute(): void {
    console.log('Вычисление площади...');
    this.app.shapes.forEach((shape) => console.log(`- ${shape.name}: ${shape.calculateArea()}`));
  }

  help(): string {
    return 'Вычислить и отобразить площадь всех фигур';
  }

  constructor(private app: App) { }
}

class PerimeterCommand implements Command {
  name = 'периметр';

  execute(): void {
    console.log('Вычисление периметра...');
    this.app.shapes.forEach((shape) => console.log(`- ${shape.name}: ${shape.calculatePerimeter()}`));
  }

  help(): string {
    return 'Вычислить и показать периметр всех фигур';
  }

  constructor(private app: App) { }
}

class CountCommand implements Command {
  name = 'счет';

  execute(): void {
    console.log('Counting shapes...');
    const counts: { [key: string]: number } = {};
    this.app.shapes.forEach((shape) => {
      if (!counts[shape.type]) {
        counts[shape.type] = 1;
      } else {
        counts[shape.type]++;
      }
    });
  }

  help(): string {
    return 'Подсчитайте количество фигур каждого типа';
  }

  constructor(private app: App) { }
}

class AddCommand implements Command {
  name = 'добавить';

  execute(params: string): void {
    const [type, ...args] = params.split(' ');
    let shape: Shape;
    switch (type) {
      case 'круг':
        const [radius] = args.map(Number);
        shape = new Circle(radius);
        break;
      case 'квадрат':
        const [side] = args.map(Number);
        shape = new Square(side);
        break;
      case 'треугольник':
        const [side1, side2, side3] = args.map(Number);
        shape = new Triangle(side1, side2, side3);
        break;
      case 'прямоугольник':
        const [sideA, sideB] = args.map(Number);
        shape = new Rectangle(sideA, sideB);
        break;
      default:
        console.log(`Недопустимый тип фигуры  '${type}'. Введите 'help' для получения списка доступных форм.`);
        return;
    }
    this.app.shapes.push(shape);
    console.log(`Площядь добавлена: ${shape.name}`);
  }

  help(): string {
    return 'Добавить новую фигуру в калькулятор';
  }

  constructor(private app: App) { }
}

class RemoveCommand implements Command {
  name = 'удалить';

  execute(params: string): void {
    const [name] = params.split(' ');
    const index = this.app.shapes.findIndex((shape) => shape.name === name);
    if (index === -1) {
      console.log(`Фигура '${name}' не найдена`);
      return;
    }
    this.app.shapes.splice(index, 1);
    console.log(`Фигура удалена: ${name}`);
  }

  help(): string {
    return 'Удалить новую форму из калькулятора';
  }

  constructor(private app: App) { }
}

class HelpCommand implements Command {
  name = 'помощь';

  execute(): void {
    console.log('Доступные команды:');
    this.app.commands.forEach((command) => console.log(`- ${command.name}: ${command.help()}`));
  }

  help(): string {
    return 'Отображение доступных команд и их описаний';
  }

  constructor(private app: App) { }
}

interface Command {
  name: string;
  execute(params?: string): void;
  help(): string;
}

interface Shape {
  name: string;
  type: string;
  calculateArea(): number;
  calculatePerimeter(): number;
}

class Circle implements Shape {
  name: string;
  type = 'круг';
  constructor(private radius: number) {
    this.name = Circle`${radius}`;
  }
  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
  calculatePerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Square implements Shape {
  name: string;
  type = 'квадрат';
  constructor(private side: number) {
    this.name = Square`${side}`;
  }
  calculateArea(): number {
    return this.side ** 2;
  }
  calculatePerimeter(): number {
    return 4 * this.side;
  }
}

class Triangle implements Shape {
  name: string;
  type = 'треугольник';
  constructor(private side1: number, private side2: number, private side3: number) {
    this.name = Triangle`${side1},${side2},${side3}`;
  }
  calculateArea(): number {
    const p = this.calculatePerimeter() / 2;
    return Math.sqrt(p * (p - this.side1) * (p - this.side2) * (p - this.side3));
  }
  calculatePerimeter(): number {
    return this.side1 + this.side2 + this.side3;
  }
}

class Rectangle implements Shape {
  name: string;
  type = 'Прямоугольник';
  constructor(private sideA: number, private sideB: number) {
    this.name = Rectangle`${sideA}x${sideB}`;
  }
  calculateArea(): number {
    return this.sideA * this.sideB;
  }
  calculatePerimeter(): number {
    return 2 * (this.sideA + this.sideB);
  }
}

class App {
  shapes: Shape[] = [];
  commands: Command[] = [];

  constructor() {
    this.commands.push(
      new ListCommand(this),
      new AreaCommand(this),
      new PerimeterCommand(this),
      new CountCommand(this),
      new AddCommand(this),
      new RemoveCommand(this),
      new HelpCommand(this)
    );
  }

  run() {
    console.log('Welcome to the Shape Calculator!');
    console.log("Type 'help' for a list of available commands.");
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.on('line', (input: string) => {
      const [commandName, ...params] = input.trim().split(' ');
      const command = this.commands.find((command) => command.name === commandName);
      if (!command) {
        console.log(`Command '${commandName}' not found. Type 'help' for a list of available commands.`);
        return;
      }
      command.execute(params.join(' '));
    });
  }
}

const app = new App();
app.run();
