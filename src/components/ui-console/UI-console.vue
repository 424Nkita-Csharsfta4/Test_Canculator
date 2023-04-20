<template>
    <div class="terminal">
        <h1 class="title">Консольное Web приложение</h1>
        <p>Все команды:</p>
        <div v-for="command in commands" :key="command.name" class="command">{{ command.help() }}</div>
        <div class="UI-console" ref="console">
            <div class="input-wrapper">
                <span class="prompt">$&nbsp;</span>
                <input type="text" v-model="commandValue" class="input" @keydown.enter="sendCommands" />
            </div>
            <div v-for="(output, index) in commandOutputs" :key="index" class="output">{{ output }}</div>
            <div ref="outputEnd"></div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { CommandModel } from "./models/CommandModel";
import { Circle } from "@/canculate/circle/circle";
import { Rectangle } from "@/canculate/rectangle/rectangle";
import { Square } from "@/canculate/square/square";
import { Triangle } from "@/canculate/treangle/treangle";

const MAX_HISTORY_LENGTH = 5;
const commandValue = ref("");
const commandOutputs = ref<string[]>([]);
const commandHistory = ref<string[]>([]);

const props = defineProps<{
    commands: CommandModel[];
}>();

const sendCommands = () => {
    const [commandName, ...args] = commandValue.value.trim().split(/\s+/);
    const command = props.commands.find((c) => c.name.toLowerCase() === commandName.toLowerCase());
    if (!command) {
        commandOutputs.value.push(`Команда "${commandName}" не найдена`);
        commandValue.value = "";
        return;
    }

    let output: string;
    switch (commandName) {
        case "help":
            output = "Доступные команды:\n" + props.commands.map(c => c.help()).join("\n");
            break;
        case "clear":
            commandOutputs.value = [];
            break;
        case "history":
            output = commandHistory.value.map((cmd, i) => `${i + 1}. ${cmd}`).join("\n");
            break; 
        case "calc":
            if (args.length !== 3) {
                output = "Неверное количество аргументов. Используйте: calc <число1> <операция> <число2>";
            } else {
                const [num1, op, num2] = args;
                const n1 = parseFloat(num1);
                const n2 = parseFloat(num2);
                if (isNaN(n1) || isNaN(n2)) {
                    output = "Неверный формат чисел";
                } else {
                    switch (op) {
                        case "+":
                            output = `${n1} + ${n2} = ${n1 + n2}`;
                            break;
                        case "-":
                            output = `${n1} - ${n2} = ${n1 - n2}`;
                            break;
                        case "*":
                            output = `${n1} * ${n2} = ${n1 * n2}`;
                            break;
                        case "/":
                            if (n2 == 0) {
                                output = "Деление на ноль невозможно";
                            } else {
                                output = `${n1} / ${n2} = ${n1 / n2}`;
                            }
                            break;
                        default:
                            output = "Неверный оператор";
                            break;
                    }
                }
            }
            break;
        case "circle": if (args.length !== 2) {
            output = "Неверное количество аргументов. Используйте: circle<радиус>";
        }
        else {
            const radius = parseFloat(args[0]);
            if (isNaN(radius)) {
                output = "Неверный формат радиуса";
            }
            else {
                const circle = new Circle(radius, "Круг");
                output = `Площадь круга с радиусом ${radius} = ${circle.getArea().toFixed(2)}, длина окружности = ${circle.getArea().toFixed(2)}`;
            }
        }
            break;
        case "rectangle":
            if (args.length !== 2) {
                output = "Неверное количество аргументов.Используйте: rectangle <ширина> <высота>";
            }
            else {
                const width = parseFloat(args[0]);
                const height = parseFloat(args[1]);
                if (isNaN(width) || isNaN(height)) {
                    output = "Неверный формат размеров";
                }
                else {
                    const rectangle = new Rectangle(width, height, "Треугольник");
                    output = `Площадь прямоугольников со сторонами ${width} ${height} = ${rectangle.getArea().toFixed(2)},периметр = ${rectangle.getPerimeter().toFixed(2)}}`;
                }
            }
            break;
        case "square":
            if (args.length !== 1) {
                output = "Неверное количество аргументов. Используйте: square <сторона>";
            }
            else {
                const side = parseInt(args[0]);
                if (isNaN(side)) {
                    output = "Неверный формат размера стороны";
                }
                else {
                    const square = new Square(side, "Квадрат");
                    output = `Площадь квадрата со стороной ${side} = ${square.getArea().toFixed(2)},
                                    периметр = ${square.getPerimeter().toFixed(2)}}`;
                }
            }
            break;
     case "triangle":
        if (args.length !== 3) {
            output = "Неверное количество аргументов. Используйте: triangle <сторона1> <сторона2> <сторона3>";
        } else {
            const [sideA, sideB, sideC] = args.map(parseFloat);
            if (isNaN(sideA) || isNaN(sideB) || isNaN(sideC)) {
                output = "Неверный формат сторон";
            } else {
                const triangle = new Triangle(sideA, sideB, sideC, "Треугольник");
                output = `Площадь треугольника со сторонами ${sideA}, ${sideB} и ${sideC} = ${triangle.getArea().toFixed(2)}, периметр = ${triangle.getPerimeter().toFixed(2)}`;
            }
        }
        break;
    }
    
    // выводим результат выполнения команды
    if (output !== undefined) {
        commandOutputs.value.push(`${commandValue.value}\n${output}`);
        commandValue.value = "";
    } else {
        commandOutputs.value.push(`${commandValue.value}`);
        commandValue.value = "";
    }

    // добавляем команду в историю
    commandHistory.value.push(commandValue.value);
    if (commandHistory.value.length > MAX_HISTORY_LENGTH) {
        commandHistory.value.shift();
    }
}
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

.terminal.command {
    margin-bottom: 5px;
    color: #ffffff;
}

.terminal.input-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.terminal.prompt {
    color: #98c379;
    margin-right: 5px;
}

.terminal.input {
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

.terminal.output {
    margin-bottom: 5px;
    color: #ffffff;
}

.terminal.UI-console {
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
