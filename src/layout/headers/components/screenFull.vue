<template>
  <div @click="handeleFullScreen">
    <el-icon>
      <component :is="icon ? 'Aim' : 'FullScreen'"></component>
    </el-icon>
  </div>
</template>

<script setup>
import screenfull from 'screenfull'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const handeleFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}

const icon = ref(screenfull.isFullscreen)
const changeIcon = () => {
  icon.value = screenfull.isFullscreen
}
onMounted(() => {
  screenfull.on('change', changeIcon)
})

onBeforeUnmount(() => {
  screenfull.off('change')
})
</script>

<style lang="scss" scoped></style>
