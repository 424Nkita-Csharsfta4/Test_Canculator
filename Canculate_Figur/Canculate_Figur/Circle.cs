using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Canculate_Figur
{
    class Circle:Figure
    {
        private double radius;

        public Circle(double radius)
        {
            this.radius = radius;
        }

        //Вычисления площади
        public double GetArea()
        {
            return Math.PI * radius * radius;
        }

        //Вычисления периметра 
        public double GetPerimeter()
        {
            return 2 * Math.PI * radius;
        }

        //Получения имени фигуры
        public string GetName()
        {
            return "Круг";
        }
    }
}
