<template>
  <div>
    <h3>Команды</h3>
    <ul>
      <li v-for="(command, index) in commandHistory" :key="index">{{ command }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  commandHistory: {
    type: Array as () => string[],
    required: true,
  },
});

</script>
