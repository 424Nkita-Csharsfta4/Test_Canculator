import { ShapeCalculator } from './main';
import { createInterface } from 'readline';

/**
 * Класс App, принимающий путь к файлу JSON для сохранения данных о добавленных фигурах.
 */
class App {

  /**
   * Объявление приватных свойств класса интерфейс readline
   */
  private rl: any;
  /**
   * Объявление приватных свойств класса экземпляр класса ShapeCalculator
   */
  private calculator: ShapeCalculator;

  /**
   * Конструктор класса, принимающий путь к файлу с данными
   */
  constructor(private filePath: string) {
    /**
     * Создание интерфейса для взаимодействия с пользователем через консоль
     */
    this.rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    /**
     * Создание экземпляра класса ShapeCalculator для обработки данных о фигурах
     */
    this.calculator = new ShapeCalculator(filePath);
    /**
     * Привязка контекста функции handleCircleInput к текущему экземпляру класса
     */
    this.handleCircleInput = this.handleCircleInput.bind(this);
  }

  /**
   * Метод запуска приложения
   */
  public run() {
    /**
     *  Функция для запроса у пользователя ввода новой фигуры
     */
    const askForShape = () => {
      this.rl.question(
        'Какую бы фигуру вы хотели добавить?\n (1) круг, \n2) квадрат,\n  3) треугольник,\n  4) прямоугольник,\n  5) вся площадь и количество фигур)\n',
        this.handleInput.bind(this)
      );
    };
    
    /**
     * Запрос первой фигуры
     */
    askForShape();
    
   /**
    * Запуск цикла, чтобы пользователь мог продолжать добавлять фигуры
    */
    this.rl.on('close', () => {
      console.log('До свидания!');
      process.exit(0);
    });
    
    this.rl.on('line', () => {
      askForShape();
    });
  }
  

  /**
   *  Метод вывода общей площади и количества фигур в консоль
   */
  public printTotalAreaAndShapes() {
    const totalArea = this.calculator.calculateTotalArea();
    const totalShapes = this.calculator.getTotalShapesCount();
    console.log(`Общая площадь всех фигур: ${totalArea}`);
    console.log(`Количество фигур: ${totalShapes}`);
  }

  /**
   * 
   * Обработчик ввода пользователя, вызывающий соответствующие методы добавления 
   */
  private handleInput(shape: string) {
    switch (shape) {
      case '1':
        this.rl.question('Введите радиус:\n', this.handleCircleInput);
        break;
      case '2':
        this.rl.question('Введите длину стороны:\n', (input) => this.handleSquareInput(input));
        break;
      case '3':
        this.handleTriangleInput();
        break;
      case '4':
        this.handleRectangleInput();
        break;
      case '5':
        this.printTotalAreaAndShapes();
        break;
      default:
        console.log('Введена недопустимая величина.');
        break;
    }
  }

  /**
   *  Обработчик ввода пользователя для круга
   */
  private handleCircleInput(input: string) {
    const radius = Number(input);
    if (isNaN(radius)) {
      console.log('Ошибка: радиус должен быть числом.');
      this.rl.prompt();
      return;
    }
    this.calculator.addCircle(radius);
    this.rl.prompt();
  }

   /**
   *  Обработчик ввода пользователя для крвадрат
   */
  private handleSquareInput(input: string) {
    const length = Number(input);
    if (isNaN(length)) {
      console.log('Ошибка: длина должна быть числом.');
      this.rl.prompt();
      return;
    }
    this.calculator.addSquare(length);
    this.rl.prompt();
  }

  /**
   *  Обработчик ввода пользователя для треугольник
   */
  private handleTriangleInput() {
    const onInputReceived = (input: string) => {
      const [a, b, c] = input.split(',').map(Number);
      this.calculator.addTriangle(a, b, c);
      this.rl.prompt();
    };
    this.rl.question('Введите длины сторон треугольника, разделенные точкой с запятой (например, 5,7,8):\n', onInputReceived);
  }

    /**
   *  Обработчик ввода пользователя для прямоугольника
   */
  private handleRectangleInput() {
    const onLengthAndWidthReceived = (input: string) => {
      const [length, width] = input.split(',').map(Number);
      this.calculator.addRectangle(length, width);
      this.rl.prompt();
    };
    this.rl.question('Введите длину и ширину прямоугольника, разделенные точкой с запятой (например, 5,7):\n', onLengthAndWidthReceived);
  }
}

// Создание экземпляра приложения
const app = new App('./shapes.json');
// Запуск приложения
app.run();
