<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="50%"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" label-width="70px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        v-if="dialogTitle === '添加用户'"
      >
        <el-input type="password" v-model="form.password" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm(formRef)">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineEmits, ref, defineProps, watch } from 'vue'
import { addUser, editUser } from '@/api/users'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()

const props = defineProps({
  dialogTitle: {
    type: String,
    default: '',
    requeired: true
  },
  dialogTableValue: {
    type: Object,
    default: () => {}
  }
})

const emits = defineEmits(['update:modelValue', 'initUserList'])
const handleClose = () => {
  // 直接控制父组件的v-model="dialogVisible"的dialogVisible变为false
  emits('update:modelValue', false)
}

const handleConfirm = async (formRef: FormInstance | undefined) => {
  // 统一校验
  if (!formRef) return
  await formRef.validate(async (valid: any, fields: any) => {
    if (valid) {
      // 成功
      props.dialogTitle === '添加用户'
        ? await addUser(form.value)
        : await editUser(form.value)
      emits('initUserList')
      handleClose()
      ElMessage({
        message: i18n.global.t('message.updeteSuccess'),
        type: 'success'
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const form = ref({
  username: '',
  password: '',
  email: '',
  mobile: ''
})

const rules = ref({
  username: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' }
  ],
  // email有额外的校验
  email: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change']
    }
  ],
  mobile: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' }
  ]
})

// watch要放在下面 因为form要先定义
watch(
  () => props.dialogTableValue,
  () => {
    form.value = props.dialogTableValue
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped></style>
