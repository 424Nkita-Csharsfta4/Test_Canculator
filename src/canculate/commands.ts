/**
 * Импортируем тип фигуры из модуля 'Figure'
 */
import type { Figure } from './Figure';

/**
 * Импортируем интерфейс команды из модуля 'Icomands'
 */
import type { ICommand } from './Icomands';

import { Circle } from './circle/circle';
import { Rectangle } from './rectangle/rectangle';
import { Square } from './square/square';
import { Triangle } from './treangle/treangle';

/**
 * Экспортируем массив команд
 */
export const Commands: ICommand[] = [
  {
    name: 'Добавить',
    execute: (shapes: Figure[], params: string) => {
      /**
       * Разбиваем строку параметров на тип фигуры и её параметры
       */
      const [type, ...args] = params.split(' ');
      /**
       * Создаем фигуру с помощью функции createFigure
       */
      const figure = createFigure(type, args);
      /**
       * Если фигура успешно создана, добавляем её в массив фигур
       */
      if (figure) {
        shapes.push(figure);
      }
    },
  },
  {
    name: 'Удалить',
    execute: (shapes: Figure[], params: string) => {
      /**
       * Парсим индекс фигуры для удаления
       */
      const index = parseInt(params);
      /**
       * Если индекс валидный, удаляем фигуру из массива
       */
      if (!isNaN(index) && index >= 0 && index < shapes.length) {
        shapes.splice(index, 1);
      }
    },
  },
];

/**
 * Функция для создания фигур
 */
function createFigure(type: string, args: string[]): Figure | undefined {
  switch (type) {
    case 'Круг':
      const radius = parseFloat(args[0]);
      /**
       * Если радиус валидный, возвращаем новый экземпляр класса Circle
       */
      if (!isNaN(radius)) {
        return new Circle(radius, args[0]);
      }
      break;
    case 'Прямоугольник':
      const width = parseFloat(args[0]);
      const height = parseFloat(args[1]);
      /**
       * Если ширина и высота валидны, возвращаем новый экземпляр класса Rectangle
       */
      if (!isNaN(width) && !isNaN(height)) {
        return new Rectangle(width, height, args[0]);
      }
      break;
    case 'Треугольник':
      const a = parseFloat(args[0]);
      const b = parseFloat(args[1]);
      const c = parseFloat(args[2]);
      /**
       * Если длины сторон валидны, возвращаем новый экземпляр класса Triangle
       */
      if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
        return new Triangle(a, b, c, args[0]);
      }
      break;
    case 'Квадрат':
      const side = parseFloat(args[0]);
      /**
       * Если длина стороны валидна, возвращаем новый экземпляр класса Square
       */
      if (!isNaN(side)) {
        return new Square(side, args[0]);
      }
      break;
    default:
      /**
       * Если длина стороны валидна, возвращаем новый экземпляр класса Square
       */
      return undefined;
  }
}