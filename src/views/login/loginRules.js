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