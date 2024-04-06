<template>
  <!-- 注册表单 -->
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
</template>

<script setup>
import { reactive, ref, onMounted, computed} from 'vue'
import { regValidatePassword, regValidateConfirmPassword,regValidateCode} from '../../registerRules'
import { useStore } from 'vuex'
import {getCode,userRegister} from '@/api'
import {ElMessage } from 'element-plus'
import md5 from 'js-md5';

const code_net = ref('')

onMounted( () => {
  getCodeImg()
})

// 生成带有随机颜色的验证码字符
const coloredCode = computed(() => {
  const colors = ['#9ec7fd', '#ea766d', '#a4da94', '#ff938b', '#1d2940']
  return code_net.value.split('').map(char => `<span style="color: ${randomColor()}">${char}</span>`).join('');
});

const randomColor = () => {
  const colors = ['#9ec7fd', '#ea766d', '#a4da94', '#ff938b', '#1d2940']
  return colors[Math.floor(Math.random() * colors.length)]
}

// 注册表单数据
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  captcha_code: ''
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
const registerFromRef = ref()
const store = useStore()

/**
 * 注册
 */
 const handleRegister = () => {
  registerFromRef.value.validate (valid => {
    if (!valid) return 
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
        store.commit('user/setActiveState', 'login') 
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
 * 返回
 */
 const goBack = () => {
  store.commit('user/setActiveState', 'login')
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/element.scss';
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
</style>