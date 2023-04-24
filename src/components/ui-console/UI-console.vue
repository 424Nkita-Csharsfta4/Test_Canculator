<template>
    <div class="terminal">
        <h1 class="title">Консольное Web приложение</h1>
        <p>Все команды:</p>
        <div v-for="command in commands" :key="command.name" class="command">{{ command.help() }}</div>
        <div class="UI-console" ref="console">
            <div class="input-wrapper">
                <span class="prompt">$&nbsp;</span>
                <input type="text" v-model="commandValue" class="input" @keydown="handleKeyDown" />
            </div>
            <div v-for="(output, index) in commandOutputs" :key="index" class="output">{{ output }}</div>
            <div ref="outputEnd"></div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { CommandModel } from "./models/CommandModel";
import { Circle } from "@/canculate/circle/circle";
import { Rectangle } from "@/canculate/rectangle/rectangle";
import { Square } from "@/canculate/square/square";
import { Triangle } from "@/canculate/treangle/treangle";
import { ICommand } from "./interfaces/ICommand";
import saveAs from "file-saver";

/**
 * Максимальное количество команд в истории
 */
const MAX_HISTORY_LENGTH = 5;
/**
 *  Текущая введенная команда
 */
const commandValue = ref("");
/**
 *  Результаты выполненных команд
 */
const commandOutputs = ref<string[]>([]);
/**
 *  История введенных команд
 */
const commandHistory = ref<string[]>([]);




/**
 *  Функция для поиска команды по имени и вызова ее execute()
 */
const executeCommand = (name: string, args: string[]) => {
    const command = commands.find(c => c.name === name);
    if (command) {
        command.execute(args);
    } else {
        commandOutputs.value.push(`Команда "${name}" не найдена`);
    }
}
/**
 * Обработчик события @keydown.enter
 */
const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        const commandString = commandValue.value.trim();
        if (commandString) {
            const [name, ...args] = commandString.split(" ");
            executeCommand(name, args);
            /**
             * Добавляем команду в историю
             */
            commandHistory.value.unshift(commandString);
            /**
             * Если количество команд в истории превышает максимально допустимое значение,
             * удаляем самую старую команд
             */
            if (commandHistory.value.length > MAX_HISTORY_LENGTH) {
                commandHistory.value.pop();
            }
            /**
             *  Очищаем поле ввода команды
             */
            commandValue.value = "";

        }
    }
}

console.log(handleKeyDown)


/**
 * Описываем объекты для каждой доступной команды с их свойствами
 */

const commands: ICommand[] = [
    {
        /**
         * Название команды
         */
        name: "help",
        /**
         * Формируем строку со списком доступных команд
         */
        execute: () => {
            const help =
                "Доступные команды:\n" +
                commands.map((c) => c.help()).join("\n");
            commandOutputs.value.push(help);
        },
        help: () => "help - показать список команд",
    },
    {
        /**
         * Название команды
         */
        name: "clear",
        /**
         * Очищаем массив вывода команд
         */
        execute: () => {
            commandOutputs.value = [];
        },
        help: () => "clear - очистить вывод",
    },


    {
        /**
         * Название команды
         */
        name: "history",
        /**
         *  Функция execute() создает строку с историей команд и добавляет ее в массив commandOutputs.value
         */
        execute: () => {
            /**
             * Функция берет массив commandHistory.value, 
             * содержащий историю команд, и для каждой команды добавляет ее номер и точку в начало строки.
             */
            const history = commandHistory.value
                /**
                 * Объединяем все строки с помощью метода join(),
                 *  используя символ перевода строки "\n" в качестве разделителя
                 */
                .map((cmd, i) => `${i + 1}.${cmd}`)
                .join("\n");
            commandOutputs.value.push(history);
        },
        /**
         * Функция help() просто возвращает строку "history - показать историю команд"
         */
        help: () => "history - показать историю команд",
    },
    {
        /**
         * Название команды
         */
        name: "download",
        /**
         * Функция execute скачивает список фигур в формате JSON и сохраняет его в файл.
         */
        execute: () => {
            /**
             * Сначала мы получаем список команд из commandHistory и
             *  преобразуем каждую команду в фигуру, используя функцию parseFigure.
             */
            const figures = commandHistory.value.map(parseFigure);
            const data = JSON.stringify(figures, null, 2);
            const blob = new Blob([data], { type: "application/json" });
            /**
             * В конце мы вызываем функцию saveAs из библиотеки 
             * FileSaver.js для загрузки файла на компьютер пользователя.
             */
            saveAs(blob, "figures.json");
            /**
             *  В commandOutputs мы добавляем сообщение о том, что файл со списком фигур был загружен.
             */
            commandOutputs.value.push("Файл со списком фигур был загружен");
        },
        /**
         * Функция help возвращает строку с описанием того, что делает функция execute
         */
        help: () => "download - скачать список фигур в формате JSON",
    },
    {
        /**
         * Название команды добавление
         */
        name: "add",
        /**
         *  Функция добавляет новую геометрическую фигуру
         *  в список на основе введенных пользователем аргументов. 
         */
        execute: (args: string[]) => {
            /**
             * Функция принимает массив строковых аргументов
             */
            if (args.length < 2) {
                commandOutputs.value.push(
                    "Неверное количество аргументов. Используйте: add <имя фигуры> <параметр1> <параметр2> ..."
                );
                return;
            }
            /**
             * Проверяем название фигуры и создает новый экземпляр
             * класса (круг, прямоугольник, квадрат или треугольник) с параметрами.
             */
            const figureName = args.shift();
            let figure: Circle | Rectangle | Square | Triangle;

            /**
             * Определяем тип фигуры на основе ее имени и соответствующим образом проверьте аргументы
             */
            switch (figureName) {
                /**
                 *  Обработка команды Круг
                 */
                case "Круг":
                    /**
                     * Проверяем, что количество аргументов равно 1
                     */
                    if (args.length !== 1) {
                        commandOutputs.value.push(
                            "Неверное количество аргументов. Используйте: add Круг <радиус>"
                        );
                        return;
                    }
                    /**
                     * Создайте новый объект Circle с заданным радиусом
                     */
                    const circle = new Circle(parseFloat(args[0]), "Круг");
                    /**
                     * Задаем созданный Круг как текущую фигуру
                     */
                    figure = circle;
                    /**
                     * Отобразжение площади и периметра круга
                     */
                    commandOutputs.value.push(`Радиус круга: ${circle.getArea()}`);
                    commandOutputs.value.push(`Длина окружности: ${circle.getPerimeter()}`);
                    break;
                /**
                 *  Обработка команды Прямоугольник
                 */
                case "Прямоугольник":
                    /**
                     * Проверяем, что количество аргументов равно 2
                     */
                    if (args.length !== 2) {
                        commandOutputs.value.push(
                            "Неверное количество аргументов. Используйте: add Прямоугольник <ширина> <высота>"
                        );
                        return;
                    }
                    /**
                     * Создаём новый объект Rectangle с заданными шириной и высотой
                     */
                    const rectangle = new Rectangle(
                        parseFloat(args[0]),
                        parseFloat(args[1]),
                        "Прямоугольник"
                    );
                    /**
                     * Задаем созданный Треугольник как текущую фигуру
                     */
                    figure = rectangle;
                    /**
                     * Отображаем площадь и периметр прямоугольника
                     */
                    commandOutputs.value.push(
                        `Ширина прямоугольника: ${rectangle.getArea()}`
                    );
                    commandOutputs.value.push(
                        `Периметр прямоугольника: ${rectangle.getPerimeter()}`
                    );
                    break;
                /**
                 *  Обработка команды Квадрат
                 */
                case "Квадрат":
                    /**
                     * Проверяем, что количество аргументов равно 1
                     */
                    if (args.length !== 1) {
                        commandOutputs.value.push(
                            "Неверное количество аргументов. Используйте: add Квадрат <сторона>"
                        );
                        return;
                    }
                    /**
                     * Создайте новый квадратный объект с заданной длиной стороны
                     */
                    const side = parseFloat(args[0]);
                    const square = new Square(side, "Квадрат");
                    /**
                     * Задаем созданный Квадрат как текущую фигуру
                     */
                    figure = square;
                    /**
                     * Отображаем площадь и периметр квадрата
                     */
                    commandOutputs.value.push(
                        `Сторона квадрата: ${square.getPerimeter()}`
                    );
                    commandOutputs.value.push(
                        `Площадь квадрата: ${square.getArea()}`
                    );
                    break;
                /**
                 *  Обработка команды Треугольник
                 */
                case "Треугольник":
                    /**
                     * Проверяем, что количество аргументов равно 3
                     */
                    if (args.length !== 3) {
                        commandOutputs.value.push(
                            "Неверное количество аргументов. Используйте: add Треугольник <сторона1> <сторона2> <сторона3>"
                        );
                        return;
                    }
                    /**
                     * Создаем новый экземпляр класса Triangle
                     */
                    const triangle = new Triangle(
                        parseFloat(args[0]),
                        parseFloat(args[1]),
                        parseFloat(args[2]),
                        "Треугольник"
                    );
                    /**
                     * Задаем созданный треугольник как текущую фигуру
                     */
                    figure = triangle;

                    /**
                     * Выводим периметр и площадь треугольника в командный вывод
                     */
                    commandOutputs.value.push(
                        `Периметр треугольника: ${triangle.getPerimeter()}`
                    );
                    commandOutputs.value.push(
                        `Площадь треугольника: ${triangle.getArea()}`
                    );
                    break;
                /**
                 * Выводим сообщение о неверной введёной команды
                 */
                default:
                    commandOutputs.value.push(`Неверное имя фигуры: ${figureName}`);
                    return;
            }
            /**
             * Если метод getPerimeter() вернул значение, которое false, 
             * это означает, что переданные аргументы для фигуры недостаточны или некорректны.
             * В таком случае будет выведено сообщение об ошибке и выполнение команды прервется.
             */
            if (!figure.getPerimeter()) {
                commandOutputs.value.push(`Неверные параметры для фигуры: ${figureName}`);
                return;
            }
            /**
             * Если количество команд в истории достигло максимального значения,
             * старые команды будут удаляться.
             * Затем команда добавления фигуры будет добавлена в конец истории.
             * В конце будет отправлено сообщение о добавлении фигуры
             */
            if (commandHistory.value.length >= MAX_HISTORY_LENGTH) {
                commandHistory.value.shift();
            }

            commandHistory.value.push(`add ${figureName} ${args.join(" ")}`);
            commandOutputs.value.push(`Фигура ${figureName} была добавлена`);
        },
        /**
         * Возвращает информацию о том, как использовать команду add для добавления фигуры в список. 
         */
        help: () =>
            "add <имя фигуры> <параметр1> <параметр2> ... - добавить фигуру в список. Доступные фигуры: Круг, Прямоугольник, Квадрат, Треугольник",
    },

];
console.log(commands);

/**
 * 
 * @param parseFigure Функция для парсинга команды на добавление фигуры в список.
 */
const parseFigure = (command: string): any => {
    console.log(parseFigure);
    const parts = command.split(" ");
    console.log(parts);
    const figureName = parts[1];
    let figure: any;
    console.log(figureName);
    switch (figureName) {
        case "Круг":
            figure = new Circle(parseFloat(parts[2]), "Круг");
            break;
        case "Прямоугольник":
            figure = new Rectangle(parseFloat(parts[2]), parseFloat(parts[3]), "Прямоугольник");
            break;

        case "Квадрат":
            figure = new Square(parseFloat(parts[2]), "Квадрат");
            break;

        case "Треугольник":
            figure = new Triangle(
                parseFloat(parts[2]),
                parseFloat(parts[3]),
                parseFloat(parts[4]),
                "Треугольник"
            );
            break;

        default:
            return null;
    }
    return figure;
}

/**
 * сохранение истории команд в localStorage
 */
 const saveCommandHistory = () => {
    localStorage.setItem("commandHistory", JSON.stringify(commandHistory.value));
}

console.log(saveCommandHistory);
/**
 * загрузка истории команд из localStorage
 */
const loadCommandHistory = () => {
    const history = localStorage.getItem("commandHistory");
    if (history) {
        commandHistory.value = JSON.parse(history);
    }
}

/**
 * загрузка истории команд при загрузке страницы
 */
 onMounted(() => {
  loadCommandHistory();
});

/**
 * сохранение истории команд при удалении компонента
 */
 onUnmounted(() => {
  saveCommandHistory();
});

console.log(loadCommandHistory);
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
    color: #f9faf9;
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
    color: #ff0000dc;
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
