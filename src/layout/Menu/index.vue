<template>
  <!-- router是否启用 vue-router 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使用 default-active 来设置加载时的激活项。 -->
  <el-menu
    active-text-color="#ffd04b"
    background-color="$menuBg"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    :collapse="!$store.getters.siderType"
    router
    unique-opened
  >
    <el-sub-menu
      :index="item.id"
      v-for="(item, index) in menusList"
      :key="item.id"
    >
      <template #title>
        <el-icon>
          <component :is="iconList[index]"></component>
        </el-icon>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        :index="'/' + it.path"
        v-for="it in item.children"
        :key="it.id"
        @click="savePath(it.path)"
      >
        <el-icon>
          <component :is="icon"></component>
        </el-icon>
        <span>{{ $t(`menus.${it.path}`) }}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { menuList } from '@/api/menu'
import { ref } from 'vue'
// import variables from '@/styles/variables.module.scss'

const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')
// 不要将defaultActive写死，点击其他时，刷新后仍是那个
const savePath = (path) => {
  sessionStorage.setItem('path', `/${path}`)
}
// 重定向需要直接去/users,所以menu默认选中menu
const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const menusList = ref([])
const initMenuList = async () => {
  menusList.value = await menuList()
  console.log(menusList.value[0].id)
}
initMenuList()
</script>

<style lang="scss" scoped></style>
