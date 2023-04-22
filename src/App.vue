<template>
  <UIConsole :commands="commands" />
</template>

<script lang="ts" setup>
import UIConsole from './components/ui-console/UI-console.vue';
import { CommandModel } from "./components/ui-console/models/CommandModel";

const commands = [
  new CommandModel('help', (parameters: string) => {
    console.log('Все комманды')
  }, () => {
    return 'Посмотреть все команды: help'
  }),
  new CommandModel('add', (parameters: string) => {
    const [figure, ...params] = parameters.split(' ');
    console.log(`Фигура ${figure} добавлена с параметрами: ${params.join(', ')}`);
    console.log('Добавить фигуру');
  }, () => {
    return 'Добавление фигур: add'
  }),
  new CommandModel('download', (parameters: string) => {
    console.log('Скачивание файла');
  }, () => {
    return 'Скачивание файйла с фигурами и их параметрами: download'
  }),
  new CommandModel('history', (parameters: string) => {
    console.log('История команд');
  }, () => {
    return 'Показать историю введенных команд: history'
  }),
];

</script>

<style >
h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

h2 {
  font-size: 1.5rem;
  margin-top: 2rem;
}

div {
  margin: 2rem auto;
  max-width: 800px;
  padding: 0 1rem;
}

.container {
  display: flex;
  justify-content: space-around;
}
</style>