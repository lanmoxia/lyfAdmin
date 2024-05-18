<template>
  <!-- 账号列表 设置角色 -->
  <el-dialog
    title="设置角色"
    :model-value="modelValue"
    width="30%"
    align-center
    draggable
    @close="closed">
    <el-checkbox-group v-model="currentCheckedRoles" v-loading="loading">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item._id"
        :label="item.description"
        :value="item._id">
      </el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">取消</el-button>
        <el-button type="primary" @click="onConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {defineEmits, ref, watch} from 'vue'
import {api} from "@/api"
import { ElMessage } from 'element-plus'

const loading = ref(false)

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'updateRole'])

// 当前用户角色
const currentCheckedRoles = ref([])

// 获取当前用户角色
const getCurrentUserRoles = async() => {
  const [err,res] = await api.userOne(props.userId)
  const userRoles = res.data.user.roles
  currentCheckedRoles.value = userRoles.map(item => item._id)
}

// 所有角色
const allRoleList = ref([])

// 获取所有角色数据的方法
const getRoleList = async () => {
  currentCheckedRoles.value = []
  getCurrentUserRoles()
  loading.value = true
  const [err,res] = await api.roleList()
  loading.value = false
  const result = res.data
  allRoleList.value = result.roles
  console.log(allRoleList.value )
}

watch(
  () => props.userId,
  val => {
    if (val) {
      getRoleList()
    }
  }
)

/**
  确定按钮点击事件
 */
const onConfirm = async () => {
  await api.userPatch(props.userId, {roles: currentCheckedRoles.value})
  ElMessage.success("角色更新成功")
  closed()
  // 角色更新成功,去请求父组件列表数据
  emits('updateRole')
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped></style>
