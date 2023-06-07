<template>
    <div class="todo-list">
        <task-item v-for="task in tasks"
        :task="task"
        :key="task.id"
        
        @remove="$emit('remove', task)"
        />
    </div>
</template>

<script>
import TaskItem from './TaskItem.vue';

export default {
    components: { TaskItem },
    props: {
        tasks: {
            type: Array,
            required: true,
        }
       
    }
        
    
}

</script>