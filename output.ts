import { ShapeCalculator } from './main';
import { createInterface } from 'readline';

/**
 * класса App, принимающий путь к файлу JSON для сохранения данных о добавленных фигурах.
 */
class App {

  constructor(private filePath: string) {
    /**
     *Создание экземпляра интерфейса для взаимодействия с пользователем
     */
    this.rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    /**
     *  Создание экземпляра класса ShapeCalculator
     */
    this.calculator = new ShapeCalculator(filePath);
  }
  /**
  * readline интерфейс
  */
  private rl;

  /**
  *  объект класса ShapeCalculator
  */
  private calculator;

  /**
  *  метод, который запускает программу
  */
  public Run() {
    /**
     * Запрос на ввод пользователем фигуры
     */
    this.rl.question(
      'Какую бы фигуру вы хотели добавить? (круг, квадрат, треугольник, прямоугольник)\n',
      this.handleInput.bind(this)
    );
  }
  /**
   * Обработка ввода пользователем фигуры
   */
  private handleInput(shape: string) {
    switch (shape) {
      case 'круг':
        /**
         * Запрос на ввод пользователем радиуса
         */
        this.rl.question('Введите радиус:\n', this.handleCircleInput);
        break;
      /**
       * Запрос на ввод пользователем радиуса
       */
      case 'квадрат':
        this.rl.question('Введите длину стороны:\n', (input) => this.handleSquareInput(input));
        break;
      case 'треугольник':
        /**
         *  Запрос на ввод пользователем длин сторон треугольника
         */
        this.handleTriangleInput();
        break;
      case 'прямоугольник':
        /**
         *  Запрос на ввод пользователем длины и ширины прямоугольника
         */
        this.handleRectangleInput();
        break;
      default:
        console.log('Введена недопустимая величина.');
        this.rl.close();
    }
  }


  /**
   *  Обработка ввода пользователем радиуса круга
   */
  private handleCircleInput(input: string) {
    const radius = Number(input);
    if (isNaN(radius)) {
      console.log('Ошибка: радиус должен быть числом.');
      return;
    }
    /**
     *  Добавление круга в список фигур и вывод общей площади всех фигур
     */
    this.calculator.addCircle(radius);
    this.printTotalAreaAndShapes();
  }

  /**
   *  Приватный метод, обрабатывающий ввод пользователя для квадрата
   */
  private handleSquareInput(input: string) {
    /**
     * Преобразует ввод пользователя в число
     */
    const length = Number(input);
    /**
     * Проверяет, является ли введенное
     */
    if (isNaN(length)) {
      console.log('Ошибка: длина должна быть числом.');
      return;
    }
    /**
     * Добавляет квадрат в список фигур, рассчитывает и выводит общую площадь фигур
     */
    this.calculator.addSquare(length);
    this.printTotalAreaAndShapes();
  }


  /**
   * Приватный метод, обрабатывающий ввод пользователя для треугольника
   */
  private handleTriangleInput() {
    /**
     * Запрашиваем у пользователя стороны треугольника
     */
    this.rl.question('Введите длины сторон треугольника, разделенные точкой с запятой (например, 5;7;8):\n', (input) => {
      const [a, b, c] = input.split(';');
  
      /**
       * Добавляет треугольник в список фигур, рассчитывает и выводит общую площадь фигур
       */
      this.calculator.addTriangle(Number(a), Number(b), Number(c));
      this.printTotalAreaAndShapes();
    });
  }
  
  /**
   * ввод пользователя для прямоугольника
   */
  private handleRectangleInput() {
    /**
     *  Запрашивает у пользователя ввод длин сторон прямоугольника
     */
    this.rl.question('Введите длину:\n', (length) => {
      this.rl.question('Введите ширину:\n', (width) => {
        /**
         * Добавляет прямоугольник в список фигур, рассчитывает и выводит общую площадь фигур
         */
        this.calculator.addRectangle(Number(length), Number(width));
        this.printTotalAreaAndShapes();
      });
    });
  }

  /**
   * Вывод всех фигур общую площадь всех добавленных фигур и запрашивающий у пользователя, 
   * хочет ли он добавить еще фигуру
   */
  private printTotalAreaAndShapes() {

    /**
     *  вывод на экран всех добавленные фигуры
     */
    this.calculator.printAllShapes();
    /**
     * Задает вопрос пользователю, хочет ли он добавить еще фигуру
     */
    this.rl.question(
      'Хотите добавить еще фигуру? (да/нет)\n',
      (answer) => {
        /**
         *  Если "да", запрашивает тип фигуры
         */
        if (answer === 'да') {
          this.rl.question(
            /**
             * ввод к текущему экземпляру класса App
             */
            'Какую бы фигуру вы хотели добавить? (круг, квадрат, треугольник, прямоугольник)\n',
            this.handleInput.bind(this)
          );
        } else {
          /**
           * Если "нет", выводит на экран то пока
           */
          console.log('Пока!');
          this.rl.close();
        }
      }
    );
  }
}
/**
 * Создание экземпляра класса App с указанием пути к файлу с данными и запуск приложения app.Run();
 */
const app = new App('./shapes.json');
app.Run();
