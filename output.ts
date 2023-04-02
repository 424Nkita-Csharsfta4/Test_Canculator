import { ShapeCalculator } from './main';
import { createInterface } from 'readline';
  
/**
 * * Главный класс где происходит вычесление площади различных геометрических фигур
 */
  class ConsoleDisplay {
     /**
      * readline интерфейс
      */
    private rl;
    /**
     *  объект класса ShapeCalculator
     */
    private calculator;
  
    constructor(private filePath: string) {
      // readline интерфейс
      this.rl = createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      //объект класса ShapeCalculator
      this.calculator = new ShapeCalculator(filePath);
    }
   /**
    *  * позволяет пользователю добавлять геометрические фигуры
    *  (круг, квадрат, треугольник, прямоугольник) и вычислять общую площадь всех фигур
    */
    public start() {
      this.rl.question(
        'Какую бы фигуру вы хотели добавить? (круг, квадрат, треугольник, прямоугольник)\n',
        // привязываем контекст метода handleInput() к класса ConsoleInterface
        this.handleInput.bind(this)
      );
    }
    /**
     *  Обрабатываем ввод пользователя и вызываем соответствующий метод
     */
    private handleInput(shape: string) {
      switch (shape) {
        case 'круг':
          this.handleCircleInput();
          break;
        case 'квадрат':
          this.handleSquareInput();
          break;
        case 'треугольник':
          this.handleTriangleInput();
          break;
        case 'прямоугольник':
          this.handleRectangleInput();
          break;
        default:
          console.log('Введена недопустимая величина.');
          this.rl.close();
      }
    }
    /** 
     *   Метод для вводa Кругa
     */
    private handleCircleInput() {
      // Запрашиваем у пользователя радиус круга
      this.rl.question('Введите радиус:\n', (radius) => {
         // вызываем метод addCircle() объекта ShapeCalculator, передавая в него радиус
        this.calculator.addCircle(Number(radius));
        this.printTotalAreaAndShapes();
      });
    }
     /**
      *  Метод для вводa Квадрата
      */
    private handleSquareInput() {
      // Запрашиваем у пользователя длину квадрата
      this.rl.question('Введите длину стороны:\n', (length) => {
        // вызываем метод addSquare() объекта ShapeCalculator, передавая в него длину  
        this.calculator.addSquare(Number(length));
        this.printTotalAreaAndShapes();
      });
    }
  
    /**
     * Метод для вводa Треугольникa
     */
    private handleTriangleInput() {
      // Запрашиваем у пользователя длину треугольника
      this.rl.question('Укажите длину стороны A:\n', (a) => {
         // Запрашиваем у пользователя длину треугольника
        this.rl.question('Введите длину стороны B:\n', (b) => {
          // Запрашиваем у пользователя длину треугольника
          this.rl.question('Укажите длину стороны C:\n', (c) => {
            // вызываем метод addTriangle() объекта ShapeCalculator, передавая длину
            this.calculator.addTriangle(Number(a), Number(b), Number(c));
            this.printTotalAreaAndShapes();
          });
        });
      });
    }
  
    /**
     *  Метод для вводa Прямоугольникa
     */
    private handleRectangleInput() {
      // Запрашиваем у пользователя длину прямоугольника
      this.rl.question('Введите длину:\n', (length) => {
        // Запрашиваем у пользователя длину прямоугольника
        this.rl.question('Введите ширину:\n', (width) => {
          // вызываем метод addRectangle() объекта ShapeCalculator, передавая длину
          this.calculator.addRectangle(Number(length), Number(width));
          this.printTotalAreaAndShapes();
        });
      });
    }
  
    /**
     *   Метод для вывода общей площади всех фигур
     */
    private printTotalAreaAndShapes() {
      // выводим общую площадь всех фигур
      this.calculator.printAllShapes();
      console.log(`Общая площадь: ${this.calculator.getTotalArea()}`);
      this.rl.close();
    }
  }
  
  export { ConsoleDisplay };