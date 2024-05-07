<!-- 面包屑效果 -->
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
      <span class="no-redirect" v-if="index === breadcrumbList.length - 1">
        {{ $t(`menus.${item.name}`) }}
      </span>
      <span class="redirect" v-else @click="handleRedirect">
        {{ $t(`menus.${item.name}`) }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const breadcrumbList = ref([])
const initBreadcrumbList = () => {
  breadcrumbList.value = route.matched
}
watch(
  route,
  () => {
    initBreadcrumbList()
  },
  { deep: true, immediate: true }
)
const handleRedirect = (path) => {
  router.push(path)
}
</script>

<style lang="scss" scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
}

.redirect {
  margin-left: 5px;
  color: #666;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: $menuBg;
  }
}
</style>
