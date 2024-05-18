<template>
  <div v-loading="loading">
    <!-- 权限列表组件 -->
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-input
              v-model="authName"
              placeholder="请输入权限名称搜索"
              clearable
              prefix-icon="Search"
              style="margin-bottom: 20px"
          />
        </div>
        <div class="head-container">
          <el-tree
              :data="userMenus"
              :props="{ label: 'name', children: 'children' }"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              ref="authTreeRef"
              node-key="id"
              highlight-current
              default-expand-all
              @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <!--用户数据-->
      <el-col :span="20" :xs="24">
        <el-card>
          
          <el-table
              :data="userMenus"
              style="width: 100%; margin-bottom: 20px"
              row-key="_id"
              border
              default-expand-all
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">

            <el-table-column
                prop="name"
                label="权限名称"
                width="200">
            </el-table-column>

            <el-table-column
                prop="url"
                label="权限标志"
                width="400">
              <template #default="{ row }">
                <div style="display: flex;align-items: center;justify-content: space-between;">
                  <div>{{ row.unique }}</div>
                  <el-link :underline="false" :icon="CopyDocument" v-copyText="row.unique"
                           v-copyText:callback="copyTextSuccess" type="warning">复制
                  </el-link>
                </div>


              </template>
            </el-table-column>

            <el-table-column
                prop="hidden"
                label="是否显示在菜单列表">
              <template #default="{ row }">
                <el-tag v-if="row.hidden" type="danger">显示</el-tag>
                <el-tag v-else type="success">隐藏</el-tag>
              </template>
            </el-table-column>

          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  name: "permissionList"
}
</script>
<script setup>
import {api} from "@/api";
import {ref,watch} from 'vue'
import {ElMessage} from "element-plus";
import {CopyDocument} from '@element-plus/icons'
import { buildTree} from '@/utils/index'

// 用户菜单权限
const userMenus = ref([])
const loading = ref(false)

// 获取用户权限列表
const getPermissionListData = async () => {
  loading.value = true
  const [err,res] = await api.userPermissions()
  userMenus.value = buildTree(res.data[0].menus)
  loading.value = false
}
getPermissionListData()
/** 复制代码成功 */
const copyTextSuccess = () => {
  ElMessage.success("复制成功")
}

const authName = ref("")
const authTreeRef = ref(null)
/** 根据名称筛选部门树 */
watch(authName, val => {
  authTreeRef.value.filter(val);
});

/** 通过条件过滤节点  */
const filterNode = (value, data) => {
  if (!value) return true;
  return data.name.indexOf(value) !== -1;
};

/** 节点单击事件 */
function handleNodeClick(data) {
  const currentPageButtons = userButtons.value.filter(button => button.unique === data.unique);
  // 更新表格中显示的按钮权限
  userButtons.value = currentPageButtons;
  ElMessage.success("测试输出结点名字："+ data.name)
};

</script>
<style lang="scss" scoped>
.remark {
  margin-right: 12px;
}
</style>