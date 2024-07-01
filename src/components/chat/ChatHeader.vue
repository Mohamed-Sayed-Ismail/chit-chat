    <script setup lang="ts">
    import CompanyLogo from '../icons/CompanyLogo.vue'
    import BackArrow from '../icons/BackArrow.vue';
    import { defineProps, defineEmits } from 'vue';
    import type { PropType } from 'vue'

    interface Props {
        avatar: string;
        status: string;
        logo: string;
        statusColor: string;
        userName: string;
        headerBackground: string;
        fontFamily: string;
        shadowColor: string;
        textColorTitle: string;
        textColorSubTitle: string;
        styleChat: string;
        isFront: boolean;
        titleText: string;
        subTitleText: string;
        isDark: boolean;
        returnArrowColor: string;
        isGuest: boolean;
        hideEmoji: () => void;
    }

    const props = defineProps({
        avatar: {
            type: String as PropType<Props['avatar']>,
            required: true
        },
        status: {
            type: String as PropType<Props['status']>,
            default: ''
        },
        logo: {
            type: String as PropType<Props['logo']>,
            required: true
        },
        statusColor: {
            type: String as PropType<Props['statusColor']>,
            required: true
        },
        userName: {
            type: String as PropType<Props['userName']>,
            required: true
        },
        headerBackground: {
            type: String as PropType<Props['headerBackground']>,
            required: true
        },
        fontFamily: {
            type: String as PropType<Props['fontFamily']>,
            default: 'san-serf'
        },
        shadowColor: {
            type: String as PropType<Props['shadowColor']>,
            required: true
        },
        textColorTitle: {
            type: String as PropType<Props['textColorTitle']>,
            required: true
        },
        textColorSubTitle: {
            type: String as PropType<Props['textColorSubTitle']>,
            required: true
        },
        styleChat: {
            type: String as PropType<Props['styleChat']>,
            required: true
        },
        isFront: {
            type: Boolean as PropType<Props['isFront']>,
            required: true
        },
        titleText: {
            type: String as PropType<Props['titleText']>,
            required: true
        },
        subTitleText: {
            type: String as PropType<Props['subTitleText']>,
            required: true
        },
        isDark: {
            type: Boolean as PropType<Props['isDark']>,
            required: true
        },
        returnArrowColor: {
            type: String as PropType<Props['returnArrowColor']>,
            required: true
        },
        isGuest: {
            type: Boolean as PropType<Props['isGuest']>,
            default: false
        },
        hideEmoji: {
            type: Function,
            default: () => { }
        }
    })

    const chat_style = (): string => {
        let local_style = '';
        switch (props.styleChat) {
            case 'round-top':
                local_style = 'rounded-tl-3xl  rounded-tr-3xl ';
                break;
            case 'leave':
                local_style = 'rounded-tl-3xl ';
                break;
            case 'flat':
                local_style = 'rounded-none ';
                break;
            default:
                local_style = 'rounded-tl-3xl ';
                break;
        }
        return local_style;
    }

    const backToUsers = defineEmits(['onBackToMain'])

    const onBackToMain = (): void => {
        backToUsers('onBackToMain')
    }
</script>
    <template>
        <div :className="`relative ${chat_style()}  w-[400px] h-32 border border-b-[1px] border-b-white border-opacity-45 place-content-center`"
            :style="`background-color:${headerBackground}; border: 1px ${headerBackground} solid;  --tw-border-opacity: 0.45;`">
            <div
                class="absolute top-2 p-2 items-center justify-center text-center rounded-full opacity-95 flex  content-center w-16 h-16">
                <div v-if="avatar.trim() === ''" class="relative">
                    <CompanyLogo :logo="logo" class="relative z-10 left-2" />
                </div>
                <div v-else>
                    <img :src="avatar" alt="" class="relative rounded-full  z-10 left-2 m-auto w-full h-full" />
                </div>
            </div>
            <div v-if="!isFront" class="relative">
                <div class=" items-center w-full h-fit justify-center text-center   text-shadow-sm text-3xl font-sans font-bold"
                    :style="`color:${textColorTitle};  --tw-shadow-color: ${shadowColor}; --tw-shadow: var(--tw-shadow-colored);`">
                    <h1>{{ userName }} </h1>
                </div>
                <div class=" items-center w-full justify-center p-3 text-center font-serif font-thin italic "
                    :style="`color:${statusColor};`">
                    <h6>{{ status }}</h6>
                </div>
                <div v-if="!isGuest" class="relative  h-8 w-full bottom-2 left-1">
                    <BackArrow class="absolute h-8 w-8 left-3 " @onBackToMain="onBackToMain"
                        :fill-color="returnArrowColor" />
                </div>
            </div>
            <div v-if="isFront">
                <div class="items-center w-full h-fit justify-center text-center   text-shadow-sm text-3xl font-sans font-bold"
                    :style="`color:${textColorTitle};  --tw-shadow-color: ${shadowColor}; --tw-shadow: var(--tw-shadow-colored);`">
                    <h1>{{ titleText }} </h1>
                </div>
                <div v-if="isFront"
                    class=" items-center w-full justify-center text-center p-5 font-serif font-thin italic"
                    :style="`color:${textColorSubTitle};`">
                    <h6>{{ subTitleText }}</h6>
                </div>
            </div>
        </div>
    </template>