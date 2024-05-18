<template>
  <el-dialog  title="配置角色权限" :model-value="modelValue" width="30%" align-center draggable @close="onClose">
    <el-tabs v-model="activeTab" v-loading="loading">
      <el-tab-pane label="配置菜单" name="menus">
        <!-- 菜单配置的内容 -->
        <el-tree ref="treeRef"
          :data="menuData" 
          show-checkbox 
          node-key="_id" 
          :props="defaultProps"
          :default-checked-keys="currentMenus">
        </el-tree>
      </el-tab-pane>
      <el-tab-pane label="配置按钮" name="buttons">
        <!-- 按钮配置的内容 -->
        <el-checkbox-group v-model="currentButtons">
          <el-checkbox
            v-for="button in buttonsData"
            :key="button._id"
            :label="button.name"
            :value="button._id">
          </el-checkbox>
        </el-checkbox-group>
      </el-tab-pane>
    </el-tabs>
    <div class="dialog-footer">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onConfirm">确认</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import {defineEmits, ref, watch, nextTick } from 'vue'
import {buildTree} from "@/utils/buildTree"
import { api } from "@/api"
import { ElMessage } from 'element-plus'

const loading = ref(false)
const activeTab = ref('menus')
const menuData = ref([])
const buttonsData = ref([])
const currentMenus = ref([])
const currentButtons = ref([])
const treeRef = ref(null)

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

// 获取当前角色权限
const getCurrentUserRoles = async() => {
  const [err,res] = await api.roleOne(props.roleId)
  const _currentMenus = res.data.menus
  const _currentButtons = res.data.resources
  currentMenus.value = _currentMenus.map(item => item._id)
  currentButtons.value = _currentButtons.map(item => item._id)
}
// 获取所有权限
const getRolePermissions = async () => {
  menuData.value = []
  currentButtons.value = []
  getCurrentUserRoles()
  loading.value = true
  const [err,res] = await api.permissionList()
  loading.value = false
  let menus = res.data.menus
  menuData.value = buildTree(menus)
  buttonsData.value = res.data.buttons
}

// 属性结构配置
const defaultProps = {
  children: 'children',
  label: 'name'
}

watch(
  () => props.roleId,
  val => {
    if (val) getRolePermissions()
  }
)

/**
  确定按钮点击事件
 */
const onConfirm = async () => {
  // 获取选中的菜单项ID
  const checkedMenuIds = treeRef.value.getCheckedKeys()

  await api.rolePatch(props.roleId,{menus:checkedMenuIds ,resources:currentButtons.value })
  ElMessage.success("用户角色更新成功")
  onClose()
}

/**
 * 关闭
 */
const onClose = () => {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  margin-top: 15px; 
  text-align: right;
}
</style>
