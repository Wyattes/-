<template>
  <div class="hamberger-container" @click="toggleClick">
    <el-icon>
      <component :is="icon"></component>
    </el-icon>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const toggleClick = () => {
  store.commit('app/changeSiderType')
}
const icon = computed(() => {
  return store.getters.siderType ? 'fold' : 'Expand'
})
</script>

<style lang="scss" scoped>
.hamburger-container {
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
