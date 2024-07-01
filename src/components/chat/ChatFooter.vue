        <script setup lang="ts">
        import Emoje from '../icons/EmojeIcon.vue'
        import Mic from '../icons/MicIcon.vue'
        import EmojiPicker from 'vue3-emoji-picker'
        import ChatTextArea from '../text/ChatTextArea.vue'
        import 'vue3-emoji-picker/css'
        import SendIcon from '../icons/SendIcon.vue'
        import FileSelector from './../../components/icons/FileSelector.vue'
        import { computed, defineProps, defineEmits, ref } from 'vue'
        import { Message } from './../../class/Message.js'
        const props = defineProps({
            backgroundFooter: {
                type: String,
                required: true
            },
            fontFamilyFooter: {
                type: String,
                default: 'san-serf'
            },
            textColorFooter: {
                type: String,
                default: '#000'
            },
            styleChat: {
                type: String,
                required: true
            },
            textChatValueFooter: {
                type: String,
                default: ''
            },
            isFront: {
                type: Boolean,
                required: true
            },
            user: {
                type: Object,
                default() {
                    return {}
                }
            },
            isAudio: {
                type: Boolean,
                default: true
            },
            micColor: {
                type: String,
                required: true
            },
            onRecordColor: {
                type: String,
                required: true
            },
            onRecorded: {
                type: Function,
                required: true
            },
            isFile: {
                type: Boolean,
                default: true
            },
            userMessages: {
                type: Array<Message>,
                required: false
            },
            isDark: {
                type: Boolean,
                required: true
            },
            hideEmoji: {
                type: Function,
                default: () => { }
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
                default: false
            },
            onMessageSent: {
                type: Function,
                default: () => { }
            },
            addMessage: {
                type: Function,
                default: () => { }
            },
            onFileSelected: {
                type: Function,
                default: () => { }
            }

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
                record = new MediaRecorder(stream) as any
                record.start()
                record.ondataavailable = (e: BlobEvent) => {
                    chunks.push(e.data)
                    if (record.state == 'inactive') {
                        let blob = new Blob(chunks, { type: "audio/webm;codecs=opus" })
                        let audioObj = URL.createObjectURL(blob)
                        props.onRecorded(audioObj)
                        let messages = props.userMessages as any
                        let message = {
                            id: messages.length > 1 ? 1 : messages.length + 1,
                            message: blob,
                            received: false,
                            dateTime: new Date().toLocaleString(),
                            type: 'audio',
                            provider: '',
                        }
                        messages.push(message)
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
                record.stop()
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

        let emojiVisible = false

        const hideShowEmoji = () => {
            const element = document.getElementById(emoji_id)
            emojiVisible ? element!.setAttribute("style", "visibility: hidden") : element!.setAttribute("style", "visibility: visible")
            emojiVisible = !emojiVisible;
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
        const textArea = ref(null)

        const appendMessage = () => {
            const element = document.getElementById(emoji_id)
            element!.setAttribute("style", "visibility: hidden")
            emojiVisible = false
            if (typedMessage.value.length < 1) return
            let messages = props.userMessages as any
            let message = {
                id: messages.length + 1,
                message: typedMessage.value,
                received: false,
                dateTime: new Date().toLocaleString(),
                type: 'text',
                provider: '',
            }
            //messages.push(message)
            props.addMessage(message, props.user)

            if (textArea.value != null) {
                (textArea.value as any).value = ''
            }

            typedMessage.value = ''
            isAction.value = false
        }

        const fileHandler = (file: File) => {
            const fileName = file.name
            const extension = fileName.split('.').pop()

            if (extension == 'mp3' || extension == 'wav' || extension == 'ogg') {
                const blob = new Blob([file], { type: "audio/webm;codecs=opus" })
                let messages = props.userMessages as any
                let message = {
                    id: messages.length + 1,
                    message: typedMessage.value,
                    received: false,
                    dateTime: new Date().toLocaleString(),
                    type: 'file',
                    file: { name: fileName, type: extension, lastModified: '', url: blob },
                    provider: '',
                }
                //messages.push(message)
                props.addMessage(message, props.user)
                return
            }
            const blob = new Blob([file], { type: `application/${extension}` })
            const url = URL.createObjectURL(blob)
            let messages = props.userMessages as any
            let message = {
                id: messages.length + 1,
                message: typedMessage.value,
                received: false,
                dateTime: new Date().toLocaleString(),
                type: 'file',
                file: { name: fileName, type: extension, lastModified: '', url: url },
                provider: '',
            }
            props.addMessage(message, props.user)
            // messages.push(message)
        }

        const asyncText = (el: any) => {
            const element = document.getElementById(emoji_id)
            element!.setAttribute("style", "visibility: hidden")
            emojiVisible = false
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
            console.log(typedMessage.value)
        }

        const getAction = computed(() => {
            return isAction.value
        })

        const getTextAreaColor = (color: string, amount: number) => {
            return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).slice(-2));
        }

        const text_area_background = props.isDark ? getTextAreaColor(props.backgroundFooter, -10) : getTextAreaColor(props.backgroundFooter, -10)
        const text_area_text = props.isDark ? getTextAreaColor(text_area_background, 200) : getTextAreaColor(text_area_background, -90)
</script>

        <template>
            <div v-if="!isFront" :class="`grid relative  ${style_chat()}  border-opacity-55 border-b-1 w-[400px] h-24`"
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
            <div v-else :class="`grid relative  ${style_chat()}  border-opacity-55 border-b-1 w-[400px] h-24`
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