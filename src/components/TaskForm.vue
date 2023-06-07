<template>
    <form class="todo-form" @submit.prevent>
        <h3>Создание задачи</h3>
        <div class="input-form">
            <my-input class="" placeholder="Название" v-model="task.name">
            </my-input>
            <my-textarea placeholder="Описание" v-model="task.info"></my-textarea>
            <datepicker v-model="task.actualDate"> </datepicker>
            
        </div>
        <my-button class="add-task" @click="createTask">Добавить
        </my-button>
    </form>
</template>

<script>
import MyInput from './UI/MyInput.vue';
import MyButton from './UI/MyButton.vue';
import MyTextarea from './UI/MyTextarea.vue';
import Datepicker from 'vuejs3-datepicker';

export default {
    components: { 
        MyButton, MyInput, MyTextarea,
        Datepicker 
    },
    data() {
        return {
            task: {
                name: '',
                info: '',
                actualDate: ''
            }
        } 
    },
    methods: {
        createTask() {
            // this.task.id = Date.now(),
            //this.task.checked = false;
            this.$emit('create', this.task),
            this.task = {
                name: '',
                info: '',
                actualDate: ''
            }
        }
    },
    // watch: {
    //     checked(newValue, oldValue) {
    //         if (newValue) {
    //             console.log(newValue);
    //             this.checkValue = true;
                
    //         } else if (oldValue) {
    //             console.log(oldValue);
    //             this.checkValue = false;
                
    //         }
    //     }
    // },
}

</script>