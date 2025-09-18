import type { App } from 'vue'
import ChitChat from './ChitChat.vue'
import './style.css'

export default {
  install(ChitChat: App) {
    ChitChat.component('ChitChat', ChitChat)
  }
}
export { ChitChat }
