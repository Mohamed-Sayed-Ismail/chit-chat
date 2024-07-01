    <script setup lang="ts">
    import { ref } from 'vue'
    import PlayButton from '../../../components/icons/PlayButton.vue'
    import SliderAudio from './SliderAudio.vue'
    import PauseButton from '../../../components/icons/PauseButton.vue'
    import StopPlaying from '../../../components/icons/StopPlaying.vue'
    import getBlobDuration from 'get-blob-duration'
    import SoundSlider from './SoundSlider.vue'
    import SoundHigh from '../../../components/icons/SoundHigh.vue'
    import SoundLow from '../../../components/icons/SoundLow.vue'


    const props = defineProps({
        audioSource: {
            type: Blob,
            required: true
        },
        audioControllerBackground: {
            type: String,
            required: true
        },
        receivedAudioControllerBackground: {
            type: String,
            required: true
        },
        isReceived: {
            type: Boolean,
            required: true
        },
        isDark: {
            type: Boolean,
            required: false
        }
    })
    const isPlaying = ref(false)
    const progress = ref(0)
    const isPause = ref(false)
    const currentTime = ref(0)
    const volume = ref(0)
    const duration = ref(0)
    const blob = props.audioSource
    const audio = document.createElement("audio");
    const audios: HTMLAudioElement[] = []
    audios.push(audio)
    audio.src = URL.createObjectURL(blob);
    // getBlobDuration(blob).then(function (dur) {
    //     duration.value = Math.floor(dur)
    //     volume.value = audio.volume
    // });
    (async function () {
        const dur = await getBlobDuration(blob)
        duration.value = Math.floor(dur)
        volume.value = audio.volume
    })

    volume.value = audio.volume
    audio.addEventListener('timeupdate', () => {
        currentTime.value = Math.floor(audio.currentTime)
        if (audio.currentTime < audio.duration && !isPlaying.value) {
            isPause.value = true
            audio.pause()

        }
        progress.value = (audio.currentTime * 100 / audio.duration)
        if (audio.currentTime >= audio.duration) {
            isPlaying.value = false
            progress.value = 0
        }
    })
    const decreaseVolume = () => {
        if (volume.value <= 0.1) { return }
        volume.value = volume.value - 0.1
        audio.volume = volume.value

    }
    const increaseVolume = () => {
        if (volume.value >= 1.0) { return }
        volume.value = volume.value + 0.1
        audio.volume = volume.value
    }
    const onValueChange = (value: any) => {
        currentTime.value = value

    }
    const onVolumeChange = (value: any) => {
        volume.value = Number(value)
        audio.volume = volume.value

    }
    const audioAffect = () => {
        console.log(audios.length)
        audios.forEach((audio) => {
            audio.pause()
        })
        isPlaying.value = !isPlaying.value
        if (isPlaying.value) {
            if (currentTime.value == duration.value - 1) {
                onStop()
            }
            if (isPause.value) {
                audio.currentTime = currentTime.value
                audio.play()
            } else {
                audio.play()
            }

        }
    }
    const onStop = () => {
        audio.pause()
        currentTime.value = 0
        audio.currentTime = 0
        isPlaying.value = false
        progress.value = 0
        progress.value = 0

    }

    const timeCalc = (number: any) => {
        return (number - (number %= 60)) / 60 + (9 < number ? ':' : ':0') + number
    }
    const background = props.isReceived ? props.receivedAudioControllerBackground : props.audioControllerBackground
</script>

    <template>
        <div class="grid grid-cols-1" :style="`background-color:${background}`">
            <div class=" col-start-1 col-end-6 ">
                <div class="">

                    <div class="flex flex-row justify-center items-center gap-3 p-1">
                        <PlayButton :isDark="isDark" v-show="!isPlaying" @click="audioAffect"
                            class="w-5 h-5 cursor-pointer  " />
                        <PauseButton :isDark="isDark" v-show="isPlaying" @click="audioAffect"
                            class="w-5 h-5 cursor-pointer  " />
                        <div
                            class="border-b flex items-center w-fit justify-center border-[#dd4141] dark:border-[#84e9f6] p-1">
                            <SliderAudio :current="progress" :onValueChange="onValueChange" class=" w-full" />
                        </div>
                        <StopPlaying :isDark="isDark" class="w-4 h-4 cursor-pointer  col-end-3 z-10" @click="onStop" />
                    </div>

                </div>

                <div class="flex grid-cols-11 justify-center items-center gap-1">
                    <SoundLow :isDark="isDark"
                        class="h-7 w-7 col-start-2 col-end-3 cursor-pointer align-bottom flex justify-center content-center  items-center"
                        @click="decreaseVolume" />
                    <SoundSlider class="p-1 col-start-4 col-end-10 " :volume="volume"
                        :onVolumeChange="onVolumeChange" />
                    <SoundHigh :isDark="isDark" class="absolute h-7 w-7 cursor-pointer col-start-10 right-1"
                        @click="increaseVolume" />
                </div>
                <div
                    class="align-bottom flex justify-center content-center text-[#fb5d5d] dark:text-[#97e0ea]  items-center pt-1">
                    <p class="text-sm select-none	">{{ timeCalc(currentTime) }} / {{ timeCalc(duration) }}</p>
                </div>
            </div>


        </div>
    </template>
