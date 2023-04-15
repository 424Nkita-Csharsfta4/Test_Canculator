<template>
  <div>
    <h1>Канкулятор фигур</h1>
    <div class="container">
      <CommandInput @enter-command="enterCommand" />
    </div>

    <ShapesTable :shapes="shapes" />

    <div>
      <h2>История</h2>
      <CommandHistory :shape-history="commandHistory" />
      <ShapeHistory :shape-history="shapeHistory" />
    </div>

    <Button_Help />
    <DownloadShapesButton :shapes="shapes" />
    
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CommandInput from './components/Input/Input_Wrire.vue';
import ShapesTable from './components/Input/Input_Output.vue';
import CommandHistory from './components/Input/ShapeHistory.vue';
import ShapeHistory from './components/Input/ShapeHistory.vue';
import DownloadShapesButton from './components/Btn/Button_Save_Files.vue';
import Button_Help from './components/Btn/Button_Help.vue';
import type { Figure } from '@/canculate/Figure';
import { App } from '@/canculate/App';
import { saveAs } from 'file-saver';

const shapes = ref([] as Figure[]);
const commandHistory = ref([] as string[]);
const shapeHistory = ref([] as string[]);

const enterCommand = (command: string) => {
  const [commandName, commandParams] = App.Commands(command);
  const commandObj = App.Commands.find((cmd: { name: any; }) => cmd.name === commandName);

  if (commandObj) {
    commandObj.execute(commandParams, shapes.value);
    commandHistory.value.push(command);
    shapeHistory.value.push(
      shapes.value.map((shape) => JSON.stringify(shape)).join(', ')
    );
  }
};

const downloadShapes = () => {
  const content = shapeHistory.value.join('\n');
  const filename = 'shapes.txt';
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, filename);
};
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
.container{
  display: flex;
  justify-content: space-around;
}

</style>