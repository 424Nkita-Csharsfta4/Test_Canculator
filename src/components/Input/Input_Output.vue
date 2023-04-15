<template>
  <div>
    <h2>Ширина</h2>
    <table>
      <thead>
        <tr>
          <th>Тип</th>
          <th>Длина</th>
          <th>Периметр</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(shape, index) in shapes" :key="index">
          <td>{{ shape.name }}</td>
          <td>{{ shape.getArea() }}</td>
          <td>{{ shape.getPerimeter() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
import type { Figure } from '@/canculate/Figure';

const props = defineProps({
  shapes: {
    type: Array as () => Figure[],
    required: true,
  },
});

</script>
<style>
h2 {
  font-size: 1.5rem;
  margin-top: 2rem;
}

table {
  margin: 2rem auto;
  max-width: 800px;
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
</style>