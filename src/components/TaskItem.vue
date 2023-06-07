<template>
    <div class="task" :class="{ active: checked === true }">
        <div class="task-title-body-check">
            <div class="check">
                <my-checkbox v-model:checked="checked" @change="changeCompletedTasks"></my-checkbox>
            </div>
            <div class="task-title-body">
                <div>
                    <strong>
                        Название:
                    </strong>
                    {{ task.name }}
                </div>
                <div>
                    <strong>Описание:
                    </strong>
                    {{ task.info }}
                </div>
                <div class="date-task">{{ task.actual_date.slice(0, 10) }}</div>
            </div>

        </div>
        <div class="task-btns">
            <Edit @click="showModal" style="width: 1.5em; height: 1.5em;" />
            <el-popconfirm
             confirm-button-text="Да" 
             cancel-button-text="Нет" 
             icon-color="#626AEF"
             title="Вы точно уверены, что хотите удалить задачу?"
             @confirm="$emit('remove', task)" 
             @cancel="cancelEvent"
             :plain="true">
                <template #reference>
                    <Delete style="width: 1.5em; height: 1.5em;"/>
                </template>
            </el-popconfirm>
        </div>
        <el-dialog v-model="dialogVisible" title="Редактирование задачи" width="30%" append-to-body>

            <el-input v-model="taskData.name" placeholder="Название" />
            <el-input v-model="taskData.info" :rows="2" type="textarea" placeholder="Please input" />
            <el-date-picker v-model="taskData.actual_date" type="date" placeholder="Pick a day" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Отмена</el-button>
                    <el-button :plain="true" type="primary" @click="ChangeTask">
                        Редактировать
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import MyButton from './UI/MyButton.vue';
import Mycheckbox from './UI/Mycheckbox.vue';
import MyInput from './UI/MyInput.vue';
import DeleteIcon from './icons/DeleteIcon.vue';
import EditIcon from './icons/EditIcon.vue';
import axios from 'axios';
import MyModal from './UI/MyModal.vue';
import TaskForm from './TaskForm.vue';
import MyTextarea from './UI/MyTextarea.vue';
import Datepicker from 'vuejs3-datepicker';
import { ElButton, ElDialog, ElInput, ElDatePicker, ElPopconfirm, ElMessage } from 'element-plus'


export default {
    components: {
        MyButton,
        Mycheckbox,
        MyInput,
        DeleteIcon,
        EditIcon,
        MyModal,
        TaskForm,
        MyTextarea,
        ElDialog, ElButton, ElInput, ElDatePicker, ElPopconfirm, ElMessage,
        Datepicker
    },
    props: {
        task: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            cancelEvent: false,
            checked: false,
            dialogVisible: false,
            taskData: {
                actual_date: null,
                name: null,
                info: null,
            }
        }
    },
    methods: {
        showModal() {
            this.dialogVisible = true;
        },
        unShowModal() {
            this.modalVisible = false;
        },
        changeCompletedTasks() {
            const taskChecked = {
                completed: this.checked
            }

            axios.put(`http://localhost/todolists/${this.task.id}/completed-status`, taskChecked)
                .then(({ data }) => {
                    if (data.completed) {
                        this.task.completed = true;
                        this.checked = true;
                    } else {
                        this.task.completed = false;
                        this.checked = false;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });
        },
        ChangeTask() {
            const newTask = {
                name: this.taskData.name,
                info: this.taskData.info,
                actual_date: this.taskData.actual_date,
            }
            axios.put(`http://localhost/todolists/${this.task.id}/edit`, newTask)
                .then(({ data }) => {
                    console.log(data);
                    this.task.name = data.name;
                    this.task.info = data.info;
                    ElMessage({
                        showClose: true,
                        message: 'Задача отредактирована',
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });
            this.modalVisible = false;
        }
    },
    mounted() {
        let task = this.task;
        this.checked = task.completed;
        for (let key in task) {
            const value = task[key];
            //this.taskData[key] = value;
            if (key in this.taskData) {
                this.taskData[key] = value;
            }
        }
    }
}

</script>