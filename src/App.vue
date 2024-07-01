<script setup lang="ts">
import { ref } from 'vue'
import ChitChat from './ChitChat.vue';
import { User } from './class/User.js';
// import * as fs from 'fs'

let users = Array<any>()
users = [
  {
    id: 1,
    firstName: 'Abdallah',
    lastName: 'Khalil',
    gender: 'female',
    isOnline: true,
    userPicture: './img/Abdallah_Khalil_Official.png',
    messages: [{
      id: 0,
      userID: 1,
      message: 'Hello, This is just Long message text to check how its look in the live view, please check the padding and the margin as well',
      received: true,
      dateTime: '11-10-2021 10:15:015',
      type: 'text',
      file: { name: '', type: '', lastModified: '' },
      provider: '',
    }],
  },
  {
    id: 2,
    firstName: 'Mustafa',
    lastName: 'Sid Ahmed',
    gender: 'female',
    isOnline: true,
    userPicture: './img/artworks-000389892840-8v4fp9-t500x500.jpg',
    messages: [{
      id: 1,
      userID: 2,
      message: '',
      received: false,
      dateTime: '11-10-2021 10:15:015',
      type: 'text',
      file: { name: '', type: '', lastModified: '', blob: [] },
      provider: '',
    }],
  },
  {
    id: 3,
    firstName: 'Mohamed',
    lastName: 'Swar El Dahab',
    gender: 'male',
    isOnline: true,
    userPicture: './img/DpzV__LXUAArnXs.jpg',
    messages: [{
      id: 2,
      userID: 3,
      message: '',
      received: false,
      dateTime: '11-10-2021 10:15:015',
      type: 'text',
      file: { name: '', type: '', lastModified: '' },
      provider: '',
    }],
  },
  {
    id: 4,
    firstName: 'Nancy',
    lastName: 'Ajaj',
    gender: 'female',
    isOnline: true,
    userPicture: './img/ab67616d0000b27311474c2cea67f436f8a2e7c8.jpeg',
    messages: [{
      id: 3,
      userID: 4,
      message: '',
      received: false,
      dateTime: '11-10-2021 10:15:015',
      type: 'text',
      file: { name: '', type: '', lastModified: '' },
      provider: '',
    }],
  },
  {
    id: 5,
    firstName: 'Ismail',
    lastName: 'Azhari',
    gender: 'female',
    isOnline: true,
    userPicture: './img/Ismail-al-Azhari.webp',
    messages: [{
      id: 5,
      userID: 5,
      message: '',
      received: false,
      dateTime: '11-10-2021 10:15:015',
      type: 'text',
      file: { name: '', type: '', lastModified: '' },
      provider: '',
    }],
  },
  {
    id: 6,
    firstName: 'John',
    lastName: 'Garang',
    gender: 'male',
    isOnline: false,
    userPicture: './img/jpg_John_Garang_leader_SPLM.jpg',
    messages: [{
      id: 5,
      userID: 6,
      message: 'Hello',
      received: false,
      dateTime: '11-10-2021 10:15:015',
      type: 'text',
      file: { name: '', type: '', lastModified: '' },
      provider: '',
    }],
  },
  {
    id: 7,
    firstName: 'Hummaid',
    lastName: '',
    gender: 'male',
    isOnline: true,
    userPicture: './img/Mohamed-Al-Hassan-Hummaid-XXX.jpeg',
    messages: [{
      id: 7,
      userID: 7,
      message: 'Hello',
      received: false,
      dateTime: '11-10-2021 10:15:015',
      type: 'text',
      file: { name: '', type: '', lastModified: '' },
      provider: '',
    }],
  },
  {
    id: 8,
    firstName: 'AL Mahgoub',
    lastName: '',
    gender: 'female',
    isOnline: true,
    userPicture: './img/Muhammad_Ahmad_Mahgoub_1965.jpg',
    messages: [{
      id: 8,
      userID: 8,
      message: 'Hello',
      received: false,
      dateTime: '11-10-2021 10:15:015',
      type: 'text',
      file: { name: '', type: '', lastModified: '' },
      provider: '',
    }],
  },
  {
    id: 9,
    firstName: 'Al Tayeb',
    lastName: 'Salih',
    gender: 'male',
    isOnline: false,
    userPicture: './img/tayeb-salih.webp',
    messages: [{
      id: 9,
      userID: 9,
      message: 'Hello',
      received: false,
      dateTime: '11-10-2021 10:15:015',
      type: 'text',
      file: { name: '', type: '', lastModified: '' },
      provider: '',
    }],
  },
  {
    id: 10,
    firstName: 'Dina',
    lastName: 'Mohamed',
    gender: 'female',
    isOnline: false,
    userPicture: '',
    messages: [{
      id: 11,
      message: 'Hello',
      received: false,
      dateTime: '11-10-2021 10:15:015',
      type: 'text',
      file: { name: '', type: '', lastModified: '' },
      provider: '',
    }],
  },
  {
    id: 11,
    firstName: 'Ibrahim',
    lastName: 'Yousif',
    gender: 'male',
    isOnline: true,
    userPicture: '',
    messages: [{
      id: 12,
      userID: 11,
      message: 'Hello',
      received: false,
      dateTime: '11-10-2021 10:15:015',
      type: 'text',
      file: { name: '', type: '', lastModified: '' },
      provider: '',
    }
    ],
  },
]
const onRecord = (audio: any) => {
  return audio
}

const onlineUsers = () => {
  const localUsers = users.filter((user) => { if (user.isOnline) return user })
  return localUsers
}
const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
const usersOnline = onlineUsers()
const isGuest = false
let isFront = ref(isGuest)
const randomUser = () => {
  if (isGuest) {
    const random = Math.floor(Math.random() * usersOnline.length)
    const user = (usersOnline[random])
    isFront.value = false

    return user as User
  }
  return new User(0, '', '', '', false, '', [])
}
const selectUsr: User = randomUser()

const onMessageSent = (msg: any) => {
  console.log(msg)
}
</script>

<template>
  <div class="relative w-fit h-[600px] align-middle m-auto top-40">
    <ChitChat class="relative" :isDark="isDark" :users="users" :userName="selectUsr.firstName" :isGuest="isGuest"
      :onRecorded="onRecord" :userToGuest="randomUser" :userMessages="selectUsr.messages"
      :supportUser="selectUsr as User" :onMessageSent="onMessageSent" :isGuestFile="false"
      :chatBodyFontFamily="'cursive'" :logo="''" :avatar="'./img/rightclick.png'" />
  </div>
</template>

<style scoped>
#test {
  background-color: #6c6c6c;
}
</style>