<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(
    {
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
        backgroundColor: {
            type: String,
            default: '#cecee'
        },
        border: {
            type: String,
            default: ''
        },
        isNewGuest: {
            type: Boolean,
            default: false
        },
        isCleared: {
            type: Boolean,
            default: false
        },
        onNewGuestClearForm: {
            type: Function,
            default: () => { }
        },
        onNewGuestSubmitForm: {
            type: Function,
            default: () => { }
        }

    },


)
const emit = defineEmits(['update:updateNameValue', 'update:updateEmailValue', 'update:updatePhoneValue'])
const input_id = () => {
    let letter_numbers = "0123456789ABCDEFGHIJKLMNOPQRSTUVZXYZ_abcdefghigklmnopqrstuvwxyz"
    let i = 0
    let id_array = [];
    for (; ;) {
        let one_char = letter_numbers.charAt(Math.floor(Math.random() * letter_numbers.length))
        id_array[i] = one_char
        if (i >= 15) break;
        i++
    }
    let id__ = id_array.join("")
    return id__
}

const typeName = ref('')
const typeMail = ref('')
const typePhone = ref('')

const updateNameValue = (value: any) => {
    emit('update:updateNameValue', value)
    typeName.value = value
    props.guestName(value)
}
const updateEmailValue = (value: any) => {
    emit('update:updateEmailValue', value)
    typeMail.value = value
    props.guestEmail(value)
}
const updatePhoneValue = (value: any) => {
    emit('update:updatePhoneValue', value)
    typePhone.value = value
    props.guestPhone(value)
}
const name_id = input_id()
const email_id = input_id()
const phone_id = input_id()

function clearAll() {
    typeName.value = ''
    typeMail.value = ''
    typePhone.value = ''
    props.onNewGuestClearForm()
}
function submitAll() {
    if (typeName.value.trim() == '' && typeMail.value.trim() == '' && typePhone.value.trim() == '') {
        return
    }
    const guestData = {
        'guestName': typeName.value,
        'guestPhone': typePhone.value,
        'guestMail': typeMail.value
    }
    props.onNewGuestSubmitForm(guestData)
}
defineExpose({
    clearAll,
    submitAll
});
</script>
<template>
    <div class="grid grid-cols-1 relative w- full justify-center content-center"
        :style="`background-color:${props.backgroundColor}`">
        <label :for="name_id" class="font-[cursive] justify-self-start  p-1">Name</label>
        <input type="text" :id="name_id" :value="typeName"
            v-on:input="updateNameValue(($event.target! as HTMLInputElement).value)"
            class="w-full h-9  p-1  m-auto justify-center outline-none focus:outline-none border-b border-[#545454] dark:border-[#5898b8]"
            :style="`background:${props.backgroundColor};`">
        <label :for="email_id" class="font-[cursive] justify-self-start  p-1">Email</label>
        <input type="email" :id="email_id" :value="typeMail"
            v-on:input="updateEmailValue(($event.target! as HTMLInputElement).value)"
            class="w-full h-9  p-1  m-auto justify-center outline-none focus:outline-none border-b border-[#545454] dark:border-[#5898b8]"
            :style="`background:${props.backgroundColor}; `">
        <label :for="phone_id" class="font-[cursive] justify-self-start p-1">Phone Number</label>
        <input type="text" :id="phone_id" :value="typePhone"
            v-on:input="updatePhoneValue(($event.target! as HTMLInputElement).value)"
            class="w-full h-9  p-1  m-auto justify-center outline-none focus:outline-none border-b border-[#545454] dark:border-[#5898b8]"
            :style="`background:${props.backgroundColor}; `">
    </div>
</template>