<script setup lang="ts">
const props = defineProps({
    isDark: {
        type: Boolean,
        required: true
    },
    acceptedFileType: {
        type: Object,
        default: () => { return { 1: 'log', 2: 'txt', 3: 'pdf', 4: 'png', 5: 'mp3', 6: 'mpeg', 7: 'xml', 9: 'odt', 10: 'xls', 11: 'jpg', 12: 'webp', 13: 'jpeg', 14: 'jfif', 15: 'pjpeg', 16: 'pjp', 17: 'ogg' } }
    },
    isAction: {
        type: Boolean,
        required: true
    },
    isGuestFile: {
        type: Boolean,
        default: false
    },
    isGuest: {
        type: Boolean,
        default: false
    },
    onFileSelected: {
        type: Function,
        default: () => { }
    },
    isFile: {
        type: Boolean,
        default: true
    },

})
const isIncludes = (obj: any, extension: any) => {
    let array = Object.values(obj)
    if (array.includes(extension)) {
        return true
    }
    return false
}
const onFileSelected = (files: any) => {
    try {
        const extension = files[0].name.split('.').pop()
        if (isIncludes(props.acceptedFileType, extension)) {
            props.onFileSelected(files[0])

        }
    } catch (e) {
        return e
    }
}
const stroke_color = props.isDark ? '#fff' : '#000'
</script>

<template>
    <div v-if="isFile">
        <div v-if="!isGuest">
            <div v-show="!isAction" @click="($refs.file as HTMLInputElement).click()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve">
                    <path style="fill:none" :stroke="stroke_color" stroke-width="5"
                        d="M217.056 511.995c-53.091-.516-95.486-44.57-95.486-97.663V135.908C121.57 61.729 181.036.428 255.214.002c74.483-.428 135.215 60.041 135.215 134.427v171.836c0 9.684-7.851 17.534-17.534 17.534s-17.534-7.851-17.534-17.534V135.696c0-54.702-43.68-100.092-98.38-100.623-55.235-.535-100.341 44.242-100.341 99.356v280.103c0 33.605 26.585 61.751 60.185 62.388 34.38.652 62.555-27.124 62.555-61.358V146.693c0-12.66-9.825-23.457-22.477-23.937-13.3-.503-24.281 10.172-24.281 23.363v204.566c0 9.684-7.851 17.534-17.534 17.534s-17.534-7.851-17.534-17.534V147.099c0-32.005 25.319-58.811 57.318-59.418 32.743-.621 59.577 25.834 59.577 58.437v269.443c-.002 53.494-43.782 96.954-97.393 96.434" />
                </svg>
                <input type="file" ref="file" @change="onFileSelected(($event.target as HTMLInputElement).files)"
                    class="hidden" />
            </div>
        </div>
        <div v-else-if="isGuest">
            <div v-if="isGuestFile">
                <div v-show="!isAction" @click="($refs.file as HTMLInputElement).click()">

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve">
                        <path style="fill:none" :stroke="stroke_color" stroke-width="5"
                            d="M217.056 511.995c-53.091-.516-95.486-44.57-95.486-97.663V135.908C121.57 61.729 181.036.428 255.214.002c74.483-.428 135.215 60.041 135.215 134.427v171.836c0 9.684-7.851 17.534-17.534 17.534s-17.534-7.851-17.534-17.534V135.696c0-54.702-43.68-100.092-98.38-100.623-55.235-.535-100.341 44.242-100.341 99.356v280.103c0 33.605 26.585 61.751 60.185 62.388 34.38.652 62.555-27.124 62.555-61.358V146.693c0-12.66-9.825-23.457-22.477-23.937-13.3-.503-24.281 10.172-24.281 23.363v204.566c0 9.684-7.851 17.534-17.534 17.534s-17.534-7.851-17.534-17.534V147.099c0-32.005 25.319-58.811 57.318-59.418 32.743-.621 59.577 25.834 59.577 58.437v269.443c-.002 53.494-43.782 96.954-97.393 96.434" />
                    </svg>
                    <input type="file" ref="file" @change="onFileSelected(($event.target as HTMLInputElement).files)"
                        class="hidden" />
                </div>
            </div>
        </div>
    </div>
</template>