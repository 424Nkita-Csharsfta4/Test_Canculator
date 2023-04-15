<template>
    <div>
        <button class="btn_help" @click="showModal = true">Помощь</button>

        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="showModal = false">&times;</span>
                <h3>Как пользоваться канкулятором фигур</h3>
                <h1>Команды</h1>
                <h2>
                    Добавить
                </h2>
                <span>Пишем слово Добавить и через пробел пишем нужную нам фигуру.</span>
                <h2>
                    Удалить
                </h2>
                <span>Пишем слово Удалить и через пробел пишем нужную нам фигуру.</span>
                
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';

const showModal = ref(false);
</script>
  
<style>
.span {
    color: #f30000;
}

.btn_help {
    font-size: 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #eb4d3f;
    color: white;
    cursor: pointer;
}

.btn_help:hover {
    background-color: #e13822a3;
    transition: 0.4s ease-in-out;
}

.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 300%;
    height: 300%;
    overflow: auto;
    background-color: rgba(68, 67, 67, 0.948);
}

.modal-content {
    background-color: white;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
    border-radius: 0.5rem;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>
  