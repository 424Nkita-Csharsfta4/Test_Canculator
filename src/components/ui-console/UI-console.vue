<template>
    <div class="terminal">
        <h1 class="title">Консольное Web приложение</h1>
        <p>Все команды:</p>
        <div v-for="key in commands" :key="key.name" class="command">{{ key.help() }}</div>


        <div class="UI-console" ref="console">
            <div class="input-wrapper">
                <span class="prompt">$&nbsp;</span>
                <input type="text" v-model="commandValue" class="input"
                    @keydown.enter="sendCommands" />
            </div>
            <div v-for="output in commandOutputs" :key="output" class="output">{{ output }}</div>
            <div ref="outputEnd"></div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, defineProps, watchEffect } from 'vue';
import { CommandModel } from "./models/CommandModel";

const MAX_HISTORY_LENGTH = 5; // максимальная длина истории
const commandValue = ref("");
const commandOutputs = ref([]);
const commandHistory = ref([]);
const commandNumber = ref(1); // добавляем переменную для хранения номера команды

const props = defineProps<{
    commands: Array<CommandModel>
}>();

const sendCommands = () => {
    const [commandName, parameters] = commandValue.value.split(" ");
    const command = props.commands.find((key) => key.name === commandName);
    if (command) {
        if (parameters === "--help") {
            commandOutputs.value.push(command.help());
        } else if (commandName === "add") {
            commandOutputs.value.push("Введите параметры для фигуры (например, add rectangle 10 20)");
        } else if (commandName === "start") {
            commandOutputs.value.push("Фигура создана со следующими параметрами: " + parameters);
        } else if (commandName === "download") {

            const link = document.createElement("a");

            link.setAttribute("download", "");
            link.click();
            commandOutputs.value.push("Файл успешно скачан");
        } else if (commandName === "history") {
            if (commandHistory.value.length > 0) {
                commandOutputs.value.push("История команд:");
                commandHistory.value.forEach((command) => {
                    commandOutputs.value.push(command);
                });
            } else {
                commandOutputs.value.push("История команд пуста");
            }
        } else {
            const output = command.execute(parameters);
            commandOutputs.value.push(output);
            // добавляем команду в историю
            commandHistory.value.push(`[${commandNumber.value++}] ${commandValue.value}`);
            // ограничив аем длину истории, если она превышает максимально допустимую
            if (commandHistory.value.length > MAX_HISTORY_LENGTH) {
                commandHistory.value.shift();
            }
        }
    } else {
        commandOutputs.value.push("Команда не найдена. Введите 'help', чтобы увидеть список доступных команд");
    }
    commandValue.value = ""; // очищаем поле ввода

};

watchEffect(() => {
    // при изменении вывода команд прокручиваем к концу
    const outputEnd = commandOutputs.value[commandOutputs.value.length - 1];
    if (outputEnd && typeof outputEnd.scrollIntoView === 'function') {
  outputEnd.scrollIntoView();
}


});

</script>
<style>
.terminal {
  background-image: url('https://i.pinimg.com/564x/9e/9f/73/9e9f73e0fde9d4c127490f1c3c8b3744.jpg');
  background-color: rgba(0, 0, 0, 0.5); 
  color: #ffff00; 
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  font-size: 14px;
  padding: 20px;
  overflow: auto;
  background-position: center;
  filter: brightness(60%);
}


.terminal h1.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.terminal p {
  margin-bottom: 10px;
}

.terminal .command {
  margin-bottom: 5px;
  color: #f6ff00;
}

.terminal .input-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.terminal .prompt {
  color: #98c379;
  margin-right: 5px;
}

.terminal .input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #98c379;
  color: #ffffff;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  font-size: 14px;
  outline: none;
  flex-grow: 1;
  padding: 0;
  margin-left: 5px;
}

.terminal .output {
  margin-bottom: 5px;
  color: #ff0000;
}

.terminal .UI-console {
  flex-grow: 1;
  overflow-y: auto;
}


.title {
    text-align: center;
    margin-bottom: 20px;
}

.command {
    margin-bottom: 5px;
}

.input-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.prompt {
    color: #fff200;
    margin-right: 5px;
}

.input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #00ff00;
    color: #ffffff;
    font-family: monospace;
    font-size: 16px;
    outline: none;
    flex-grow: 1;
    padding: 0;
    margin-left: 5px;
}

.output {
    margin-bottom: 5px;
}

.UI-console {
    flex-grow: 1;
    overflow-y: auto;
}
</style>
