<template>
  <!-- 账号详情 -->
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary" v-print="printObj" :loading="printLoading">打印</el-button>
    </el-card>
    <el-card>
      <div id="userInfoBox" class="user-info-box">
        <!-- 标题 -->
        <h2 class="title">账号信息</h2>

        <div class="header">
          <!-- 头部渲染表格 -->
          <el-descriptions :column="2" border>
            {{ userInfo }}
            <el-descriptions-item label="用户ID">{{ userInfo.username }}</el-descriptions-item>
            <el-descriptions-item label="性别">
              男
            </el-descriptions-item>
            <el-descriptions-item label="民族">
              汉族
            </el-descriptions-item>
            <el-descriptions-item label="手机号">
              182xxxxxx77
            </el-descriptions-item>
            <el-descriptions-item label="居住地">河南省郑州市金水区xxx</el-descriptions-item>
            <el-descriptions-item label="入职时间">{{ userInfo.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="角色" :span="2" v-if="userInfo.roles && userInfo.roles.length > 0">
              <el-tag size="small">{{ userInfo.roles[0].description }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="联系地址" :span="2">河南省郑州市金水区xxx</el-descriptions-item>
          </el-descriptions>
          <!-- 头像渲染 -->
          <el-image class="avatar" :src="userInfo.avatar"></el-image>
        </div>
        <div class="body">
          <!-- 内容渲染表格 -->
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item label="经历">
              <ul>
                <li>
                  <span>2022/10 ---- 2024/03</span>
                  <span>xxx公司</span>
                  <span>前端开发工程师</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item label="专业">
              计算机
            </el-descriptions-item>

          </el-descriptions>
        </div>
        <!-- 尾部签名 -->
        <div class="foot">签字：___________日期:___________</div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "accountDetail"
}
</script>
<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from "vue";
import {api} from '@/api'

const route = useRoute()
const userInfo = ref({})


onMounted(() => {
  getUser()
})

// 获取用户信息
const getUser = async () => {
  const [err,res] = await api.userOne(route.query.id)
  userInfo.value = res.data.user
}

// 打印相关
const printLoading = ref(false)

const printObj = {
  // 打印区域
  id: 'userInfoBox',
  // 打印标题
  popTitle: 'vertex-admin',
  // 打印前
  beforeOpenCallback(vue) {
    printLoading.value = true
  },
  // 执行打印
  openCallback(vue) {
    printLoading.value = false
  }
}

watch(
  () => route.query.id,
  (newId) => {
    if (newId) {
      getUser()
    }
  },  //第一次进来也触发
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
.print-box {
  margin-bottom: 20px;
  text-align: right;
}

.user-info-box {
  width: 1024px;
  margin: 0 auto;

  .title {
    text-align: center;
    margin-bottom: 18px;
  }

  .header {
    display: flex;

    :deep(.el-descriptions)  {
      flex-grow: 1;
    }

    .avatar {
      width: 187px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }

    .remark {
      margin-right: 12px;
    }
  }

  .body {
    ul {
      list-style: none;

      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }

  .foot {
    margin-top: 42px;
    text-align: right;
  }
}
</style>
