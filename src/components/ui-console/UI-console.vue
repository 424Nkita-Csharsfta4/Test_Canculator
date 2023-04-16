<template>
    <div>
        
        <div>
            <h2>Введите фигуру:</h2>
            <input v-model="shapeInput" placeholder="Shape name" />
            <button @click="addShape">Добавить</button>
        </div>
        <div>
            <h2>Фигуры:</h2>
            <ul>
                <li v-for="(shape, index) in shapes" :key="index">{{ shape }}</li>
            </ul>
        </div>
        <div>
            <p>Итого: {{ shapes.length }}</p>
            <p>Круги:{{ countShapes("круг") }}</p>
            <p>Квад: {{ countShapes("квадрат") }}</p>
            <p>Прямоугольники: {{ countShapes("rectпрямоугольникangle") }}</p>
            <p>Треугольники: {{ countShapes("треугольник") }}</p>
            <p>Площадь: {{ getTotalArea() }}</p>
            <p>Периметр: {{ getTotalPerimeter() }}</p>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Icomands } from '@/canculate/Icomands';
import type { Circle } from '@/canculate/circle/circle';
import type { Square } from '@/canculate/square/square';
import type { Triangle } from '@/canculate/treangle/treangle';
import { Rectangle } from '@/canculate/rectangle/rectangle';

const shapes = ref<Icomands[]>([]);
const shapeInput = ref('');

const addShape = () => {
    switch (shapeInput.value.toLowerCase()) {
        case 'круг':
            shapes.value.push(new Circle(parseFloat(prompt('Введите радиус: '))));
            break;
        case 'квадрат':
            shapes.value.push(new Square(parseFloat(prompt('Войдите в сторону: '))));
            break;
        case 'прямоугольник':
            const w = parseFloat(prompt('Введите ширину: '));
            const h = parseFloat(prompt('Введите высоту: '));
            shapes.value.push(new Rectangle(w, h));
            break;
        case 'треугольник':
            const a = parseFloat(prompt('Введите сторону A: '));
            const b = parseFloat(prompt('Введите сторону B: '));
            const c = parseFloat(prompt('Введите сторону C: '));
            shapes.value.push(new Triangle(a, b, c));
            break;
        default:
            alert('Нет такой фигуры');
    }
    shapeInput.value = '';
};

const countShapes = (type: string) =>
    computed(() => shapes.value.filter((shape) => shape.type === type).length);

const getTotalArea = computed(() =>
    shapes.value.reduce((total, shape) => total + shape.getArea(), 0)
);

const getTotalPerimeter = computed(() =>
    shapes.value.reduce((total, shape) => total + shape.getPerimeter(), 0)
);
</script>
  