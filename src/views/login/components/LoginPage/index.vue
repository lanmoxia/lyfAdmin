<template>
  <!-- 账号密码提示 -->
  <div class="testAccount">

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
    <div class="loginFrom">
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
              name="captcha_code" class="code-input" maxlength="2" @keyup.enter.native="handleLogin">
            </el-input>
            <div class="code-img" @click="getCodeImg" v-html="coloredCode"></div>
          </div>
          
        </el-form-item>
        <!-- 记住密码 -->
        <div class="rememberMe">
          <el-form-item>
          <el-checkbox  v-model="checked" @change="checkChange">记住我</el-checkbox>
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
  </div>

</template>

<script setup>
import { reactive, ref, onMounted, computed} from 'vue'
import { validatePassword, validateCode} from '../../loginRules'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {getCode} from '@/api'
import {ElMessage } from 'element-plus'
import md5 from 'js-md5';

const checked = ref(true)
const code_net = ref('')

onMounted(async () => {
  await getCodeImg()
  checkChange(checked.value);
})

// 填充账号密码
const checkChange = (checked) => {
  if(checked){
    loginForm.username = 'admin@gmail.com'
    loginForm.password = 'demo1234' 
    loginForm.captcha_code = code_net.value 
  }else {
    loginForm.username = ''
    loginForm.password = ''
    loginForm.captcha_code = ''
  }
}

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
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
// 处理密码框文本显示状态
const passwordType = ref('password')
//密码眼睛icon
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 登录动作处理
const loginFromRef = ref()
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
    if (!valid) return
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
 * 获取图形验证码
 */
 const getCodeImg = async () => {
  try{
    const data = await getCode()
    code_net.value = data.code
    loginForm.captcha_code = code_net.value 
  }catch(error){
    throw error
  }
 }
</script>

<style lang=scss scoped>
@import '@/styles/mixin.scss';
@import '@/styles/element.scss';
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

.loginFrom{
  :deep(.el-form-item__content){
    line-height: 40px;
  }
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
}
</style>