// 注册表单添加的验证函数
export const regValidatePassword = () => {
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

export const regValidateConfirmPassword = (registerForm) => {
  return (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== registerForm.password) {
      callback(new Error('两次输入的密码不一致'));
    } else {
      callback();
    }
  }
}