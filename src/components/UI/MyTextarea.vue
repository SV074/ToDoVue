<template>
    <textarea class="todo-textarea" :value="modelValue" @input="updateInput" name="" id="" cols="20" rows="10">
    </textarea>
</template>

<script>
export default {
    name: 'my-textarea',
    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}

</script>