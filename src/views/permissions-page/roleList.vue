<template>
  <!-- 角色列表 -->
  <div class="home-box">
    
    <el-form :inline="true" :model="searchForm" v-show="showSearch">
      <el-form-item value="角色标识" prop="name">
        <el-input v-model="searchForm.name" placeholder="角色标识：admin" controls-position="right"></el-input>
      </el-form-item>
      <el-form-item value="角色名称">
        <el-input v-model="searchForm.description" placeholder="角色名称" clearable></el-input>
      </el-form-item>
      <el-form-item value="操作时间" style="width: 308px;">
        <el-date-picker v-model="searchForm.date" value-format="YYYY-MM-DD" type="daterange" range-separator="-"
          start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button @click="searchEvent" type="primary" v-auth="'/adminAuth/getRoleList'" style="margin-left: -16px">查询
        </el-button>

      </el-form-item>
    </el-form>
    <right-toolbar v-model:showSearch="showSearch" @queryTable="getListData" :haveImport="false"
      @onOutClick="onDownTemplate" @onAddClick="onDownTemplate"></right-toolbar>
    <el-card>
      <el-table :data="tableData" v-loading="loading" element-loading-text="加载中..." border>
        
        <el-table-column prop="name" label="角色标识" width="180"></el-table-column>
        
        <el-table-column prop="description" label="角色名称" width="180"></el-table-column>
       
        <el-table-column label="操作时间" min-width="160">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.operator, 'YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>

        <el-table-column prop="address" label="操作" min-width="160">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              配置权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>


      <pagination v-show="total > 0" :total="total" v-model:page="searchForm.page" v-model:limit="searchForm.page_size"
        @pagination="getListData" />
    </el-card>

    <distribute-permission v-model="distributePermissionVisible" :roleId="selectRoleId">
    </distribute-permission>

  </div>
</template>


<script setup>
import DistributePermission from './components/distributePermission.vue'

import { ref, onMounted } from "vue";
import { api } from "@/api";
import { ElMessage } from "element-plus";

const showSearch = ref(true);

onMounted(() => {
  getListData();
});

//数据源
const searchForm = ref({
  description: "",
  name: "",
  date: '',
  page: 1,
  page_size: 10,
});

const tableData = ref([]);
const total = ref(0);
const loading = ref(false)
/**
 * 获取角色列表
 */
const getListData = async () => {
  loading.value = true
  const [err,res ]= await api.roleList()
  const result = res.data
  tableData.value = result.roles
  total.value = Number(result.page_info.total_items);
  loading.value = false
};

/**
 * 分配权限
 */
const distributePermissionVisible = ref(false)
const selectRoleId = ref('')
const handleEdit = row => {
  selectRoleId.value = row._id
  distributePermissionVisible.value = true
}
0
const searchEvent = () => {
  searchForm.value.page = 1;
  getListData();
};
const onDownTemplate = () => {
  ElMessage.error("演示模式")
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

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }

}
</style>
