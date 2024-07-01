<script setup lang="ts">
const props = defineProps({
    onGuestSubmit: {
        type: Function,
        default: () => { }
    },
    submitBackground: {
        type: String,
        default: ''
    },
    onClear: {
        type: Function,
        default: () => { }
    },
    clearBackground: {
        type: String,
        default: ''
    },
    onNewGuestClearForm: {
        type: Function,
        default: () => { }
    },
    clearForm: {
        type: Function,
        default: () => { }
    },
    submitForm: {
        type: Function,
        default: () => { }
    }
})
</script>
<template>
    <div class="flex gap-3 justify-self-center justify-center content-center w-full h-16 p-5">
        <button type="submit" :onclick="props.onGuestSubmit"
            class="w-20 h-fit bg-green-500 dark:bg-[#5ca9c1] rounded-sm p-1 shadow-sm shadow-black dark:shadow-white"
            :style="`background-color:${submitBackground}`" v-on:click="submitForm()">Submit</button>
        <button type="reset" :onclick="props.onGuestSubmit"
            class="w-20 h-fit bg-red-500 dark:bg-[#863e89] rounded-sm p-1 shadow-sm shadow-black dark:shadow-white"
            :style="`background-color:${clearBackground}`" v-on:click="clearForm()">Clear</button>
    </div>
</template>