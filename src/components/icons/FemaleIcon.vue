<script setup lang="ts">
const props = defineProps({
  user: {
    type: Object,
    default: () => { return {} }
  },
  iconColorOnline: {
    type: String,
    default: "#37ac2e"
  },
  iconDarkOnline: {
    type: String,
    default: "#77f96e"
  },
  iconColorOffline: {
    type: String,
    default: "#e23e3e"
  },
  iconDarkOffline: {
    type: String,
    default: "#6c075d"
  },
  isDark: {
    type: Boolean,
    default: false
  }
})
let fillColor = '';
switch (props.user.isOnline) {
  case true:

    switch (props.isDark) {
      case true: fillColor = props.iconDarkOnline
        break
      default: fillColor = props.iconColorOnline
        break
    }
    break
  case false:

    switch (props.isDark) {
      case true: fillColor = props.iconDarkOffline
        break
      case false: fillColor = props.iconColorOffline
        break;
      default: fillColor = '#ccc'
        break
    }
    break
  default: fillColor = '#ccc'
    break
}

</script>
<template>
  <div>
    <svg :fill="fillColor" viewBox="-1 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m14.041 16.683c-.015-.168-.026-.439-.035-.72 2.549-.261 4.338-.872 4.338-1.585-.007 0-.006-.03-.006-.041-1.906-1.718 1.652-13.92-4.971-13.674-.555-.418-1.256-.669-2.015-.669-.061 0-.121.002-.181.005h.008c-8.971.678-5.004 12.203-7.049 14.378h-.004s0 0 0 0c.008.698 1.736 1.298 4.211 1.566-.007.17-.022.381-.054.734-1.027 2.77-7.962 1.994-8.282 7.323h22.294c-.319-5.33-7.225-4.554-8.253-7.317z" />
    </svg>
  </div>
</template>
<style scoped>
.test {
  background: #e23e3e;
}
</style>