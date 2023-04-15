<template>
    <div>
        <h3>Длина + Ширина</h3>
        <ul>
            <li v-for="(shape, index) in shapeHistory" :key="index">{{ shape }}</li>
        </ul>
    </div>
</template>
  
<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
    shapeHistory: {
        type: Array as () => string[],
        required: true,
    },
});
</script>
  