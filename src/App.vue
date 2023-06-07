<template>
  <div class="todo">
    <my-section>
      <my-header class="todo-header">
        <h2>Задачи</h2>
      </my-header>
      <p>{{ manyTasksList }}</p>
      <Plus class="plus-task" @click="dialogVisible = true" style="width: 2em; height: 2em; margin-right: 8px" />
      <el-dialog v-model="dialogVisible" title="Создание задачи" width="30%" append-to-body>
        <span></span>
        <el-input v-model="task.name" placeholder="Название" />
        <el-input v-model="task.info" :rows="2" type="textarea" placeholder="Описание" />
        <el-date-picker v-model="task.actualDate" type="date" placeholder="Pick a day" />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Отмена</el-button>
            <el-button :plain="true" type="primary" @click="createTask">
              Добавить
            </el-button>
          </span>
        </template>
      </el-dialog>
      <todo-list :tasks="allTasks" @remove="removeTask" class="list">
      </todo-list>
    </my-section>
    <my-section>
      <my-header class="todo-active-header">
        <h2>Активные задачи</h2>
      </my-header>
      <todo-list class="list-active" :tasks="activeTasks" @remove="removeTask">
      </todo-list>
    </my-section>
    <my-section>
      <my-header class="todo-completed-header">
        <h2 class="name-header">Завершенные задачи</h2>
      </my-header>
      <todo-list :tasks="completedTasks" @remove="removeTask" class="list-completed">
      </todo-list>
    </my-section>
  </div>
</template>
 
<script>

import TaskForm from './components/TaskForm.vue';
import TodoList from './components/TodoList.vue';
import MyModal from './components/UI/MyModal.vue';
import MySection from './components/MySection.vue';
import AddIcon from './components/icons/AddIcon.vue';
import MyButton from './components/UI/MyButton.vue';
import MyHeader from './components/UI/MyHeader.vue';
import axios from 'axios';
import { ElButton, ElDialog, ElInput, ElDatePicker, ElMessage } from 'element-plus'

export default {
  components: {
    TodoList,
    TaskForm,
    MyModal, MySection, MyHeader,
    AddIcon,
    ElDialog, ElButton, ElInput, ElDatePicker, ElMessage,
  },
  data() {
    return {
      tasks: [],     
      dialogVisible: false,
      task: {
        name: null,
        info: null,
        actualDate: null,
      },
      message: '',
    }
  },
  computed: {
    manyTasksList() {
      return this.tasks.length > 8 ? 'Как много задач' : '';
    },
    allTasks() {
      return this.tasks.filter(item => item.completed === false && (Date.parse(item.actual_date)) > Date.parse(new Date()));
    },
    activeTasks() {
      return this.tasks.filter(item => item.completed === false && (Date.parse(new Date()) >= Date.parse(item.actual_date)));
    },
    completedTasks() {
      return this.tasks.filter(item => item.completed === true);
    },
  },
  methods: {
    createTask() {
          const newTask = {
          name: this.task.name,
          info: this.task.info,
          completed: this.task.completed,
          dateTaskAdd: new Date(),
          completed: false,
          actualDate: this.task.actualDate,
        }
        if (this.task.name !== null && this.task.info !== null && this.task.actualDate !== null) {
        axios.post('http://localhost/todolists/create', newTask)
          .then(({ data }) => {
            console.log(data);
            this.tasks.push(data);
            this.task.name = null;
            this.task.info = null;
            this.task.actualDate = null;
            ElMessage({
              showClose: true,
              message: 'Congrats, Task create !',
              type: 'success',
            })
            this.dialogVisible = false;
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {

          });
        }
    },
    removeTask(task) {

      axios.delete(`http://localhost/todolists/${task.id}`)
        .then(({ data }) => {
          //this.loadTodolist();
          const index = this.tasks.findIndex(item => item.id === task.id);
          this.tasks.splice(index, 1);
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {

        });
    },
    showModal() {
      this.modalVisible = true;
    },
    unshowModal() {
      this.modalVisible = false;
    },
    loadTodolist() {
      axios.get('http://localhost/todolists')
        .then(({ data }) => {
          this.tasks = data;
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {

        });
    }
  },
  mounted() {
    this.loadTodolist();
  },
}

</script>
