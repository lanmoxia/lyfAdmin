<template>
  <div class="loginWrapper">

    <div class="loginContainer">

   <!-- 左侧海报 -->
   <div class="loginBanner">

    <h1>Vertex Admin</h1>

    <div class="bgImg">
      <img src="../../assets/bg-img.png" />
    </div>

    <p>开箱即用的中后台管理系统</p>

    </div>
    <!-- 右侧登录 -->
    <div class="loginContent">

    <h2>登录</h2>

    <div class="testAccount">

      <div class="tipBox">

        <div class="tipIcon">
          <svg-icon class="icon" icon="tipicon" />
        </div>  

        <el-descriptions column="1">
          <el-descriptions-item label="Admin 账号:">admin@gmail.com</el-descriptions-item>
          <el-descriptions-item label="Test 账号:">test@gmail.com</el-descriptions-item>
          <el-descriptions-item label="密码:">demo1234</el-descriptions-item>
        </el-descriptions>

      </div>
      
    </div>

    <div class="loginFrom">
      <el-form ref="ruleFormRef" style="max-width: 600px" :model="loginForm" :rules="loginRules">

        <el-form-item prop="username">
          <el-input size="large" style="width: 100%; border-radius: 8px;" v-model="loginForm.username" name="username"
            placeholder="账号" type="text"  @keyup.enter.native="handleLogin"/>
        </el-form-item>

        <el-form-item prop="password" label-suffix>
          <el-input  size="large" style="width: 100%; border-radius: 8px;" v-model="loginForm.password" name="password"
            placeholder="密码" :type="passwordType" @keyup.enter.native="handleLogin"/>
            <span class="showPassword">
              <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" @click="onChangePwdType" />
            </span>
        </el-form-item>

        <el-form-item class="code-box" prop="captcha_code">
          <el-input size="large" style="width: 100%; border-radius: 8px;" placeholder="图形验证码" v-model="loginForm.captcha_code"
            name="captcha_code" class="code-input" maxlength="4" @keyup.enter.native="handleLogin">
          </el-input>
          <div class="code-img" @click="getCodeImg">{{ code_net }}</div>
        </el-form-item>

        <el-from-item>
          <div class="rememberMe">
            <el-checkbox v-model="loginForm.isRememberMe">记住我</el-checkbox>
            <a href="/forgot-password">忘记密码?</a>
          </div>
        </el-from-item>

        <el-form-item>
          <el-button size="large" style="width: 100%; border-radius: 8px;" type="primary" :loading="loading"  @click.native.prevent="handleLogin" >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>

      </el-form>
      <div class="loginMethod">
        <el-button>手机登录</el-button>
        <el-button>二维码登录</el-button>
        <el-button>注册</el-button>
      </div>
      
      <el-divider>其他登陆方式</el-divider>
        
      <div class="loginOtherMethod">
        <a href=""><svg-icon class="loginOtherIcon" icon="github"></svg-icon></a>
        <a href=""><svg-icon class="loginOtherIcon" icon="wechat"></svg-icon></a>
        <a href=""><svg-icon class="loginOtherIcon" icon="google"></svg-icon></a>          
      </div>

    </div>
    </div>

    </div>
   
  </div>
</template>


<script setup>
import { reactive, ref} from 'vue'
import { ElMessage } from "element-plus"
import { validatePassword, validateCode } from './rules'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const ruleFormRef = ref()
const code_net = ref('')

// 表单数据
const loginForm = reactive({
  username: "admin@gmail.com",
  password: "demo1234",
  captcha_code: '',
  isRememberMe: false
})

//验证规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入用户名'
    },

  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    },

  ],
  captcha_code: [
    {
      required: true,
      trigger: 'blur',
      validator: validateCode()
    },

  ],
})

// 处理密码框文本显示状态
const passwordType = ref('password')

const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 登录动作处理
const loading = ref(false)
const loginFromRef = ref(null)
const store = useStore()
const router = useRouter()

/**
 * 登录
 */
 const handleLogin = () => {
  loginFromRef.value.validate(valid => {
    if (!valid) return

    if (loginForm.value.captcha_code != code_net.value) {
      ElMessage.error("验证码错误！")
      return
    }
    loading.value = true
  })
}

/**
 * 获取图形验证码
 */
 const getCodeImg = () => {}
</script>

<style lang="scss" scoped>

.loginWrapper {
  background-color: #f5f5f5;
  height: 100vh;

  .loginContainer {
    display: flex;
    overflow-y: auto;
    height: 100%;

    .loginBanner {
      flex-grow: 1; 
      background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),url(../../assets/blurred-bg.jpg);
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      @include flex-box(column);

      >h1,>p {flex: 0 0 auto; }
      >p{font-size: 16px; color:#1b1e1e;}
      >h1 {padding-top: 20px;}
      .bgImg {flex: 1; }
    }

    .loginContent {
      flex-shrink: 1; 
      flex-basis: auto;
      margin-top: 50px;
      padding: 0 60px;
     
      >h2{margin-bottom: 16px;}

      .testAccount {
        min-width: 350px;
        padding: 20px 24px;
        border: 1px solid #7af8ff;
        background-color: rgb(230, 255, 255); 
        border-radius: 10px;
        margin-bottom: 16px;
        @include flex-box-set($jc: start);
        .tipBox {
          @include flex-box-set($ai: start);
          .tipIcon{
            width: 30px;
            height: 30px;
         
            >.icon {
              width: 100%;
              height: 100%;
            }    
          }
        }
        
      }

      .loginFrom {
        .showPassword {
          position: absolute;
          right: 10px;
          top: 7px;
          font-size: 16px;
          color: #889aa4;
          cursor: pointer;
          user-select: none;
        }
        .code-box {
          position: relative;
          .code-img{
            position: absolute;
            width: 60px;
            right: 0;
            top: 6px;
            font-size: 22px;
            background: transparent;
          }
        }
        .rememberMe {
          margin-bottom: 18px;
          @include flex-box();

          >a{
            font-size: 14px;
            color: #1b1e1e;
            text-decoration: underline;
          }
        }

        .el-divider >span{
          font-size: 14px;
        }

        .loginMethod {
          @include flex-box-set($ai:center,$jc:around);
        }

        .loginOtherMethod{
          @include flex-box-set($ai:center,$jc:around);
          .loginOtherIcon {
            width: 20px;
            height: 20px;
          }
        }

      }

      /**覆盖 elementUI 样式 */

      /** 分隔符文字左右显示间隔样式 */
      ::v-deep .el-divider__text {
        background-color: #f5f5f5;
      }

      /**登录提示样式修改 */
      ::v-deep .el-descriptions__body {
        background-color: transparent;
      }

      ::v-deep .el-descriptions__body .el-descriptions__table:not(.is-bordered) .el-descriptions__cell {
        padding-bottom: 0;
        font-weight: bold;
        font-size: 13px;
      }
      ::v-deep .el-descriptions__label:not(.is-bordered-label){
        padding: 3px 7px;
        margin: 3px 7px;
        color: rgba(0, 0, 0, 0.88);
        background: rgba(0, 0, 0, 0.02);
        border-radius: 4px;
      }
      ::v-deep .el-descriptions__content:not(.is-bordered-label) {
        cursor: pointer;
        color: #25cfe6;
      }
    }
    
    @media(max-width: 990px){
      .loginContent {
        padding: 0 16px;
        flex-grow: 1;

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
        margin: 30px auto; 
        max-width: 480px; 
      }
    }
    
  }
}
</style>