<template>
    <div class="modal" v-if="show === true" @click.stop="hideModal">
        <div @click.stop class="modal__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>


export default {
    name: 'my-modal',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideModal() {
            this.$emit('update:show', false)
        }
    }
}

</script>