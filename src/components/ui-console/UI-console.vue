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
import saveAs from "file-saver";

const MAX_HISTORY_LENGTH = 5;

const commandValue = ref("");
const commandOutputs = ref<string[]>([]);
const commandHistory = ref<string[]>([]);
const figureAdded = new CustomEvent("figureAdded");

const props = defineProps<{
    commands: CommandModel[];
}>();

const sendCommands = () => {
    const [commandName, ...args] = commandValue.value.trim().split(/\s+/);
    const command = props.commands.find(
        (c) => c.name.toLowerCase() === commandName.toLowerCase()
    );

    if (!command) {
        commandOutputs.value.push(`Команда "${commandName}" не найдена`);
        commandValue.value = "";
        return;
    }
    const download = (figures: (Circle | Rectangle | Square | Triangle)[]) => {
        const data = JSON.stringify(figures, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        saveAs(blob, "figures.json");
    };
    const addCommandToHistory = (command: string) => {
        commandHistory.value.push(command);
        if (commandHistory.value.length > MAX_HISTORY_LENGTH) {
            commandHistory.value.shift();
        }
    };
    console.log(addCommandToHistory(commandValue.value));


    let output: string;

    switch (commandName) {
        case "help":
            output =
                "Доступные команды:\n" +
                props.commands.map((c) => c.help()).join("\n");
            break;
        case "clear":
            commandOutputs.value = [];
            break;
        case "history":
            output = commandHistory.value
                .map((cmd, i) => `${i + 1}. ${cmd}`)
                .join("\n");
            break;

        case "download":
            download(commandHistory.value.map(parseFigure));
            output = "Файл со списком фигур был загружен";
            break;

        case "add":
            if (args.length < 2) {
                output =
                    "Неверное количество аргументов. Используйте: add <имя фигуры> <параметр1> <параметр2> ...";
                break;
            }

            const figureName = args.shift();
            let figure: Circle | Rectangle | Square | Triangle;

            switch (figureName) {
                case "Круг":
                    if (args.length !== 1) {
                        output =
                            "Неверное количество аргументов. Используйте: Круг <радиус>";
                        break;
                    }

                    const radius = parseFloat(args[0]);
                    if (isNaN(radius)) {
                        output = "Неверный формат числа";
                        break;
                    }

                    figure = new Circle(radius, "Круг");
                    output = `Для окружности с радиусом ${radius} была добавлена фигура "${figureName}". Ее площадь: ${figure.getArea()}`;

                    break;

                case "Прямоугольник":
                    if (args.length !== 2) {
                        output =
                            "Неверное количество аргументов. Используйте: Прямоугольник <ширина> <высота>";
                        break;
                    }

                    const width = parseFloat(args[0]);
                    const height = parseFloat(args[1]);
                    if (isNaN(width) || isNaN(height)) {
                        output = "Неверный формат числа";
                        break;
                    }

                    figure = new Rectangle(width, height, "Прямоугольник");
                    output = `
        Для прямоугольника с шириной ${width} и высотой ${height} была добавлена фигура "${figureName}". Ее площадь: ${figure.getArea()}
      `;

                    break;

                case "Квадрат":
                    if (args.length !== 2) {
                        output = "Неверное количество аргументов. Используйте: Квадрат <сторона>";
                        break;
                    }

                    const side = parseFloat(args[0]);
                    if (isNaN(side)) {
                        output = "Неверный формат числа";
                        break;
                    }

                    figure = new Square(side, "square");
                    output = `Для квадрата со стороной ${side} была добавлена фигура "${figureName}". Ее площадь: ${figure.getArea()}`;
                    break;
                case "Треугольник":
                    if (args.length !== 3) {
                        output =
                            "Неверное количество аргументов. Используйте: Треугольник <сторона1> <сторона2> <сторона3>";
                        break;
                    }
                    const side1 = parseFloat(args[0]);
                    const side2 = parseFloat(args[1]);
                    const side3 = parseFloat(args[2]);

                    if (isNaN(side1) || isNaN(side2) || isNaN(side3)) {
                        output = "Неверный формат числа";
                        break;
                    }

                    figure = new Triangle(side1, side2, side3, "Треугольник");

                    if (figure.getPerimeter()) {
                        output = `Для треугольника со сторонами ${side1}, ${side2} и ${side3} была добавлена фигура "${figureName}". Ее площадь: ${figure.getArea()}`;
                    } else {
                        output = "Треугольник с такими сторонами не существует";
                    }
                    break;

                default:
                    output = `Неподдерживаемая фигура: ${figureName}`;
                    break;
            }
            break;

           
    }

    commandOutputs.value.push(output);
    commandValue.value = "";
};



function parseFigure(value: string, index: number, array: string[]): Circle | Rectangle | Square | Triangle {
    throw new Error("Function not implemented.");
}
</script>

               




<style>
.terminal {
    background-image: url('https://moewalls.com/wp-content/uploads/2022/04/samurai-girl-in-the-rain-thumb.jpg');
    background-color: rgb(255, 255, 255);
    color: #ffffff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans - serif;
    font-size: 17px;
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
