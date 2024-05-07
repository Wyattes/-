<template>
  <el-card>
    <!-- 搜索框 -->
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          :placeholder="$t('table.placeholder')"
          clearable
          v-model="queryFrom.query"
        />
      </el-col>
      <el-button type="primary" :icon="Search" @click="initGetUsersList">
        {{ $t('table.search') }}
      </el-button>
      <el-button type="primary" @click="handleDialog()">{{
        $t('table.adduser')
      }}</el-button>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        :width="item.width"
        :prop="item.prop"
        :label="$t(`table.${item.label}`)"
        v-for="(item, index) in options"
        :key="index"
      >
        <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
          <el-switch
            v-model="row.mg_state"
            @change="changeState(row)"
            @click="open"
          />
        </template>
        <template #default="{ row }" v-else-if="item.prop === 'action'">
          <el-button
            type="primary"
            size="small"
            :icon="Edit"
            @click="handleDialog(row)"
          ></el-button>
          <el-button type="warning" size="small" :icon="Setting"></el-button>
          <el-button
            type="danger"
            size="small"
            :icon="Delete"
            @click="delUser(row)"
          ></el-button>
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
          {{ $filters.filterTimes(row.create_time) }}
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="queryFrom.pagenum"
        v-model:page-size="queryFrom.pagesize"
        :page-sizes="[2, 5, 10, 15]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
  <!-- 用v-if可以重新渲染dom，达到消除原始数据的功能 -->
  <Dialog
    v-model="dialogVisible"
    :dialogTitle="dialogTitle"
    @initUserList="initGetUsersList"
    v-if="dialogVisible"
    :dialogTableValue="dialogTableValue"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { getUser, changeUserState, deleteUser } from '@/api/users'
import { options } from './options'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import Dialog from './componets/dialog.vue'
import { isNull } from '@/utils/filters'

const I18n = useI18n()
const queryFrom = ref({
  query: '',
  pagenum: 1,
  pagesize: 2
})
const total = ref(0)
const tableData = ref([])
const dialogTitle = ref('')
// 编辑用户的值
const dialogTableValue = ref({})
const initGetUsersList = async () => {
  const res = await getUser(queryFrom.value)
  total.value = res.total
  // console.log(res)
  tableData.value = res.users
}
initGetUsersList()

// 改变本页的条目个数
const handleSizeChange = (pagesize) => {
  queryFrom.value.pagenum = 1
  queryFrom.value.pageSize = pagesize
  initGetUsersList()
}

// 改变当前页码
const handleCurrentChange = (currentpage) => {
  queryFrom.value.pagenum = currentpage
  initGetUsersList()
}

// 改变状态
const changeState = async (info) => {
  await changeUserState(info.id, info.mg_state)
}
const open = () => {
  ElMessage({
    message: I18n.t('message.updeteSuccess'),
    type: 'success'
  })
}

// 对话框弹出
const dialogVisible = ref(false)
const handleDialog = (row) => {
  if (isNull(row)) {
    dialogTitle.value = '添加用户'
    dialogVisible.value = true
    dialogTableValue.value = {}
  } else {
    dialogTitle.value = '编辑用户'
    dialogVisible.value = true
    dialogTableValue.value = JSON.parse(JSON.stringify(row))
  }
}

// 删除用户
const delUser = (row) => {
  ElMessageBox.confirm(I18n.t('dialog.deleteTitle'), 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(async () => {
      await deleteUser(row.id)
      initGetUsersList()
      ElMessage({
        type: 'success',
        message: 'Delete completed'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
}

::v-deep .el-input__suffix {
  align-items: center;
}
</style>
