<template>
    <div class="flex items-center space-x-1">
        <p class="text-sm text-primary cursor-pointer" @click="onClickFirstText">{{ firstText }}</p>
        <p class="text-sm text-gray-300">&nbsp;>&nbsp;</p>
        <p class="text-sm font-light text-gray-500">{{ secondText }}</p>
    </div>
</template>
  
<script>
export default {
    props: {
        firstText: {
            type: String,
            required: true
        },
        secondText: {
            type: String,
            required: true
        },
        onClickFirstText: {
            type: Function,
            required: true
        }
    }
}
</script>
  
<style scoped>
/* Add your component-specific styles here */
</style>