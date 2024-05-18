<template>
  <!-- 注册表单 -->
  <el-form ref="loginFromRef" style="max-width: 600px" :model="loginForm " :rules="loginRules">
    <!-- 手机号-->
    <el-form-item prop="mobile">
      <el-input trim size="large" style="width: 100%; border-radius: 8px;" v-model="loginForm.mobile" name="mobile"
        placeholder="手机号码" type="text"  @keyup.enter.native="handleLogin"/>
    </el-form-item>
    <!-- 短信验证码 -->
    <el-form-item prop="sms_code">
      <el-input trim size="large" style="width: 100%; border-radius: 8px;" v-model="loginForm.sms_code" name="sms_code"
        placeholder="短信验证码" type="text"  @keyup.enter.native="handleLogin"/>
      <div class="code" :class="isSendCode ? 'active' : ''" @click="sedCode">
        <el-button v-if="isSendCode" size="large" plain type="info" disabled>{{ countDown }}秒后重新获取</el-button>
        <el-button v-else size="large" plain>发送验证码</el-button>
      </div>
    </el-form-item>
    <!-- 注册按钮 -->
    <el-form-item>
      <el-button v-if="isSendCode || loginForm.mobile === '' || loginForm.sms_code === ''" disabled :loading="store.getters.isLoading" size="large" style="width: 100%; border-radius: 8px;" type="primary"  @click.native.prevent="handleLogin" >
        登录
      </el-button>
      <el-button v-else :loading="store.getters.isLoading" size="large" style="width: 100%; border-radius: 8px;" type="primary"  @click.native.prevent="handleLogin" >
        登录
      </el-button>
    </el-form-item>

  </el-form>

  <!-- 注册页返回 -->
  <div class="goBack" @click="goBack">
    <router-link  to="/login">
    <el-icon :size="18"><ArrowLeft /></el-icon>
    返回
  </router-link>
  </div>
</template>

<script setup>
import { reactive, ref} from 'vue'
import { validateMobile, validateSms_code} from '../../loginRules'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {api} from '@/api'
import {ElMessage } from 'element-plus'

const countDown = ref(59)
const isSendCode = ref(false)

// 注册表单数据
const loginForm = reactive({
  mobile: '',
  sms_code: ''
})

//注册验证规则
const loginRules = ref({
  mobile: [
    {
      required: true,
      trigger: 'blur',
      validator: validateMobile()
    },

  ],
  sms_code: [
    {
      required: true,
      trigger: 'blur',
      validator: validateSms_code()
    },

  ],
})


// 登录动作处理
const loginFromRef = ref(null)
const store = useStore()
const router = useRouter()

// 倒计时
let intervalId = null;
const startCountDown = () => {
  clearInterval(intervalId); // 清除之前的计时器
  countDown.value = 59; // 重置倒计时
  intervalId = setInterval(() => {
    if (countDown.value > 0) {
      countDown.value--;
    } else {
      clearInterval(intervalId);
      isSendCode.value = false;
    }
  }, 1000);
};

/**
 * 发送手机验证码
 */
const sedCode = () => {
  startCountDown()
  // 单独校验手机号
  loginFromRef.value.validateField('mobile', async (valid) => {
    if (!valid) return
    // 如果手机号校验通过，则发送请求获取验证码
    isSendCode.value = true;
    const [err,res] = await api.getSmsCode({mobile: loginForm.mobile})
    console.log(res.data)
    const result = res.data.data
    setTimeout(() => {
      loginForm.sms_code = result.code
      isSendCode.value = false;
    },2000)
    ElMessage.success('验证码已发送');
  })
}


/**
 * 注册登录
 */
 const handleLogin = () => {
  loginFromRef.value.validate (valid => {
    if (!valid) return 
    store.commit('user/setLoadingState', true)
    store.dispatch('user/mobileLogin', loginForm).then((res)=>{
      router.push('/')
      store.commit('user/setLoadingState', false)
    }).catch((err) => {
      console.log(err)
      store.commit('user/setLoadingState', false)
    })
  })
}

/**
 * 返回
 */
 const goBack = () => {
  store.commit('user/setActiveState', 'login')
}
</script>

<style lang="scss" scoped>
:deep(.el-form-item__content){
  line-height: 40px;
}
:deep(.el-button--large){
  flex-grow: 1;
  border-radius: 8px;
}
:deep(.el-form-item__content){
  flex-wrap: nowrap;
}
:deep(.el-button.is-disabled){
  cursor: not-allowed;
  border-color: #d9d9d9;
  color: rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 0.04) !important;
}
.code {
  :deep(.el-button:hover){
    color: #00a76f;
    border-color: #00a76f;
  }
  :deep(.el-button--large){
    margin-left: 30px;
  }
  :deep(.el-button.is-disabled){
    border-color: #d9d9d9;
    color: rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 0, 0, 0.03);
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