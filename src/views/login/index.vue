<template>
  <div class="loginWrapper">

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
      <h2>{{ loginOrRegister ? '登录' : '注册' }}</h2>
      <!-- 账号密码提示 -->
      <div v-if="loginOrRegister" class="testAccount">

        <div class="tipBox">

          <div class="tipIcon">
            <svg-icon class="icon" icon="tipicon" />
          </div>  

          <el-descriptions :column="1">
            <el-descriptions-item label="Admin 账号:">admin@gmail.com</el-descriptions-item>
            <el-descriptions-item label="Test 账号:">test@gmail.com</el-descriptions-item>
            <el-descriptions-item label="密码:">demo1234</el-descriptions-item>
          </el-descriptions>

        </div>
        
      </div>
      <!-- 登录表单 -->
      <div v-if="loginOrRegister" class="loginFrom">
        
        <el-form ref="loginFromRef" style="max-width: 600px" :model="loginForm " :rules="loginRules">
          <!-- 输入账号 -->
          <el-form-item prop="username">
            <el-input trim size="large" style="width: 100%; border-radius: 8px;" v-model="loginForm.username" name="username"
              placeholder="账号" type="text"  @keyup.enter.native="handleLogin"/>
          </el-form-item>
          <!-- 输入密码 -->
          <el-form-item prop="password" label-suffix>
            <el-input trim size="large" style="width: 100%; border-radius: 8px;" v-model="loginForm.password" name="password"
              placeholder="密码" :type="passwordType" @keyup.enter.native="handleLogin"/>
              <span class="showPassword">
                <svg-icon class="svgIcon" :icon="passwordType === 'password' ? 'eye' : 'eye-open'" @click="onChangePwdType" />
              </span>
          </el-form-item>
          <!-- 输入验证码 -->
          <el-form-item trim prop="captcha_code">
            <div class="code-box">
              <el-input size="large" style="width: 100%; border-radius: 8px;" placeholder="验证码" v-model="loginForm.captcha_code"
                name="captcha_code" class="code-input" maxlength="6" @keyup.enter.native="handleLogin">
              </el-input>
              <div class="code-img" @click="getCodeImg" v-html="coloredCode"></div>
            </div>
            
          </el-form-item>
          <!-- 记住密码 -->
          <div class="rememberMe">
            <el-form-item>
            <el-checkbox v-model="loginForm.isRememberMe">记住我</el-checkbox>
            </el-form-item>
            <el-form-item>
              <a href="">忘记密码?</a>
            </el-form-item>
          </div>
          <!-- 注册登录按钮 -->
          <el-form-item>
            <el-button :loading="store.getters.isLoading" size="large" style="width: 100%; border-radius: 8px;" type="primary"  @click.native.prevent="handleLogin" >
              登录
            </el-button>
          </el-form-item>

        </el-form>
        <!-- 手机、二维码、注册 -->
        <div class="loginMethodWrapper">
          <div class="loginMethod">
            <el-button size="large" plain>手机登录</el-button>
            <el-button size="large" plain>二维码登录</el-button>
            <el-button size="large" plain @click="goRegisterPage">注册</el-button>
          </div>
          
          <!-- 其他登录方式 -->
          <el-divider>其他登陆方式</el-divider>
            
          <div class="loginOtherMethod">
            <a href=""><svg-icon class="loginOtherIcon" icon="github"></svg-icon></a>
            <a href=""><svg-icon class="loginOtherIcon" icon="wechat"></svg-icon></a>
            <a href=""><svg-icon class="loginOtherIcon" icon="google"></svg-icon></a>          
          </div>
        </div>
      </div>

      <!-- 注册表单 -->
      <div v-else class="registerFrom">
        
        <el-form ref="registerFromRef" style="max-width: 600px" :model="registerForm " :rules="registerRules">
          <!-- 输入账号 -->
          <el-form-item prop="username">
            <el-input trim size="large" style="width: 100%; border-radius: 8px;" v-model="registerForm.username" name="username"
              placeholder="账号" type="text"  @keyup.enter.native="handleRegister"/>
          </el-form-item>
          <!-- 输入密码 -->
          <el-form-item prop="password" label-suffix>
            <el-input trim size="large" style="width: 100%; border-radius: 8px;" v-model="registerForm.password" name="password"
              placeholder="密码" :type="passwordType" @keyup.enter.native="handleRegister"/>
              <span class="showPassword">
                <svg-icon class="svgIcon" :icon="passwordType === 'password' ? 'eye' : 'eye-open'" @click="onChangePwdType" />
              </span>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item prop="confirmPassword" label-suffix>
            <el-input trim size="large" style="width: 100%; border-radius: 8px;" v-model="registerForm.confirmPassword" name="confirmPassword"
              placeholder="确认密码" :type="passwordType" @keyup.enter.native="handleRegister"/>
              <span class="showPassword">
                <svg-icon class="svgIcon" :icon="passwordType === 'password' ? 'eye' : 'eye-open'" @click="onChangePwdType" />
              </span>
          </el-form-item>
          <!-- 输入验证码 -->
          <el-form-item trim prop="captcha_code">
            <div class="code-box">
              <el-input size="large" style="width: 100%; border-radius: 8px;" placeholder="验证码" v-model="registerForm.captcha_code"
                name="captcha_code" class="code-input" maxlength="6" @keyup.enter.native="handleRegister">
              </el-input>
              <div class="code-img" @click="getCodeImg" v-html="coloredCode"></div>
            </div>
            
          </el-form-item>

          <!-- 注册按钮 -->
          <el-form-item>
            <el-button :loading="store.getters.isLoading" size="large" style="width: 100%; border-radius: 8px;" type="primary"  @click.native.prevent="handleRegister" >
              注册
            </el-button>
          </el-form-item>

        </el-form>

        <!-- 注册条款 -->
        <div class="registrationTerms">
          <span>注册即我同意</span>
          <router-link to="/">服务条款</router-link>
          <span>&</span>
          <router-link to="/">隐私政策</router-link>
        </div>
        <!-- 注册页返回 -->
        <div class="goBack" @click="goBack">
          <router-link  to="/login">
          <el-icon :size="18"><ArrowLeft /></el-icon>
          返回
        </router-link>
        </div>
      </div>
    </div>
   
  </div>
</template>


<script setup>
import { reactive, ref, onMounted, computed} from 'vue'
import { validatePassword, validateCode} from './loginRules'
import { regValidatePassword, regValidateConfirmPassword,regValidateCode} from './registerRules'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {getCode,userRegister,getKey} from '@/api'
import {ElMessage } from 'element-plus'
import md5 from 'js-md5';
// import { encryptPassword } from '@/utils/encryption';
// import { pemToCryptoKey,arrayBufferToBase64 } from '@/utils/crypto';

const code_net = ref('')
// const publicKey = ref(null)
const loginOrRegister = ref(true)

onMounted(() => {
  getCodeImg()
  // getPublicKey()
})

/**
 * 去注册页
 */
const goRegisterPage = () => {
  getCodeImg()
  loginOrRegister.value = false
}

/**
 * 返回
 */
const goBack = () => {
  getCodeImg()
  loginOrRegister.value = true
}

// 登录表单数据
const loginForm = reactive({
  username: "admin@gmail.com",
  password: "demo1234",
  captcha_code: ''
})

// 注册表单数据
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  captcha_code: ''
})
//登录验证规则
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
//注册验证规则
const registerRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: "请填写账号"
    },

  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: regValidatePassword()
    },

  ],
  confirmPassword: [
    {
      required: true,
      trigger: 'blur',
      validator: regValidateConfirmPassword(registerForm)
    },
  ],
  captcha_code: [
    {
      required: true,
      trigger: 'blur',
      validator: regValidateCode()
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
const loginFromRef = ref()
const registerFromRef = ref()
const store = useStore()
const router = useRouter()

// 生成带有随机颜色的验证码字符
const coloredCode = computed(() => {
  const colors = ['#9ec7fd', '#ea766d', '#a4da94', '#ff938b', '#1d2940']
  return code_net.value.split('').map(char => `<span style="color: ${randomColor()}">${char}</span>`).join('');
});

const randomColor = () => {
  const colors = ['#9ec7fd', '#ea766d', '#a4da94', '#ff938b', '#1d2940']
  return colors[Math.floor(Math.random() * colors.length)]
}

/**
 * 登录
 */
 const handleLogin = async () => {
  loginFromRef.value.validate (valid => {
    if (!valid) return store.commit('user/setLoadingState', false)
    if (loginForm.captcha_code.toLowerCase() != code_net.value.toLowerCase()) {
      getCodeImg()
      ElMessage.error("验证码错误！")
      store.commit('user/setLoadingState', false)
      return;
    }
    store.commit('user/setLoadingState', true)
    const params = {
      ...loginForm,
      password: md5(loginForm.password)
    }
    store.commit('user/setLoadingState', true)
    store.dispatch('user/login', params)
      .then(() => { 
        router.push('/')
        setTimeout(() => {
          store.commit('user/setLoadingState', false)  
        },1000)        
      })
      .catch(async err => {
        getCodeImg()
        store.commit('user/setLoadingState', false)
      })
  })
}

/**
 * 注册
 */
 const handleRegister = () => {
  registerFromRef.value.validate (valid => {
    if (!valid) return store.commit('user/setLoadingState', false)
    if (registerForm.captcha_code.toLowerCase() != code_net.value.toLowerCase()) {
      getCodeImg()
      ElMessage.error("验证码错误！")
      store.commit('user/setLoadingState', false)
      return;
    }
    store.commit('user/setLoadingState', true)
    const params = {
      ...registerForm,
      password: md5(registerForm.password)
    }
    store.commit('user/setLoadingState', true)
    userRegister(params)
      .then(() => { 
        loginOrRegister.value = true
        store.commit('user/setLoadingState', false)       
      })
      .catch(async err => {
        console.log(err)
        getCodeImg()
        store.commit('user/setLoadingState', false)
      })
  })
}

/**
 * 获取图形验证码
 */
 const getCodeImg = async () => {
  try{
    const data = await getCode()
    code_net.value = data.code
  }catch(error){
    throw error
  }
 }

 /**
  * 获取公钥
  */
//  const getPublicKey = async () => {
//     const res = await getKey()
//     publicKey.value = await pemToCryptoKey(res.publicKey);
//  }
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/element.scss';
.loginWrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
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
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    >h2{margin-bottom: 16px;}

    .testAccount {
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

    .loginFrom,  .registerFrom{
      .showPassword {
        position: absolute;
        right: 10px;
        top: 0;
        bottom: 0;
        color: #889aa4;
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        .svgIcon {
          width: 14px !important;
          height: 14px !important;
        }
      }
      .code-box {
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;
        .code-img{
          position: absolute;
          right: 10px;
          top: 0;
          line-height: 38px;
          font-size: 20px;
          font-weight: bold;
          background: transparent;
          cursor: pointer;
          transform: rotate(-3deg);
        }
      }
      .rememberMe {
        @include flex-box-set($jc: between, $ai: center);
        font-size: 14px;
        color: #1b1e1e;

        a{
          text-decoration: underline;
        }
      }
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
    .registerFrom {
      .registrationTerms {
        >span {
          font-size: 12px;
          color:rgb(99, 115, 129);
        }
        >a {
          font-size: 14px; 
          color:rgb(0, 184, 217);
          text-decoration: underline;
          padding: 0 5px;
          &:hover {
            color: #4ee5f2;
          }
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
</style>