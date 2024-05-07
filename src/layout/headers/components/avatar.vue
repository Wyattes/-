<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="50" :src="circleUrl" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const circleUrl = ref(
  'https://img0.baidu.com/it/u=248877692,869504012&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1682614800&t=4ee8a93c93b0a92df46a01126271f6d4'
)

const logout = () => {
  store.dispatch('app/logout')
}
</script>

<style lang="scss" scoped></style>
