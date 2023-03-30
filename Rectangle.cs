using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Canculate_Figur
{
    class Rectangle
    {
        private double width;
        private double height;

        public Rectangle(double width, double height)
        {
            this.width = width;
            this.height = height;
        }

        //Вычисления площади
        public double GetArea()
        {
            return width * height;
        }

        //Вычисления периметра 
        public double GetPerimeter()
        {
            return 2 * (width + height);
        }

        //Получения имени фигуры
        public string GetName()
        {
            return "Прямоугольник";
        }
    }
}
