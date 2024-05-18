<template>
  <div class="home-box">
    <!-- 顶部搜索表单 -->
    <el-form :inline="true" :model="searchForm" v-show="showSearch">

      <el-form-item label="状态">
        <el-select v-model="searchForm.status" placeholder="请选择状态" clearable style="width: 180px">
          <el-option v-for="item in statusList" :key="item._id" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="账号">
        <el-input v-model="searchForm.username" placeholder="请输入账号" clearable></el-input>
      </el-form-item>

      <el-form-item label="角色">
        <el-select v-model="searchForm.role" placeholder="请选择角色" clearable style="width: 180px">
          <el-option v-for="item in roleList" :key="item._id" :label="item.name" :value="item._id" />
        </el-select>
      </el-form-item>

      <el-form-item label="操作时间" style="width: 308px;">
        <el-date-picker v-model="searchForm.dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-"
          start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="searchEvent" style="margin-left: -16px">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 新增、导入、导出用户模块 -->
    <right-toolbar 
      v-model:showSearch="showSearch" 
      @queryTable="getUserList" 
      @onImportClick="handleImport"
      @onOutClick="onDownUsers" 
      @handleAddUser="handleAddUser">
    </right-toolbar>

    <!-- 用户列表内容模块以及分页 -->
    <el-card>
      <el-table :data="tableData" v-loading="loading" :element-loading-text="loadText" border >  
        <el-table-column prop="username" label="账号" width="180"></el-table-column>       
        
        <el-table-column label="角色" width="180" sortable :sort-method="sortRoles">
  
          <template #default="{ row }">
            <el-tag type="danger">{{ row.roles[0] ? row.roles[0].description : '未知' }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="头像" align="center">
          <template #default="{ row }">
            <el-image class="avatar" :src="row.avatar"></el-image>
          </template>
        </el-table-column>

        <el-table-column prop="date" label="操作时间" width="280">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.updatedAt, 'YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>

        <el-table-column label="状态" width="180">
          <template #default="{ row }">
            <el-switch 
              :model-value="getSwitchStatus(row)"
              :loading="rowLoading[row._id]"
              @change="val => userStateChange(val,row)"  />
          </template>
        </el-table-column>

        <el-table-column prop="address" label="操作" min-width="280">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row)">查看</el-button>
            <el-button type="info" size="small" @click="onShowRoleClick(row)">角色</el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页组件-->
      <pagination 
        v-show="total > 0" 
        :total="total" 
        v-model:page="searchForm.page" 
        v-model:limit="searchForm.page_size"
        @pagination="handlePagination" />
    </el-card>

    <!-- 用户角色设置 Dialog-->
    <roles-dialog 
      v-model="roleDialogVisible" 
      :userId="selectUserId" 
      @updateRole="getUserList">
    </roles-dialog>

    <!-- 创建用户 Dialog-->
    <CreateUserDialog 
      v-model="createUserDialog.visible" 
      :title="createUserDialog.title"
      @userCreated="getUserList" 
      @handleAddUser="handleAddUser">
    </CreateUserDialog>

    <!-- 用户导入 Dialog -->
    <UploadExcel 
      v-model="uploadUserDialog.visible" 
      :title="uploadUserDialog.title" 
      @onSuccess="onSuccess" 
      @onDownTemplate="onDownTemplate">
    </UploadExcel>

  </div>
</template>

<script setup>
import RolesDialog from './components/roles.vue'
import UploadExcel from '@/components/UploadExcel'
import CreateUserDialog from '@/components/CreateUserDialog'
import { ref, onMounted, watch, reactive} from "vue"
import {api} from '@/api'
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from 'element-plus'
import { utils, writeFile } from 'xlsx'

const router = useRouter()

// 内容去 loading
const loading = ref(false)
const loadText = ref('加载中')
// 角色列表
const roleList = ref([])
// 状态列表
// 状态列表
const statusList = ref([
  { label: '启用', value: 1 },
  { label: '未启用', value: 0 }
])
// 用户账户 status 
const rowLoading = reactive({})
const switchStatus  = reactive({})
// 总数居
const total = ref(0)
const showSearch = ref(true)
// 用户 table 列表
const tableData = ref([])

// 搜索表单
const searchForm = ref({
  username: "",
  role: "", 
  status: null,
  dateRange: [],
  page: 1,
  page_size: 10
})

onMounted(() => {
  getUserList(searchForm.value.page, searchForm.value.page_size)
  getRoleList()
})


// 定义角色名称的排序优先级
const rolePriority = {
  '超级管理员': 1,
  '管理员': 2,
  '用户': 3
};

// 自定义排序函数
function sortRoles(a, b) {
  const roleA = a.roles[0] ? rolePriority[a.roles[0].description] || 999 : 999;
  const roleB = b.roles[0] ? rolePriority[b.roles[0].description] || 999 : 999;
  return roleA - roleB;
}

// switch 状态
const getSwitchStatus = row => row.status === 1

// 切换用户账户状态
const userStateChange = async (val,row) => {
  const newStatus = val ? 1 : 0
  if (row.status === newStatus) return
  rowLoading[row._id] = true
  await api.userUpdate(row._id, {status: newStatus})
  row.status = newStatus
  switchStatus[row._id] = newStatus === 1 // 更新 switchStatus
  ElMessage.success("用户状态更新成功")
  rowLoading[row._id] = false
}

// 账号列表
const getUserList = async () => {
  loading.value = true
  const [err,res] = await api.userList(searchForm.value.page,searchForm.value.page_size)
  if (!err && res && res.data && res.data.users) {
    const sortedUsers = res.data.users.sort(sortRoles) // 依据角色色排序
    tableData.value = sortedUsers
    total.value = Number(res.data.page_info.total_items)
  }
  loading.value = false 
}

// 角色列表
const getRoleList = async () => {
  const [err,res] = await api.roleList()
  const result = res.data
  roleList.value = result.roles
}

// 查看用户
const onShowClick = row => {
  router.push({
    path: '/account/detail',
    query: {id: row._id}
  })
}

// 删除用户
const onRemoveClick = row => {
   console.log(row.username)
  ElMessageBox.confirm(
    "确定要删除" +  row.username  + "吗",
    { type: 'warning' }
  ).then(async () => {
    await api.userDelete(row._id)
    ElMessage.success("删除成功")
    // 重新渲染数据
    await getUserList()
  })
}

// 设置角色
const selectUserId = ref('')
const roleDialogVisible = ref(false)
const onShowRoleClick = row => {
  selectUserId.value = row._id
  roleDialogVisible.value = true
}

// 保证每次打开重新获取用户角色数据
watch(roleDialogVisible, val => {
  if (!val) selectUserId.value = ''
})


//获取搜索结果
const getSearchResult = async () => {
  loading.value = true;
  // 构造搜索参数，只包括非空条件
  let params = {
    page: searchForm.value.page,
    limit: searchForm.value.page_size,
    // 如果 username 是空字符串，则不添加到 params 中
    ...(searchForm.value.username ? { username: searchForm.value.username } : {}),
    // 如果 role 是空字符串或 null，则不添加到 params 中
    ...(searchForm.value.role ? { role: searchForm.value.role } : {}),
    // 如果 status 是 null，则不添加到 params 中
    ...(searchForm.value.status !== null ? { status: searchForm.value.status } : {}),
    startDate: searchForm.value.dateRange && searchForm.value.dateRange.length >= 2 ? searchForm.value.dateRange[0] : undefined,
    endDate: searchForm.value.dateRange && searchForm.value.dateRange.length >= 2 ? searchForm.value.dateRange[1] : undefined
  }
  // 移除未定义的搜索参数
  Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
  
  const [err, res] = await api.usersSearch(params);
  if (!err && res && res.data && res.data.users) {
    tableData.value = res.data.users;
    total.value = Number(res.data.total_items);
  } else {
    // 如果没有搜索结果，则清空表格数据并设置总条数为0
    tableData.value = [];
    total.value = 0;
  }
  loading.value = false;
}

// 搜索事件
const searchEvent = async () => {
  searchForm.value.page = 1
  getSearchResult()
}

// 分页
const handlePagination = ({ page, limit }) => {
  // 更新搜索表单中的分页参数
  searchForm.value.page = page
  searchForm.value.page_size = limit
  // 判断是否存在搜索条件
  if (searchForm.value.username || searchForm.value.role || searchForm.value.status !== null || searchForm.value.dateRange.length) {
    getSearchResult() // 存在搜索条件时获取搜索结果
  } else {
    getUserList(page, limit); // 无搜索条件时获取所有用户列表
  }
}

/*** 用户导入参数 */
const uploadUserDialog = ref({
  visible: false,
  title: "账号导入"
})

/** 导入按钮操作 */
function handleImport() {
  uploadUserDialog.value.visible = true
}


/** 文件上传成功处理 */
// const onSuccess = async (response, file, fileList) => {
  const onSuccess = async (file) => {
    loading.value = true
    loadText.value = "创建中"
    const formData = new FormData()
    formData.append('file', file.raw);
    const [err,res] = await api.batchCreateUser(formData)
    const result = res.data
    loading.value = false
    loadText.value = "加载中"
    ElMessage.success({
      message: `创建成功: ${result.successCount}个, 失败: ${result.failureCount}个`,
      duration: 10000
    })
    uploadUserDialog.value.visible = false
    getUserList()
}

/*** 创建用户参数 */
const createUserDialog = ref({
  visible: false,
  title: "创建用户"
})

const handleAddUser = () => {
  createUserDialog.value.visible = true
}

// 下载模板
const onDownTemplate = async () => {
  try {
    const response = await api.userTemplate();
    console.log(response)
    const blobData = Array.isArray(response) ? response[1] : response;
    if (blobData) {
       // 创建一个Blob对象
      const blob = new Blob([blobData], { type: 'application/vnd.ms-excel' })
      // 创建一个链接元素
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'user_template.xls'; // 设置下载文件名
      document.body.appendChild(link); // 添加到页面中
      link.click(); // 触发下载
      document.body.removeChild(link); // 下载后移除元素
    }else {
      ElMessage.error('无法获取文件数据')
    }
   
    // 关闭对话框
    uploadUserDialog.value.visible = false;
  } catch (error) {
    ElMessage.error('下载模板时出现错误:' + error.toString())
  }
}

// 导出用户列表
const onDownUsers = () => {
  // 过滤和格式化数据
  const dataToExport = tableData.value.map(item => ({
    '用户名': item.username,
    '角色': item.roles[0].description,
    '创建时间': item.createdAt,
    '状态': item.status === 0 ? '禁用' : '正常'
  }))

  // 使用SheetJS库生成工作表
  const ws = utils.json_to_sheet(dataToExport);

  // 创建工作簿并添加工作表
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, '用户列表');

  // 导出xlsx文件
  writeFile(wb, '用户列表.xlsx');
}
</script>

<style lang="scss" scoped>
.home-box {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }

  :deep(.el-tag)  {
    margin-right: 6px;
  }

  :deep(.avatar)  {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

}
</style>