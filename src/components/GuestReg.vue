<script setup lang="ts">
import InputText from './input/InputText.vue'
import SubmitButton from './input/SubmitButton.vue'
import { ref } from 'vue';
const props = defineProps({
    guestName: {
        type: Function,
        default: (value: any) => { return value }
    },
    guestEmail: {
        type: Function,
        default: (value: any) => { return value }
    },
    guestPhone: {
        type: Function,
        default: (value: any) => { return value }
    },
    onNewGuestClearForm: {
        type: Function,
        default: () => { }
    },

    onNewGuestSubmitForm: {
        type: Function,
        default: () => { }
    },
    backgroundColor: {
        type: String,
        default: '#cece'
    },
    border: {
        type: String,
        default: ''
    },
    isNewGuest: {
        type: Boolean,
        default: false
    },
    welcomeText: {
        type: String,
        default: 'Welcome'
    },
    subWelcomeText: {
        type: String,
        default: 'enter valid credentials, please'
    },


})

const isShow = ref(true)
const hideWelcomeMsg = () => {
    isShow.value = false
    //props.onNewGuestCloseForm
}
const isClear = ref(false)
const isSubmit = ref(false)

const clearAll = ref()
const clearForm = () => {
    if (!isClear.value) {
        isClear.value = !isClear.value
        props.onNewGuestClearForm(true)
    }
    clearAll.value!.clearAll()
    isClear.value = false
}
const submitForm = () => {
    if (!isSubmit.value) {
        clearAll!.value!.submitAll()
    }

    props.onNewGuestSubmitForm
}

</script>
<template>
    <div v-if="isShow" class="relative">

        <div class="p-2 justify-center left-9 content-center grid-cols-1 absolute border rounded-xl w-3/4 top-2 shadow-md"
            :style="`background-color:${backgroundColor}; border:1px solid ${border}`">
            <div class="absolute right-0 z-10 top-0 p-1 font-bold text-shadow-sm text-[#f95b5b] cursor-pointer"
                @click="hideWelcomeMsg">
                <p>X</p>
            </div>
            <div class="relative left-28">
                <p class="justify-self-center font-bold  shadow-[#fff] dark:shadow-[#000] text-shadow-sm">{{ welcomeText
                    }}
                </p>
            </div>
            <div class="justify-center left-11 content-center grid-cols-1 p-2 w-fit top-2 font-[cursive]">
                <p class="justify-center font-thin shadow-[#fff] dark:shadow-[#000] text-shadow-sm">{{ subWelcomeText }}
                </p>
            </div>
            <InputText :guestName="guestName" :guestEmail="guestEmail" :guestPhone="guestPhone"
                :backgroundColor="backgroundColor" :border="props.border" :isNewGuest="isNewGuest"
                :onNewGuestClearForm="onNewGuestClearForm" :onNewGuestSubmitForm="onNewGuestSubmitForm" ref="clearAll"
                toRef="submitAll" />
            <SubmitButton class="w-full bottom-1 justify-self-center" :clearForm="clearForm" :submitForm="submitForm" />
        </div>
    </div>
</template>