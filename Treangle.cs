using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Canculate_Figur
{
    //Треугольник
    class Treangle:Figure
    {
        private double sideA;
        private double sideB;
        private double sideC;

        public Treangle(double sideA, double sideB, double sideC)
        {
            this.sideA = sideA;
            this.sideB = sideB;
            this.sideC = sideC;
        }

        //Вычисления площади 
        public double GetArea()
        {
            double p = (sideA + sideB + sideC) / 2;
            return Math.Sqrt(p * (p - sideA) * (p - sideB) * (p - sideC));
        }
        //Вычисления периметра 
        public double GetPerimeter()
        {
            return sideA + sideB + sideC;
        }

        //Получения имени фигуры
        public string GetName()
        {
            return "Треугольник";
        }
    }
}
