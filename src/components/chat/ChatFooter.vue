<script setup lang="ts">
import Emoje from '../icons/EmojeIcon.vue'
import Mic from '../icons/MicIcon.vue'
import EmojiPicker from 'vue3-emoji-picker'
import ChatTextArea from '../text/ChatTextArea.vue'
import 'vue3-emoji-picker/css'
import SendIcon from '../icons/SendIcon.vue'
import FileSelector from './../../components/icons/FileSelector.vue'
import { computed, ref } from 'vue'
import { Message } from './../../class/Message.js'
import { FileMessage } from './../../class/FileMessage.js'
import { User } from './../../class/User.js'

interface Props {
    backgroundFooter?: string;
    fontFamilyFooter?: string;
    textColorFooter?: string;
    styleChat?: string;
    textChatValueFooter?: string;
    isFront?: boolean;
    user?: User;
    isAudio?: boolean;
    micColor?: string;
    onRecordColor?: string;
    onRecorded?: (audio: string) => void;
    isFile?: boolean;
    userMessages?: Array<Message>;
    isDark?: boolean;
    hideEmoji?: () => void;
    isGuest?: boolean;
    isGuestAudio?: boolean;
    isGuestFile?: boolean;
    onMessageSent?: (message: Message) => void;
    addMessage?: (message: Message, user: User) => void;
    onFileSelected?: (file: File) => void;
}

const props = withDefaults(defineProps<Props>(), {
    backgroundFooter: '#f0f0f0',
    fontFamilyFooter: 'san-serf',
    textColorFooter: '#000',
    styleChat: 'leave',
    textChatValueFooter: '',
    isFront: true,
    user: () => new User(0, '', '', '', false, '', []),
    isAudio: true,
    micColor: '#000000',
    onRecordColor: '#ff0000',
    onRecorded: () => { },
    isFile: true,
    userMessages: () => [],
    isDark: false,
    hideEmoji: () => { },
    isGuest: false,
    isGuestAudio: true,
    isGuestFile: false,
    onMessageSent: () => { },
    addMessage: () => { },
    onFileSelected: () => { }
})

const isRecording = ref(false)
const fill_color = ref('none')
const stroke_color = ref(props.micColor)

let chunks: BlobPart[] = []
let record: MediaRecorder

const endStartRecord = () => {
    isRecording.value = !isRecording.value
    fill_color.value = isRecording.value ? props.onRecordColor : 'none'
    stroke_color.value = isRecording.value ? 'none' : props.micColor

    const recordHandler = (stream: MediaStream) => {
        record = new MediaRecorder(stream)
        record.start()
        record.ondataavailable = (e: BlobEvent) => {
            chunks.push(e.data)
            if (record.state == 'inactive') {
                let blob = new Blob(chunks, { type: "audio/webm;codecs=opus" })
                let audioObj = URL.createObjectURL(blob)
                if (props.onRecorded) {
                    props.onRecorded(audioObj)
                }
                let messages = props.userMessages as any
                let message = new Message(
                    messages.length > 1 ? 1 : messages.length + 1,
                    props.user.id,
                    audioObj,
                    false,
                    new Date().toLocaleString(),
                    'audio',
                    new FileMessage('', '', '', ''),
                    ''
                )
                if (props.addMessage) {
                    props.addMessage(message, props.user)
                }
                stream.getTracks().forEach(function (track) {
                    track.stop();
                    chunks = []
                })
            }
        }
    }

    const getMic = () => {
        if (navigator.mediaDevices.getUserMedia) {
            let constrain = { audio: true, video: false }
            navigator.mediaDevices.getUserMedia(constrain).then((stream) => {
                recordHandler(stream)
            })
        }
    }

    if (isRecording.value) {
        getMic()
    } else {
        if (record) {
            record.stop()
        }
    }
}

const div_id = () => {
    let letter_numbers = "0123456789ABCDEFGHIJKLMNOPQRSTUVZXYZ_abcdefghigklmnopqrstuvwxyz"
    let i = 0
    let id_array: string[] = [];
    for (; ;) {
        let one_char = letter_numbers.charAt(Math.floor(Math.random() * letter_numbers.length))
        id_array[i] = one_char
        if (i >= 20) break;
        i++
    }
    let id__ = id_array.join("")
    return id__
}

const emoji_id = div_id()

let emojiVisible = ref(false)

const hideShowEmoji = () => {
    emojiVisible.value = !emojiVisible.value
}

const style_chat = () => {
    var local_style = '';
    switch (props.styleChat) {
        case 'round-top':
            local_style = 'rounded-tl-s  rounded-tr-s ';
            break;
        case 'leave':
            local_style = 'rounded-br-3xl ';
            break;
        case 'flat':
            local_style = 'rounded-none ';
            break;
        default:
            local_style = '';
            break;
    }
    return local_style;
}

let typedMessage = ref('')
const textArea = ref<HTMLTextAreaElement | null>(null)

const appendMessage = () => {
    emojiVisible.value = false
    if (typedMessage.value.trim().length < 1) return
    let messages = props.userMessages as any
    let message = new Message(
        messages.length + 1,
        props.user.id,
        typedMessage.value,
        false,
        new Date().toLocaleString(),
        'text',
        new FileMessage('', '', '', ''),
        ''
    )
    if (props.addMessage) {
        props.addMessage(message, props.user)
    }

    if (textArea.value) {
        textArea.value.value = ''
    }

    typedMessage.value = ''
    isAction.value = false
}

const fileHandler = (file: File) => {
    const fileName = file.name
    const extension = fileName.split('.').pop() || ''

    const blob = new Blob([file], { type: file.type })
    const url = URL.createObjectURL(blob)

    let messageType = 'file';
    if (['mp3', 'wav', 'ogg'].includes(extension)) {
        messageType = 'audio';
    }

    let messages = props.userMessages as any
    let message = new Message(
        messages.length + 1,
        props.user.id,
        '',
        false,
        new Date().toLocaleString(),
        messageType,
        new FileMessage(fileName, extension, '', url),
        ''
    )
    if (props.addMessage) {
        props.addMessage(message, props.user)
    }
}

const asyncText = (el: any) => {
    emojiVisible.value = false
    textArea.value = el
}

const emit = defineEmits(['update:textChatValue'])
let isAction = ref(false)

const updateValue = (value: string) => {
    emit('update:textChatValue', value)
    if (value.trim().length > 0) {
        typedMessage.value = value
        isAction.value = true
    } else {
        isAction.value = false
    }
}

function onSelectEmoji(emoji: any) {
    updateValue(typedMessage.value + emoji.i)
}

const getAction = computed(() => {
    return isAction.value
})

const getTextAreaColor = (color: string, amount: number) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).slice(-2));
}

const text_area_background = computed(() => props.isDark ? getTextAreaColor(props.backgroundFooter, -10) : getTextAreaColor(props.backgroundFooter, -10))
const text_area_text = computed(() => props.isDark ? getTextAreaColor(text_area_background.value, 200) : getTextAreaColor(text_area_background.value, -90))
</script>

        <template>
            <div v-if="!isFront" :class="`grid relative  ${style_chat()}  border-opacity-55 border-b-1 w-full h-24`"
                :style="`background-color:${backgroundFooter}; border: 1px ${backgroundFooter} solid;  --tw-border-opacity: 0.45;`">
                <div :id="emoji_id" class="w-full absolute    bottom-28 ease-in-out" v-show="emojiVisible">
                    <EmojiPicker :hide-group-name="true" :hide-search="true" :native="true" :hide-group-icons="true"
                        :disable-sticky-group-names="false" class="scroll-0 scrollbar-hide"
                        :style="`background-color:${getTextAreaColor(text_area_background, 20)};`"
                        @select="onSelectEmoji" />

                </div>
                <div class="relative  grid  h-26 w-full items-center">
                    <Emoje emojiColor="#fff" class="absolute left-2 w-9 h-9 cursor-pointer " @click="hideShowEmoji" />
                    <div class=" relative left-14 w-full  h-16 rounded-md max-w-72">
                        <ChatTextArea :value="typedMessage" v-on:input="updateValue($event.target.value)"
                            v-on:click="asyncText($event.target)" class="relative scrollbar-hide w-full rounded-md"
                            v-on:keyup.enter="appendMessage"
                            :style="`background-color:${text_area_background}; color:${text_area_text}`" />
                        <Mic :isGuestAudio="isGuestAudio"
                            class="w-10 top-2 absolute right-0 justify-center content-center cursor-pointer"
                            :mic-color="stroke_color" :isAction="getAction" :record-color="fill_color"
                            @click="endStartRecord" :isAudio="isAudio" />
                        <FileSelector :onFileSelected="fileHandler" :is-guest="isGuest" :isGuestFile="isGuestFile"
                            :isAction="getAction" :isFile="isFile"
                            class="w-8 top-3 absolute right-8  justify-center content-center cursor-pointer"
                            :isDark="isDark" />
                    </div>
                    <SendIcon :is-action="getAction" class="absolute right-2 w-11 h-11 cursor-pointer top-8"
                        @click="appendMessage" />
                </div>

            </div>
            <div v-else :class="`grid relative  ${style_chat()}  border-opacity-55 border-b-1 w-full h-24`
                "
                :style="`background-color:${backgroundFooter}; border: 1px ${backgroundFooter} solid;  --tw-border-opacity: 0.45;`">

            </div>
        </template>
<style>
.v3-sticky {
    visibility: hidden;
}

.v3-footer {
    visibility: hidden;
}

.v3-body::-webkit-scrollbar {
    display: none;
}

.v3-body-inner {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>