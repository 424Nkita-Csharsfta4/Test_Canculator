using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Canculate_Figur
{
    class Square:Figure
    {
        private double side;

        public Square(double side)
        {
            this.side = side;
        }

        //Вычисления площади
        public double GetArea()
        {
            return side * side;
        }

        //Вычисления периметра 
        public double GetPerimeter()
        {
            return 4 * side;
        }
        //Получения имени фигуры
        public string GetName()
        {
            return "Квадрат";
        }
    }
}
