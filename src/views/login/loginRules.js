// 登录表单添加的验证函数
export const validatePassword = () => {
  return (rule, value, callback) => {
    if(value.length === 0){
      callback(new Error('请输入密码'))
    }else if (value.length < 6) {
      callback(new Error('密码不能少于6位'))
    } else {
      callback()
    }
  }
}

export const validateCode = () => {
  return (rule, value, callback) => {
    if (value.length === 0) {
      callback(new Error('请输入验证码'))
    } else if(value.length < 2){
      callback(new Error('验证码不能少于2位'))
    }else {
      callback()
    }
  }
}

export const validateMobile = () => {
  return (rule, value, callback) => {
    if (value.length === 0) {
      callback(new Error('请输入手机号'))
    } else if(!/^1[3-9]\d{9}$/.test(value)) {
      callback(new Error('手机号码格式不正确'));
    }else {
      callback()
    }
  }
}

export const validateSms_code = () => {
  return (rule, value, callback) => {
    if (value.length === 0) {
      callback(new Error('请输入验证码'))
    } else if(value.length !== 6) {
      callback(new Error('短信验证码格式不正确'));
    }else {
      callback()
    }
  }
}
