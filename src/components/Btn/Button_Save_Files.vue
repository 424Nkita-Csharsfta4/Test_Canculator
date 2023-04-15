<template>
    <div>
        <button class="button_download" @click="downloadShapes">Скачать файл</button>
    </div>
</template>
  
<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Figure } from '@/canculate/Figure';
/**
 *  Import функции saveAs из библиотеки file-saver
 */
import { saveAs } from 'file-saver';

/**
 * Определение пропсов компонента с помощью функции defineProps
 */
const props = defineProps({
    shapes: {
        type: Array as () => Figure[],
        required: true,
    },
});

/**
 * Функция downloadShapes для сохранения фигур в файл
 */
const downloadShapes = () => {
    /**
     * Создание JSON-строки из массива фигур с их данными
     */
    const shapesData = JSON.stringify(
        /**
         * для каждой фигуры, в котором указываем ее тип (получаемый с помощью метода getArea)
         */
        props.shapes.map((shape) => {
            /**
             * проходимся по всем ключам объекта shape и добавляем их в shapeData, если они не являются функциями
             */
            const shapeData: Record<string, unknown> = { type: shape.getArea };
            /**
             * фигуры и добавление их в объект с данными о фигуре
             */
            for (const key in shape) {
                if (typeof shape[key as keyof Figure] !== 'function') {
                    shapeData[key] = shape[key as keyof Figure];
                }
            }

            return shapeData;
        })
    );
    /**
     * Создание файла и сохранение его с помощью функции saveAs
     */
    const blob = new Blob([shapesData], { type: 'application/json' });
    saveAs(blob, 'shapes.json');
};

</script>
  
<style scoped>
.button_download {
    background-color: #f7ca28;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    margin-top: 1em;
}
</style>