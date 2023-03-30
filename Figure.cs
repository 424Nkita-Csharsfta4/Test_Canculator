using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Canculate_Figur
{
    interface Figure
    {
        double GetArea(); // Метод для вычисления площади фигуры.
        double GetPerimeter();// Метод для вычисления периметра фигуры.
        string GetName();// Метод для получения названия фигуры.
    }
}
