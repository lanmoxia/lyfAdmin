<template>
    <div class="svgIcon">
      <svg-icon icon='qr_code' size="300" class="qr_code"></svg-icon>
    </div>
    <!-- 注册条款 -->
    <div class="registrationTerms">
      <span>扫码点击 '确认'，即可完成登录</span>
    </div>
    <!-- 注册页返回 -->
    <div class="goBack" @click="goBack">
      <router-link  to="/login">
      <el-icon :size="18"><ArrowLeft /></el-icon>
      返回
    </router-link>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
  /**
 * 返回
 */
 const goBack = () => {
  store.commit('user/setActiveState', 'login')
}
</script>

<style lang="scss" scoped>
  .svgIcon {
    display: flex;
    justify-content: center;
    .qr_code {
      padding: 5px;
      border-radius: 8px;
      border: 1px solid rgba(5, 5, 5, 0.06);
    }
  }
  .registrationTerms {
    display: flex;
    justify-content: center;
    >span {
      padding: 15px 0 10px 0;
      font-size: 14px;
      color:#191919;
    }
  }
  .goBack {
    font-size: 14px;
    display: flex;
    justify-content: center;
    >a {
      color:rgb(0, 184, 217);
      text-decoration: underline;
      display: flex;
      align-items: center;
      padding: 15px 0;
      &:hover {
        color: #4ee5f2;
      }
    }
  }

</style>