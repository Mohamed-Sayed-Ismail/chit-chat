    <script setup lang="ts">
    import { ref, reactive, defineProps, defineEmits } from 'vue';
    import MaleIcon from '../icons/MaleIcon.vue';
    import FemaleIcon from '../icons/FemaleIcon.vue';
    import AudioChat from '../chat/audio/AudioChat.vue';
    import PDFIcon from '../icons/PDFIcon.vue';
    import XLSIcon from '../icons/XLSIcon.vue';
    import GuestReg from '../GuestReg.vue';
    import { User } from './../../class/User.js'

    interface Props {
        users: Array<User>;
        user: object;
        background: string;
        fontFamily: string;
        isDark: boolean;
        isFront: boolean;
        sendMessageColor: string;
        sendMessageTextColor: string;
        receivedMessageColor: string;
        receivedMessageTextColor: string;
        usersListTextColor: string;
        messageShadow: string;
        hideEmoji: Function;
        isGuest: boolean;
        isNewGuest: boolean;
        guestName: Function;
        guestEmail: Function;
        guestPhone: Function;
        onNewGuestClearForm: Function;
        onNewGuestSubmitForm: Function;
        onNewGuestCloseForm: Function;
    }

    interface MessageRef {
        id: number;
        val: string;
    }

    const props: Props = defineProps({
        users: {
            type: Array<User>,
            default: [],
        },
        user: {
            type: Object,
            default() {
                return {};
            },
        },
        background: {
            type: String,
            required: true,
        },
        fontFamily: {
            type: String,
            default: 'cursive',
        },
        isDark: {
            type: Boolean,
            required: true,
        },
        isFront: {
            type: Boolean,
            required: true,
        },
        sendMessageColor: {
            type: String,
            required: true,
        },
        sendMessageTextColor: {
            type: String,
            required: true,
        },
        receivedMessageColor: {
            type: String,
            required: true,
        },
        receivedMessageTextColor: {
            type: String,
            required: true,
        },
        usersListTextColor: {
            type: String,
            required: true,
        },
        messageShadow: {
            type: String,
            required: true,
        },
        hideEmoji: {
            type: Function,
            default() { },
        },
        isGuest: {
            type: Boolean,
            default: false,
        },
        isNewGuest: {
            type: Boolean,
            default: false,
        },
        guestName: {
            type: Function,
            default: (value: any) => {
                return value;
            },
        },
        guestEmail: {
            type: Function,
            default: (value: any) => {
                return value;
            },
        },
        guestPhone: {
            type: Function,
            default: (value: any) => {
                return value;
            },
        },
        onNewGuestClearForm: {
            type: Function,
            default: () => { },
        },
        onNewGuestSubmitForm: {
            type: Function,
            default: () => { },
        },
        onNewGuestCloseForm: {
            type: Function,
            default: () => { },
        },
    });
    const stat = reactive({
        message_ref: [{} as MessageRef],
        readMore: (id: number) => {
            let result = ref(false);
            if (stat.message_ref.length > 0) {
                stat.message_ref.some((ele: MessageRef) => {
                    if (ele.id == id) {
                        if (ele.val == 'show') {
                            result = ref(true);
                        } else {
                            result = ref(false);
                        }
                    }
                });
            } else {
                result = ref(true);
            }
            return result.value;
        },
        readMoreLess: (id: number, val: string) => {
            stat.message_ref.some((element: MessageRef) => {
                if (element.id == id) {
                    stat.message_ref.filter(element => element !== element);
                    let msg: MessageRef = { id: id, val: val };
                    stat.message_ref.push(msg);
                    return;
                }
            });
            let msg: MessageRef = { id: id, val: val };
            stat.message_ref.push(msg);
        },
    });

    const emits = defineEmits(['selectedUser']);

    const doEmit = (user: any) => {
        emits('selectedUser', user);
    };

    const getColor = () => {
        let c = props.background.substring(1);
        let rgb = parseInt(c, 16);
        let r = (rgb >> 16) & 0xff;
        let g = (rgb >> 8) & 0xff;
        let b = (rgb >> 0) & 0xff;
        let lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        if (lum < 70) {
            return '#FFFFFF';
        }
        return '#000';
    };

    const message_id = () => {
        let letter_numbers = '0123456789ABCDEFGHIJKLMNOPQRSTUVZXYZ_abcdefghigklmnopqrstuvwxyz';
        let i = 0;
        let id_array: string[] = [];
        for (; ;) {
            let one_char = letter_numbers.charAt(Math.floor(Math.random() * letter_numbers.length));
            id_array[i] = one_char;
            if (i >= 23) break;
            i++;
        }
        let id__ = id_array.join('');
        return id__;
    };

    let div_message_id = message_id();

    let scrollMessages = () => {
        let element = document.getElementById(div_message_id);
        if (element !== null) {
            element.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };
    const isUrl = (str: string) => {
        var urlPattern = new RegExp('^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$', 'i');
        return !!urlPattern.test(str);
    }
    const setBackground = (color: string, amount: number) => {
        return '#' + color.replace(/^#/, '').replace(/../g, (color) => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).slice(-2));
    };

    const receivedAudioControllerBackground = setBackground(props.receivedMessageColor, -100);
    const audioControllerBackground = setBackground(props.sendMessageColor, -15);
</script>

    <template>

        <div class="`relative scrollbar-hide  h-[550px] sm:max-h-[550px] md:w-[400px]  border-opacity-55  overflow-scroll overflow-x-hidden scroll-m-0 `"
            :style="`background-color:${background}; color:${getColor()}`" :onclick="hideEmoji">
            <div v-if="isFront">

                <div v-for="user in users" :key="(user as any).id"
                    :class="`h-14 w-full border-b border-b-[#000] border-opacity-15 hover:opacity-30 `">
                    <div class="relative content-center h-12 w-full flex justify-center items-center m-auto cursor-pointe cursor-pointer "
                        v-if="(user as any).gender === 'male'" v-on:click="doEmit(user)">
                        <div v-if="(user as any).userPicture != ''">
                            <img :src="(user as any).userPicture"
                                class="absolute left-1 inline-block align-middle w-8 h-8 rounded-full" />
                            <p class="absolute inline-block align-middle justify-center content-center right-1 min-w-40"
                                :style="`font-family:${fontFamily};`">
                                {{ (user as any).firstName + ' ' + (user as any).lastName }}
                            </p>
                        </div>
                        <div v-else>
                            <MaleIcon class="absolute left-1 inline-block align-middle w-8" :user="user" />
                            <p class="absolute inline-block align-middle justify-center content-center right-1 min-w-40"
                                :style="`font-family:${fontFamily};`">
                                {{ (user as any).firstName + ' ' + (user as any).lastName }}
                            </p>
                        </div>
                    </div>
                    <div class="relative  content-center h-12 w-full flex justify-center items-center m-auto cursor-pointer"
                        v-if="(user as any).gender === 'female'" v-on:click="doEmit(user)">
                        <div v-if="(user as any).userPicture != ''">
                            <img :src="(user as any).userPicture"
                                class="absolute left-1 inline-block align-middle w-8 h-8 rounded-full" />
                            <p class="absolute inline-block align-middle justify-center content-center right-1 min-w-40"
                                :style="`font-family:${fontFamily};`">
                                {{ (user as any).firstName + ' ' + (user as any).lastName }}
                            </p>
                        </div>
                        <div v-else>
                            <FemaleIcon class="absolute left-1 inline-block align-middle w-8 " :user="user" />
                            <p class="absolute inline-block align-middle justify-center content-center right-1 min-w-40 "
                                :style="`font-family:${fontFamily};`">
                                {{ (user as any).firstName + ' ' + (user as any).lastName }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div :id="div_message_id" v-if="!isFront && user !== null">
                <div v-if="isGuest">
                    <div v-if="isNewGuest">
                        <GuestReg :guestName="guestName" :guestEmail="guestEmail" :guestPhone="guestPhone"
                            :backgroundColor="setBackground(receivedAudioControllerBackground, 40)"
                            :border="setBackground(receivedAudioControllerBackground, 20)" :isNewGuest="isNewGuest"
                            :onNewGuestClearForm="onNewGuestClearForm" :onNewGuestCloseForm="onNewGuestCloseForm"
                            :onNewGuestSubmitForm="onNewGuestSubmitForm" class="left-4" />
                    </div>
                </div>
                <div v-for="message in user.messages" :key="message.id">
                    <div class="relative p-1  flex w-full flex-col gap-4">
                        <div v-if="message.received"
                            v-show="(message.type == 'text' && message.message !== '') || message.type == 'file' || message.type == 'audio'"
                            class="relative top-3 mr-auto ml-2 mb-4  p-4 flex max-w-[80%] flex-col gap-2 rounded-r-xl shadow-md rounded-tl-xl whitespace-pre-line break-words"
                            :style="`background-color:${receivedMessageColor}; color:${receivedMessageTextColor};  --tw-shadow-color: ${messageShadow}; --tw-shadow: var(--tw-shadow-colored);`">
                            <span class="font-semibold ">{{ user.firstName }}</span>
                            <div v-if="message.type == 'text' && message.message !== ''">
                                <div v-if="isUrl(message.message)" class="text-sm  top-1">
                                    <a :href="message.message" target="_blank">{{
                                        message.message }}</a>
                                </div>
                                <div v-else>
                                    <div class="text-sm  top-1">
                                        <div v-if="message.message.length < 200">
                                            {{ message.message }}
                                            {{ scrollMessages() }}
                                        </div>
                                        <div v-else>
                                            <div v-if="!stat.readMore(message.id)">
                                                {{ `${message.message.slice(0, 200)}....` }}<a
                                                    class="text-[#959695] font-bold"
                                                    v-on:click="stat.readMoreLess(message.id, 'show')" href="#">read
                                                    more</a>
                                                {{ scrollMessages() }}
                                            </div>
                                            <div v-else>
                                                {{ message.message + '...' }}<a class="text-[#959695] font-bold"
                                                    v-on:click="stat.readMoreLess(message.id, 'hide')" href="#">read
                                                    less</a>
                                                {{ scrollMessages() }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="message.type == 'audio'">
                                <AudioChat :is-dark="isDark"
                                    :receivedAudioControllerBackground="receivedAudioControllerBackground"
                                    :audioControllerBackground="audioControllerBackground" :is-received="true"
                                    :audio-source="message.message" />
                                {{ scrollMessages() }}
                            </div>
                            <div v-if="message.type == 'file'">
                                <div v-if="message.file.type == 'pdf'">
                                    <a :href="message.file.url">
                                        <PDFIcon />
                                    </a>
                                    {{ scrollMessages() }}
                                </div>
                                <div v-if="message.file.type == 'xls'" class="w-20 h-24">
                                    <a :href="message.file.url">
                                        <XLSIcon />

                                    </a>
                                    {{ scrollMessages() }}
                                </div>
                                <div
                                    v-if="message.file.type == 'png' || message.file.type == 'mpeg'
                                        || message.file.type == 'jpg' || message.file.type == 'webp' || message.file.type == 'jpeg' || message.file.type == 'jfif' || message.file.type == 'pjpeg' || message.file.type == 'pjp'">

                                    <div class="w-32 h-32 flex relative right-0">
                                        <a :href="message.file.url"> <img width="100px" height="100px"
                                                :src="message.file.url" class="" /></a>
                                        {{ scrollMessages() }}
                                    </div>

                                </div>
                                <div
                                    v-if="message.file.type == 'mp3' || message.file.type == 'wav' || message.file.type == 'ogg'">
                                    <AudioChat :is-dark="isDark" :is-received="false"
                                        :receivedAudioControllerBackground="receivedAudioControllerBackground"
                                        :audioControllerBackground="audioControllerBackground"
                                        :audio-source="message.file.url" class="relative" />
                                    {{ scrollMessages() }}
                                </div>
                                <div v-if="message.file.type == 'xls'" class="w-20 h-24">
                                    <a :href="message.file.url">
                                        <XLSIcon />
                                    </a>
                                    {{ scrollMessages() }}
                                </div>
                            </div>

                        </div>
                        <div v-else-if="!message.received"
                            v-show="(message.type == 'text' && message.message !== '') || message.type == 'file' || message.type == 'audio'"
                            class="relative top-3 bottom-1 ml-auto mr-2  mb-4 flex max-w-[80%] flex-col gap-2 p-4 shadow-md rounded-l-xl rounded-tr-xl  whitespace-pre-line break-words"
                            :style="`background-color:${sendMessageColor}; color:${sendMessageTextColor};  --tw-shadow-color: ${messageShadow}; --tw-shadow: var(--tw-shadow-colored); `">
                            <div v-if="isUrl(message.message)" class="text-sm  top-1">
                                <a :href="message.message" target="_blank" rel="noopener noreferrer">{{
                                    message.message }}</a>
                            </div>
                            <div v-else>
                                <div v-if="message.type == 'text' && message.message !== ''">
                                    <div v-if="message.message.length < 200">
                                        {{ message.message }}
                                        {{ scrollMessages() }}
                                    </div>
                                    <div v-else>
                                        <div v-if="!stat.readMore(message.id)">
                                            {{ `${message.message.slice(0, 200)}....` }}<a
                                                class="text-[#959695] font-bold"
                                                v-on:click="stat.readMoreLess(message.id, 'show')" href="#">read
                                                more</a>
                                            {{ scrollMessages() }}
                                        </div>
                                        <div v-else>
                                            {{ message.message + '...' }}<a class="text-[#959695] font-bold"
                                                v-on:click="stat.readMoreLess(message.id, 'hide')" href="#">read
                                                less</a>
                                            {{ scrollMessages() }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="message.type == 'audio'">
                                <AudioChat :is-dark="isDark" :is-received="false"
                                    :receivedAudioControllerBackground="receivedAudioControllerBackground"
                                    :audioControllerBackground="audioControllerBackground"
                                    :audio-source="message.message" class="relative" />
                                {{ scrollMessages() }}
                            </div>
                            <div v-if="message.type == 'file'">

                                <div v-if="message.file.type == 'pdf'" class="w-20 h-24">
                                    <a :href="message.file.url">
                                        <PDFIcon />
                                    </a>
                                    {{ scrollMessages() }}
                                </div>
                                <div v-if="message.file.type == 'xls'" class="w-20 h-24">
                                    <a :href="message.file.url">
                                        <XLSIcon />

                                    </a>
                                    {{ scrollMessages() }}
                                </div>
                                <div
                                    v-if="message.file.type == 'png' || message.file.type == 'mpeg'
                                        || message.file.type == 'jpg' || message.file.type == 'webp' || message.file.type == 'jpeg' || message.file.type == 'jfif' || message.file.type == 'pjpeg' || message.file.type == 'pjp'">

                                    <div class="w-32 h-32">
                                        <a :href="message.file.url"> <img width="100px" height="100px"
                                                :src="message.file.url" /></a>
                                        {{ scrollMessages() }}
                                    </div>

                                </div>
                                <div
                                    v-if="message.file.type == 'mp3' || message.file.type == 'wav' || message.file.type == 'ogg'">
                                    <AudioChat :is-dark="isDark" :is-received="false"
                                        :receivedAudioControllerBackground="receivedAudioControllerBackground"
                                        :audioControllerBackground="audioControllerBackground"
                                        :audio-source="message.file.url" class="relative" />
                                    {{ scrollMessages() }}
                                </div>

                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    </template>