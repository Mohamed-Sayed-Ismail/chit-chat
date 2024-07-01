<script setup lang="ts">
import ChatHeader from './components/chat/ChatHeader.vue'
import ChatBody from './components/chat/ChatBody.vue'
import ChatFooter from './components/chat/ChatFooter.vue'
import { ref, computed } from 'vue';
import { FileMessage } from './class/FileMessage.js';
import { User } from './class/User.js';
import { Message } from './class/Message.js';

interface Props {
    users: Array<any>;
    supportUser: Object;
    isAnimation: boolean;
    isAudio: boolean;
    isFile: boolean;
    isGuest: boolean;
    isGuestAudio: boolean;
    isGuestFile: boolean;
    bodyBackground: string;
    bodyBackgroundDark: string;
    headerBackground: string;
    headerBackgroundDark: string;
    backgroundFooter: string;
    backgroundDarkFooter: string;
    shadowColor: string;
    shadowColorDark: string;
    textColorHeadTitleDark: string;
    textColorHeadSubTitle: string;
    textColorHeadSubTitleDark: string;
    onGuestMessage: Function;
    guestFilesExtensions: Array<any>;
    userToGuest: Function;
    logo: string;
    status: string;
    statusOnline: string;
    statusOffline: string;
    statusOnlineDark: string;
    statusOfflineDark: string;
    userName: string;
    fontFamily: string;
    textColor: string;
    textDarkTheme: string;
    styleChat: string;
    isFront: boolean;
    titleText: string;
    subTitleText: string;
    textColorHeadTitle: string;
    textDarkThemeHead: string;
    fontFamilyFooter: string;
    textColorFooter: string;
    textDarkThemeFooter: string;
    textChatValueFooter: string;
    returnArrowColor: string;
    returnArrowColorDark: string;
    chatBodyFontFamily: string;
    usersListTextColor: string;
    usersListTextColorDark: string;
    sendMessageColor: string;
    sendMessageColorDark: string;
    receivedMessageColor: string;
    receivedMessageColorDark: string;
    sendMessageTextColor: string;
    sendMessageTextColorDark: string;
    receivedMessageTextColor: string;
    receivedMessageTextColorDark: string;
    messageShadow: string;
    messageShadowDark: string;
    micColor: string;
    onRecordColor: string;
    micColorDark: string;
    onRecordColorDark: string;
    onRecorded: Function;
    onMessageSent: Function;
    onMessageReceived: Function;
    isDark: boolean;
    isNewGuest: boolean;
    onNewGuestCloseForm: Function;
    onNewGuestClearForm: Function;
    onAddMessage: Function;
}

const props: Props = defineProps({
    users: {
        type: Array<User>,
        default() {
            return []
        }
    },
    supportUser: {
        type: Object,
        default() {
            return {}
        }
    },
    isAnimation: {
        type: Boolean,
        default: true
    },
    isAudio: {
        type: Boolean,
        default: true
    },
    isFile: {
        type: Boolean,
        default: true
    },
    isGuest: {
        type: Boolean,
        default: false
    },
    isGuestAudio: {
        type: Boolean,
        default: true
    },
    isGuestFile: {
        type: Boolean,
        default: true
    },
    bodyBackground: {
        type: String,
        default: '#929191'
    },
    bodyBackgroundDark: {
        type: String,
        default: '#2a2b2c'
    },
    headerBackground: {
        type: String,
        default: '#979696'
    },
    headerBackgroundDark: {
        type: String,
        default: '#222222'
    },
    backgroundFooter: {
        type: String,
        default: '#979696'
    },
    backgroundDarkFooter: {
        type: String,
        default: '#222222'
    },
    shadowColor: {
        type: String,
        default: '#000000'
    },
    shadowColorDark: {
        type: String,
        default: '#FFFFFF'
    },
    textColorHeadTitleDark: {
        type: String,
        default: '#000000'
    },
    textColorHeadSubTitle: {
        type: String,
        default: '#515151'
    },
    textColorHeadSubTitleDark: {
        type: String,
        default: '#8c8c8c'
    },
    onGuestMessage: {
        type: Function,
        default: () => { }
    },
    guestFilesExtensions: {
        type: Array,
        default() {
            return []
        }
    },
    userToGuest: {
        type: Function,
        default: () => { }
    },
    logo: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'Online'
    },
    statusOnline: {
        type: String,
        default: '#066e10'
    },
    statusOffline: {
        type: String,
        default: '#c63737'
    },
    statusOnlineDark: {
        type: String,
        default: '#0889c5'
    },
    statusOfflineDark: {
        type: String,
        default: '#a41278'
    },
    userName: {
        type: String,
        default: ''
    },

    fontFamily: {
        type: String,
        default: 'Chalkboard'
    },
    textColor: {
        type: String,
        default: '#292929'
    },
    textDarkTheme: {
        type: String,
        default: '#bfbfbf'
    },
    styleChat: {
        type: String,
        default: 'leave'
    },
    isFront: {
        type: Boolean,
        default: true
    },
    titleText: {
        type: String,
        default: 'Right Click'
    },
    subTitleText: {
        type: String,
        default: 'For Integrated Solutions CO.LTD'
    },

    textColorHeadTitle: {
        type: String,
        default: '#1d1d1d'
    },
    textDarkThemeHead: {
        type: String,
        default: '#fff'
    },
    fontFamilyFooter: {
        type: String,
        default: 'san-serf'
    },
    textColorFooter: {
        type: String,
        default: '#000'
    },
    textDarkThemeFooter: {
        type: String,
        default: '#fff'
    },
    textChatValueFooter: {
        type: String,
        default: ''
    },
    returnArrowColor: {
        type: String,
        default: '#FFFFFF'
    },
    returnArrowColorDark: {
        type: String,
        default: '#5eb1fb'
    },
    chatBodyFontFamily: {
        type: String,
        default: 'Chalkboard'
    },
    usersListTextColor: {
        type: String,
        default: '#000'
    },
    usersListTextColorDark: {
        type: String,
        default: '#FFF'
    },
    sendMessageColor: {
        type: String,
        default: '#8cad9b'
    },
    sendMessageColorDark: {
        type: String,
        default: '#2f3345'
    },
    receivedMessageColor: {
        type: String,
        default: '#a1a1a1'
    },
    receivedMessageColorDark: {
        type: String,
        default: '#343434'
    },
    sendMessageTextColor: {
        type: String,
        default: '#000000'
    },
    sendMessageTextColorDark: {
        type: String,
        default: '#FFFFFF'
    },
    receivedMessageTextColor: {
        type: String,
        default: '#000'
    },
    receivedMessageTextColorDark: {
        type: String,
        default: '#fff'
    },
    messageShadow: {
        type: String,
        default: '#3f3f3f'
    },
    messageShadowDark: {
        type: String,
        default: '#bbbbbb'
    },
    micColor: {
        type: String,
        default: '#191b1f'
    },
    onRecordColor: {
        type: String,
        default: '#ff422d'
    },
    micColorDark: {
        type: String,
        default: '#bbc4d5'
    },
    onRecordColorDark: {
        type: String,
        default: '#ac0485'
    },
    onRecorded: {
        type: Function,
        default: () => { }
    },
    onMessageSent: {
        type: Function,
        default: () => { }
    },
    onMessageReceived: {
        type: Function,
        default: () => { }
    },
    isDark: {
        type: Boolean,
        default: false
    },
    isNewGuest: {
        type: Boolean,
        default: true
    },
    onNewGuestCloseForm: {
        type: Function,
        default: () => { }
    },
    onNewGuestClearForm: {
        type: Function,
        default: () => { }
    },
    onAddMessage: {
        type: Function,
        default: () => { }
    }
})
const systemUsers = Array<User>()
props.users.forEach((user) => {
    let file: FileMessage
    let message: Message
    let userMessages = Array<Message>()
    let newUser = new User(user.id, user.firstName, user.lastName, user.gender, user.isOnline, user.userPicture, userMessages)
    user.messages.forEach((msg: any) => {
        file = new FileMessage(msg.file.name, msg.file.type, msg.file.lastModified)
        message = new Message(msg.id, user.id, msg.message, msg.received, msg.dateTime, msg.type, file, msg.provider)
        newUser.messages.push(message)
    });
    systemUsers.push(newUser)

})
const header_background: string = props.isDark ? props.headerBackgroundDark : props.headerBackground
const header_text_title_color: string = props.isDark ? props.textColorHeadTitleDark : props.textColorHeadTitle
const header_text_sub_color: string = props.isDark ? props.textColorHeadSubTitleDark : props.textColorHeadSubTitle
const shadow_color: string = props.isDark ? props.shadowColorDark : props.shadowColor

const body_background: string = props.isDark ? props.bodyBackgroundDark : props.bodyBackground
const user_list_color: string = props.isDark ? props.usersListTextColorDark : props.usersListTextColor
const send_message_color: string = props.isDark ? props.sendMessageColorDark : props.sendMessageColor
const received_message_color: string = props.isDark ? props.receivedMessageColorDark : props.receivedMessageColor
const send_text_color: string = props.isDark ? props.sendMessageTextColorDark : props.sendMessageTextColor
const received_text_color: string = props.isDark ? props.receivedMessageTextColorDark : props.receivedMessageTextColor
const message_shadow_color: string = props.isDark ? props.messageShadowDark : props.messageShadow

const back_footer: string = props.isDark ? props.backgroundDarkFooter : props.backgroundFooter
const mic_color: string = props.isDark ? props.micColorDark : props.micColor
const on_record_color: string = props.isDark ? props.onRecordColorDark : props.onRecordColor

const isFront = ref(!props.isGuest)
const hideEmoji = (element: HTMLElement) => {
    element.setAttribute("style", "visibility: hidden")
}
const guestUserName = ref('')
const currentUser = ref('')

const clickedUser = ref(props.supportUser)
const avatar = ref('')
if (props.isGuest) {
    clickedUser.value = props.supportUser as User
    guestUserName.value = (props.supportUser as User).firstName
}
const div_id = (): string => {
    let letter_numbers: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVZXYZ_abcdefghigklmnopqrstuvwxyz"
    let i: number = 0
    let id_array: Array<string> = [];
    for (; ;) {
        let one_char: string = letter_numbers.charAt(Math.floor(Math.random() * letter_numbers.length))
        id_array[i] = one_char
        if (i >= 20) break;
        i++
    }
    let id__: string = id_array.join("")
    return id__
}
let chat__inner_id: string = div_id()


const onBackToMain = () => {

    let container = document.getElementById(chat__inner_id)
    if (!props.isAnimation) {
        container!.classList.remove('chat__inner')
        container!.classList.remove('chat__inner_2')
        container!.style.transform = 'translateX(0) rotateY(-180deg)'
        container!.style.transform = 'scaleX(1)'
        isFront.value = true
        avatar.value = ''
        return
    }

    container!.style.transform = 'perspective(600px)'
    container!.style.transition = 'transform 1.5s'
    container!.style.transformStyle = 'preserve-3d'
    container!.classList.remove('chat__inner')
    setTimeout(() => {
        isFront.value = true
        avatar.value = ''
    }, 350)

}
const callbackUser = (user: User) => {
    let container = document.getElementById(chat__inner_id)
    clickedUser.value = user
    currentUser.value = user.firstName
    if (!props.isAnimation) {
        isFront.value = false
        avatar.value = user.userPicture
        container!.style.transform = 'rotateY(180deg)'
        container!.classList.add('chat__inner_2')
        return
    }
    container!.style.transform = 'translateX(0) rotateY(180deg)'

    setTimeout(() => {
        isFront.value = false
        avatar.value = user.userPicture
    }, 350)

}
const getStatus = (user: any): string => {
    if (user == null) {
        return ''
    }
    return user.isOnline ? 'Online' : 'Offline'

}
const getStatusColor = (user: any): string => {
    if (user != null) {
        switch (props.isDark) {
            case true: return user.isOnline ? props.statusOnlineDark : props.statusOfflineDark
            default: return user.isOnline ? props.statusOnline : props.statusOffline
        }
    }
    return ''
}
const returnArrow = (): string => {
    return props.isDark ? props.returnArrowColorDark : props.returnArrowColor
}

const getIsFront = computed(() => {
    return isFront.value
})

const guestName = (name: string): string => {
    return name
}
const guestEmail = (name: string): string => {
    return name
}
const guestPhone = (name: string): string => {
    return name
}

const onNewGuestSubmitForm = (guestData: any): any => {
    return guestData
}

const addMessage = (message: Message, user: User) => {
    let messages = user.messages
    message.id = messages.length + 1
    user.messages.push(message)
    if (message.received == false) {
        props.onMessageSent(message)
    } else {
        props.onMessageReceived(message)
    }
    props.onAddMessage(message)
}


</script>
<template>
    <div class="chat__face relative top-0 w-[400px] grid grid-cols-1">
        <div v-if="!isGuest">
            <div :id="chat__inner_id" class=" chat__inner ">
                <div v-if="getIsFront" class="absolute chat__front w-[400px] grid grid-cols-1">
                    <ChatHeader :logo="logo" :avatar="avatar" :status="status" :headerBackground="header_background"
                        :statusColor="getStatusColor(clickedUser)" :user-name="userName"
                        :returnArrowColor="returnArrow()" :textColorTitle="header_text_title_color"
                        :textColorSubTitle="header_text_sub_color" :titleText="`Right Click`"
                        :subTitleText="subTitleText" :is-front="getIsFront" :styleChat="styleChat"
                        :shadow-color="shadow_color" :is-dark="isDark" @onBackToMain="onBackToMain" />


                    <ChatBody :users="systemUsers" :background="body_background" @selectedUser="callbackUser"
                        :isFront="getIsFront" :font-family="chatBodyFontFamily" :usersListTextColor="user_list_color"
                        :sendMessageColor="send_message_color" :receivedMessageColor="received_message_color"
                        :sendMessageTextColor="send_text_color" :receivedMessageTextColor="received_text_color"
                        :messageShadow="message_shadow_color" :is-dark="isDark" />

                    <ChatFooter styleChat="leave" :backgroundFooter="back_footer" :isFront="getIsFront"
                        :micColor="mic_color" :on-record-color="on_record_color" :on-recorded="onRecorded"
                        :user-messages="(clickedUser as User).messages" :is-dark="isDark" :onMessageSent="onMessageSent"
                        :addMessage="addMessage" :isAudio="isAudio" :isFile="isFile" :user="clickedUser" />
                </div>
                <div v-if="!getIsFront" class="chat__face--back">
                    <ChatHeader :hideEmoji="hideEmoji" :logo="logo" :avatar="avatar" :status="getStatus(clickedUser)"
                        :statusColor="getStatusColor(clickedUser)" :userName="currentUser"
                        :returnArrowColor="returnArrow()" :headerBackground="header_background"
                        :textColorTitle="header_text_title_color" :textColorSubTitle="header_text_sub_color"
                        :titleText="`Right Click`" :subTitleText="subTitleText" :styleChat="styleChat"
                        :is-front="getIsFront" :shadow-color="shadow_color" :is-dark="isDark"
                        @onBackToMain="onBackToMain()" />
                    <ChatBody :users="systemUsers" :background="body_background" :isFront="isFront"
                        @selectedUser="callbackUser(clickedUser as User)" :user="clickedUser"
                        :font-family="chatBodyFontFamily" :usersListTextColor="user_list_color"
                        :sendMessageColor="send_message_color" :receivedMessageColor="received_message_color"
                        :sendMessageTextColor="send_text_color" :receivedMessageTextColor="received_text_color"
                        :messageShadow="message_shadow_color" :is-dark="isDark" />

                    <ChatFooter :hideEmoji="hideEmoji" :styleChat="styleChat" :backgroundFooter="back_footer"
                        :isFront="getIsFront" :user="clickedUser" :is-dark="isDark" :micColor="mic_color"
                        :on-recorded="onRecorded" :on-record-color="on_record_color"
                        :user-messages="(clickedUser as any).messages" :onMessageSent="onMessageSent"
                        :addMessage="addMessage" :isAudio="isAudio" :isFile="isFile" />
                </div>
            </div>
        </div>
        <!-- end if user login -->
        <div v-else>
            <ChatHeader key="" :logo="logo" :avatar="avatar" :status="status" :headerBackground="header_background"
                :statusColor="getStatusColor(clickedUser)" :user-name="guestUserName" :returnArrowColor="returnArrow()"
                :textColorTitle="header_text_title_color" :textColorSubTitle="header_text_sub_color"
                :titleText="titleText" :subTitleText="subTitleText" :is-front="getIsFront" :styleChat="styleChat"
                :shadow-color="shadow_color" :is-dark="isDark" @onBackToMain="onBackToMain" :is-guest="true" />

            <ChatBody :users="systemUsers" :background="body_background" :user="clickedUser" :isFront="getIsFront"
                :font-family="chatBodyFontFamily" :usersListTextColor="user_list_color"
                :sendMessageColor="send_message_color" :receivedMessageColor="received_message_color"
                :sendMessageTextColor="send_text_color" :receivedMessageTextColor="received_text_color"
                :messageShadow="message_shadow_color" :is-dark="isDark" :isGuest="isGuest" :isNewGuest="isNewGuest"
                :guestName="guestName" :guestEmail="guestEmail" :guestPhone="guestPhone"
                :onNewGuestClearForm="onNewGuestClearForm" :onNewGuestSubmitForm="onNewGuestSubmitForm" />

            <ChatFooter :isGuest="isGuest" :hideEmoji="hideEmoji" :styleChat="styleChat" :backgroundFooter="back_footer"
                :isFront="getIsFront" :micColor="mic_color" :on-record-color="on_record_color" :on-recorded="onRecorded"
                :user-messages="(clickedUser as any).messages" :is-dark="isDark" :is-guest-file="isGuestFile"
                :is-guest-audio="isGuestAudio" :onMessageSent="onMessageSent" :addMessage="addMessage"
                :isAudio="isAudio" :isFile="isFile" :user="clickedUser" :onNewGuestCloseForm="onNewGuestCloseForm" />
        </div>
    </div>

</template>