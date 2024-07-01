<script setup lang="ts">
defineProps({
    micColor: {
        type: String,
        required: true
    },
    isAction: {
        type: Boolean,
        required: true
    },
    recordColor: {
        type: String,
        required: true
    },
    isAudio: {
        type: Boolean,
        default: true
    },
    isGuestAudio: {
        type: Boolean,
        default: true
    },
    isGuest: {
        type: Boolean,
        default: false
    }
})
</script>
<template>
    <div v-if="isAudio">
        <div v-if="!isAction">
            <div v-if="isGuest">
                <div v-if="isGuestAudio">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <path
                            style="font-style:normal;font-weight:400;font-size:26.48935509px;line-height:1.25;font-family:sans-serif;letter-spacing:0;word-spacing:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                            d="M15 3.004c-1.662 0-3 1.338-3 3v8.793c0 1.662 1.338 3 3 3s3-1.338 3-3V6.004c0-1.662-1.338-3-3-3M8 10.4v5c0 3.52 2.613 6.433 6 6.92v4.578c.33.028.662.051 1 .051s.67-.023 1-.05V22.32c3.387-.487 6-3.4 6-6.92v-5h-2v5c0 2.788-2.213 5-5 5s-5-2.212-5-5v-5z"
                            :fill="recordColor" :stroke="micColor" stroke-width=".5" />
                    </svg>
                </div>
            </div>
            <div v-else>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                    <path
                        style="font-style:normal;font-weight:400;font-size:26.48935509px;line-height:1.25;font-family:sans-serif;letter-spacing:0;word-spacing:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                        d="M15 3.004c-1.662 0-3 1.338-3 3v8.793c0 1.662 1.338 3 3 3s3-1.338 3-3V6.004c0-1.662-1.338-3-3-3M8 10.4v5c0 3.52 2.613 6.433 6 6.92v4.578c.33.028.662.051 1 .051s.67-.023 1-.05V22.32c3.387-.487 6-3.4 6-6.92v-5h-2v5c0 2.788-2.213 5-5 5s-5-2.212-5-5v-5z"
                        :fill="recordColor" :stroke="micColor" stroke-width=".5" />
                </svg>
            </div>
        </div>
    </div>
</template>