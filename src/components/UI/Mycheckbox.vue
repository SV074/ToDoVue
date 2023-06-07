<template>
    <input type="checkbox" 
    @change="$emit('update:checked', $event.target.checked)">
</template>

<script>

export default {
    name: 'my-checkbox',
   
    // props: {
    //     checked: Boolean 
    // },
   
   
}

</script>