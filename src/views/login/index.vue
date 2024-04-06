<template>
  <div class="loginWrapper">
    <div class="container">
      <!-- 左侧海报 -->
    <div class="loginBanner">

    <h1>Vertex Admin</h1>

    <div class="bgImg">
      <img src="../../assets/bg-img.png" />
    </div>

    <p>qut-of-the-box mid-and back-end management system</p>

    </div>
    <!-- 右侧登录模板 -->
    <div class="loginContent">
    <!-- 登录注册 title -->
    <h2>{{registerOrLoginTitle}}</h2>

    <div v-if="store.getters.activeState === 'login'">
      <LoginPage />
      <!-- 手机、二维码、注册 -->
      <div class="loginMethodWrapper">
        <div class="loginMethod">
          <el-button size="large" plain @click="showMobilePage">手机登录</el-button>
          <el-button size="large" plain @click="showQrCodePage">二维码登录</el-button>
          <el-button size="large" plain @click="showRegisterPage">注册</el-button>
        </div>
        
        <!-- 其他登录方式 -->
        <el-divider>其他登陆方式</el-divider>
          
        <div class="loginOtherMethod">
          <a href="#"><svg-icon class="loginOtherIcon" icon="github"></svg-icon></a>
          <a href="#"><svg-icon class="loginOtherIcon" icon="wechat"></svg-icon></a>
          <a href="#"><svg-icon class="loginOtherIcon" icon="google"></svg-icon></a>          
        </div>
      </div>
    </div>
    <RegisterPage v-if="store.getters.activeState === 'register'"/>
    <MobileLoginPage v-if="store.getters.activeState === 'mobile'"/>
    <QrCodeLoginPage v-if="store.getters.activeState === 'qrCode'"/>
    </div>  
  </div>
</div>
</template>


<script setup>
import {ref,computed} from 'vue'
import { useStore } from 'vuex'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MobileLoginPage from './components/MobileLoginPage';
import QrCodeLoginPage from './components/QrCodeLoginPage';
const store = useStore()

const title = ref('登录')

// 动态页面
const showRegisterPage= () => {
  setActivePage('register'); 
}
const showMobilePage= () => {
  setActivePage('mobile'); 
}
const showQrCodePage= () => {
  setActivePage('qrCode');
}

const setActivePage = (page) => {
  store.commit('user/setActiveState', page);
}

// 动态标题
const titleMap = {
  'register': '注册',
  'mobile': '手机登录',
  'qrCode': '二维码登录'
};

const registerOrLoginTitle = computed(() => {
  return title.value = titleMap[store.getters.activeState] || '登录';
});


</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/element.scss';
.loginWrapper {
  background-color: #f5f5f5;
  .container {
    display: flex;
    justify-content: center;
    .loginBanner {
      flex-grow: 1; 
      background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),url(../../assets/blurred-bg.jpg);
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      @include flex-box($direction: column);

      >h1,>p {flex: 0 0 auto;color: #1e1e1f;}
      >p{font-size: 14px; color:#1b1e1e; padding-bottom: 20px;}
      >h1 {font-size: 50px; }
    }

    .loginContent {
      width: 480px;
      padding: 40px 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      >h2{margin-bottom: 16px;}
      .loginMethodWrapper {
        .el-divider >span{
          font-size: 14px;   
        }
        .loginMethod {
          @include flex-box-set($ai:center,$jc:between);
          :deep(.el-button--large){
            flex-grow: 1;
            border-radius: 8px;
          }
          :deep(.el-button):hover {
            color: #00a76f;
            border-color: #00a76f;
          }
        }

        .loginOtherMethod{
          @include flex-box-set($ai:center,$jc:around);
          .loginOtherIcon {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    
    @media(max-width: 990px){
      .loginContent {
        padding: 60px 20px;

        .testAccount {
          max-width: 450px; 
          min-width: 300px;
        }   
      }
    }

    @media (max-width: 768px) {
      .loginBanner {
        display: none; 
      }

      .loginContent {
        max-width: 480px; 
      }
    }
  }
}
</style>