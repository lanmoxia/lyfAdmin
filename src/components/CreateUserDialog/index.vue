<template>
  <el-dialog :model-value="modelValue" :title="title" @update:model-value="updateVisible" width="30%">
    <el-form ref="createUserFromRef" :model="newUserForm" :rules="newUserRules">
      <!-- 输入账号 -->
    <el-form-item prop="username">
      <el-input trim size="large" v-model="newUserForm.username" name="username"
        placeholder="账号" type="text"  @keyup.enter.native="submitNewUser"/>
    </el-form-item>
    <!-- 输入密码 -->
    <el-form-item prop="password" label-suffix>
      <el-input trim size="large" v-model="newUserForm.password" name="password"
        placeholder="密码" :type="passwordType" @keyup.enter.native="submitNewUser"/>
        <span class="showPassword">
          <svg-icon class="svgIcon" :icon="passwordType === 'password' ? 'eye' : 'eye-open'" @click="onChangePwdType" />
        </span>
    </el-form-item>
    <!-- 确认密码 -->
    <el-form-item prop="confirmPassword" label-suffix>
      <el-input trim size="large" v-model="newUserForm.confirmPassword" name="confirmPassword"
        placeholder="确认密码" :type="passwordType" @keyup.enter.native="submitNewUser"/>
        <span class="showPassword">
          <svg-icon class="svgIcon" :icon="passwordType === 'password' ? 'eye' : 'eye-open'" @click="onChangePwdType" />
        </span>
    </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="updateVisible(false)">取消</el-button>
      <el-button type="primary" :loading="store.getters.isLoading" @click.native.prevent="submitNewUser">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, onMounted, computed} from 'vue'
import { regValidatePassword, regValidateConfirmPassword} from './createRules'
import { useStore } from 'vuex'
import {api} from '@/api'
import {ElMessage } from 'element-plus'
import md5 from 'js-md5';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: '文件上传'
  },
  url: {
    type: String,
    default: ""
  }
})


// 创建用户表单数据
const newUserForm = reactive({
  username: '',
  password: ''
})

//创建用户验证规则
const newUserRules = ref({
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
      validator: regValidateConfirmPassword(newUserForm)
    },
  ]
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

// 登录注册处理
const createUserFromRef = ref()
const store = useStore()

const emits = defineEmits(['update:modelValue','userCreated'])

// 重置表单的方法
const resetForm = () => {
  newUserForm.username = ''
  newUserForm.password = ''
  newUserForm.confirmPassword = ''
}

const updateVisible = (value) => {
  emits('update:modelValue', value)
  // if (!value) {
  //   // 重置表单
  //   resetForm()
  // }
}

// 提交新用户的逻辑
const submitNewUser = () => {
  createUserFromRef.value.validate ( async valid => {
    if (!valid) return 
    
    store.commit('user/setLoadingState', true)
    const formData = {
      ...newUserForm,
      password: md5(newUserForm.password)
    }
    store.commit('user/setLoadingState', true)
    const [err,res] = await api.userCreate(formData)
    if(!err){ 
      console.log('执行前')
      emits('userCreated')
      console.log('执行后')
      store.commit('user/setLoadingState', false)   
      ElMessage.success("创建成功")    
    }else {
      store.commit('user/setLoadingState', false)
    }
  })
  updateVisible(false)
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/element.scss';
:deep(.el-form-item__content){
  line-height: 40px;
}
:deep(.button:disabled){
  border-color: #d9d9d9;
    color: rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 0, 0, 0.03);
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