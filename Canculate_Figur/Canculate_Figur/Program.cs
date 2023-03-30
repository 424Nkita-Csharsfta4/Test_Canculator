using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Canculate_Figur
{
    class Program
    {
        public static void Main(string[] args)
        {

            LoadShapesFromFile();
            bool exit = false;//Выход с программы

            //Меню с циклом пока User не ришит выйти с программы
            while (!exit)
            {
                Console.WriteLine("Выберите вариант:");
                Console.WriteLine("1 - Добавьте новую фигуру");
                Console.WriteLine("2 - Показ всех фигур");
                Console.WriteLine("3 - Общяя площядь фигур");
                Console.WriteLine("4 - Вывести общий периметр");
                Console.WriteLine("5 - Показ фигур по типу");
                Console.WriteLine("6 - Обновить файл с фигурами");
                Console.WriteLine("0 - Выход");
            


                int option = int.Parse(Console.ReadLine());
                Console.WriteLine();

                string circle = "  ooo  \n" +
                 " o   o \n" +
                 "o     o\n" +
                 " o   o \n" +
                 "  ooo  ";
                Console.WriteLine("{0,10}", circle);
                string square = "+-----+\n" +
                "|     |\n" +
                "|     |\n" +
                "|     |\n" +
                "+-----+";
                Console.WriteLine("{0,10}", square);
                string triangle = "    *    \n" +
                                   "   ***   \n" +
                                   "  *****  \n" +
                                   " ******* \n" +
                                   "*********\n";
                Console.WriteLine("{0,10}", triangle);
                string rectangle = "+------+\n" +
                   "|      |\n" +
                   "|      |\n" +
                   "+------+\n";
                Console.WriteLine("{0,10}", rectangle);
                switch (option)
                {
                    case 1:
                        AddShape();
                        break;
                    case 2:
                        PrintShapes();
                        break;
                    case 3:
                        PrintTotalArea();
                        break;
                    case 4:
                        PrintTotalPerimeter();
                        break;
                    case 5:
                        PrintShapesByType();
                        break;
                    case 6:
                        UpdateShapesFile();
                        break;
                    case 7:
                        Console.WriteLine("Error:Недопустимый вариант, попробуйте еще раз");
                        break;
                    case 0:
                        exit = true;
                        break;
                }
                Console.WriteLine();
            }
        }



        private static List<Figure> shapes = new List<Figure>();//Список объектов-фигур
        private static string shapesFilePath = "figure.txt";//Путь к файлу, из которого будут сохранены и загружены фигуры



        //Этот метод отвечает за загрузку фигур из файла
        private static void LoadShapesFromFile()
        {
            //Проверка на сущ. файла
            if (File.Exists(shapesFilePath))
            {
                try
                {
                    //Чтение строк с файла
                    string[] lines = File.ReadAllLines(shapesFilePath);
                    foreach (string line in lines)
                    {
                        //// Разделите строку запятой, чтобы получить данные о форме.
                        string[] shapeData = line.Split(',');
                        string shapeType = shapeData[0];
                        switch (shapeType)
                        {
                            case "Круг":
                                double radius = double.Parse(shapeData[1]);
                                Circle circle = new Circle(radius);
                                shapes.Add(circle);
                                break;
                            case "Квадрат":
                                double side = double.Parse(shapeData[1]);
                                Square square = new Square(side);
                                shapes.Add(square);
                                break;
                            case "Прямоугольник":
                                double width = double.Parse(shapeData[1]);
                                double height = double.Parse(shapeData[2]);
                                Rectangle rectangle = new Rectangle(width, height);
                                shapes.Add((Figure)rectangle);
                                break;
                            case "Треугольник":
                                double sideA = double.Parse(shapeData[1]);
                                double sideB = double.Parse(shapeData[2]);
                                double sideC = double.Parse(shapeData[3]);
                                Treangle triangle = new Treangle(sideA, sideB, sideC);
                                shapes.Add(triangle);
                                break;
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Ошибка при загрузке фигур из файла: {ex.Message}");
                }
            }
        }

        // Метод для записи информации об объектах фигур в файл
        private static void UpdateShapesFile()
        {
            try
            {
                // Создаем массив строк размером, равным количеству фигур в коллекции Фигур
                string[] lines = new string[shapes.Count];

                // Заполняем массив строк информацией о каждой фигуре
                for (int i = 0; i < shapes.Count; i++)
                {
                    // Используем string interpolation, чтобы записать тип и параметры каждой фигуры
                    lines[i] = $"{shapes[i].GetType().Name},{shapes[i].ToString()}";
                }

                // Записываем все строки массива lines в файл shapesFilePath
                // Перед этим убедимся, что путь к файлу корректный
                if (string.IsNullOrEmpty(shapesFilePath))
                {
                    Console.WriteLine("Ошибка записи в файл: путь к файлу не задан.");
                    return;
                }
                File.WriteAllLines(shapesFilePath, lines);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ошибка обновления файла фигур: {ex.Message}");
            }
        }

        private static void AddShape()
        {
            Console.WriteLine("Выберите фигуру:");
            Console.WriteLine("1 - Круг");
            Console.WriteLine("2 - Квадрат");
            Console.WriteLine("3 - Прямоугольник");
            Console.WriteLine("4 - Треугольник");

            int option = int.Parse(Console.ReadLine());
            Console.WriteLine();

            switch (option)
            {
                case 1:
                    Console.WriteLine("Введите радиус: ");
                    double radius = double.Parse(Console.ReadLine());
                    Circle circle = new Circle(radius);
                    shapes.Add(circle);
                    Console.WriteLine("Круг успешно добавлен!");
                    break;
                case 2:
                    Console.WriteLine("Введите сторону: ");
                    double side = double.Parse(Console.ReadLine());
                    Square square = new Square(side);
                    shapes.Add(square);
                    Console.WriteLine("Площадь добавлена успешно!");
                    break;
                case 3:
                    Console.WriteLine("Введите Ширену: ");
                    double width = double.Parse(Console.ReadLine());
                    Console.WriteLine("Введите Высоту: ");
                    double height = double.Parse(Console.ReadLine());
                    Rectangle rectangle = new Rectangle(width, height);
                    shapes.Add((Figure)rectangle);
                    Console.WriteLine("Прямоугольник добавлен успешно!");
                    break;
                case 4:
                    Console.WriteLine("Введите сторону: ");
                    double sideA = double.Parse(Console.ReadLine());
                    double sideB = double.Parse(Console.ReadLine());
                    double sideC = double.Parse(Console.ReadLine());
                    Treangle triangle = new Treangle(sideA, sideB, sideC);
                    shapes.Add(triangle);
                    Console.WriteLine("Треугольник успешно добавлен!");
                    break;
                default:
                    Console.WriteLine("Error: Неверный вариант, попробуйте еще раз");
                    break;
            }
        }

        private static void PrintShapes()
        {
            if (shapes.Count == 0)
            {
                Console.WriteLine("Фигуры еще не добавлены");
                return;
            }

            Console.WriteLine("Все фигуры:");
            foreach (var shape in shapes)
            {
                Console.WriteLine($"- {shape.GetName()}:");
                Console.WriteLine($"   Площадь: {shape.GetArea()}");
                Console.WriteLine($"   Периметр: {shape.GetPerimeter()}");
            }
        }

        //Общяя площядь всех фигур в списке
        private static void PrintTotalArea()
        {
            //Если список пуст, выводится что фигуры пусты
            if (shapes.Count == 0)
            {
                Console.WriteLine("Фигуры еще не добавлены");
                return;
            }

            double totalArea = 0;
            foreach (var shape in shapes)
            {
                totalArea += shape.GetArea();
            }

            Console.WriteLine($"Общая площадь: {totalArea}");
        }

        private static void PrintTotalPerimeter()
        {
            //Если список пуст, выводится что фигуры пусты
            if (shapes.Count == 0)
            {
                Console.WriteLine("Фигуры еще не добавлены");
                return;
            }

            double totalPerimeter = 0;
            foreach (var shape in shapes)
            {
                totalPerimeter += shape.GetPerimeter();
            }

            Console.WriteLine($"Общий периметр: {totalPerimeter}");
        }

        //Метод выводит количество фигур каждого типа
        private static void PrintShapesByType()
        {
            //Если список пуст, выводится что фигуры пусты
            if (shapes.Count == 0)
            {
                Console.WriteLine("Фигуры еще не добавлены");
                return;
            }

            //Словарь для хранения количества фигур каждого типа
            Dictionary<string, int> shapesByType = new Dictionary<string, int>();

            //Проходим по всем фигурам в списке и добавляем количество фигур каждого типа в словарь
            foreach (var shape in shapes)
            {
                string shapeName = shape.GetName();
                if (shapesByType.ContainsKey(shapeName))
                {
                    shapesByType[shapeName]++;
                }
                else
                {
                    shapesByType.Add(shapeName, 1);
                }
            }
            // Выводим количество фигур каждого типа
            Console.WriteLine("Фигуры по типам: ");
            foreach (var entry in shapesByType)
            {
                Console.WriteLine($"- {entry.Key}: {entry.Value}");

            }
        }
    }
}

