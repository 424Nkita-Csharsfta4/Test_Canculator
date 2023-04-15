<template>
  <div>
    <label for="enter-command">Введите команду: </label>
    <input class="input_write" type="text" id="enter-command" v-model="command" placeholder="Команды">
    <button @click="enterCommand">Отправить</button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { Figure } from '@/canculate/Figure';
import type { ICommand } from '@/canculate/Icomands';
import { Commands } from '@/canculate/commands';

/**
 * реактивной переменной для хранения введенной пользователем команды
 */
const command = ref('');

/**
 * функция для выполнения введенной пользователем команды
 */
function enterCommand() {
  /**
   * получение введенной пользователем команды
   */
  const inputCommand = command.value.trim();
  if (inputCommand) {
    /**
     * разбиение команды на имя команды и параметры
     */
    const [name, params] = inputCommand.split(' ');
    /**
     * поиск команды среди доступных команд
     */
    const command = Commands.find((c: ICommand) => c.name === name);
    if (command) {
      /**
       * выполнение команды над фигурами
       */
      command.execute(shapes.value, params);
    } else {
      /**
       *  вывод сообщения об ошибке, если команда не найдена
       */
      console.error(`Неизвестная команда: ${name}`);
    }
  }
}

/**
 * реактивной переменной для хранения списка фигур
 */
const shapes = ref<Figure[]>([]);
</script>
<style>
label {
  font-size: 1.2rem;
  margin-right: 1rem;
}

.input_write {
  font-size: 1rem;
  width: 200px;
  height: 20px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-right: 1rem;
}

button {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #3e8e41;
}
</style>