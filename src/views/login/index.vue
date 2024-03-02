<template>
  <div class="loginWrapper">
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
          <svg-icon class="tipIcon" icon="tipicon" />
          <el-descriptions column="1">
            <el-descriptions-item class-name="class-content" label-class-name="class-label"
              label="Admin 账号:">admin@gmail.com</el-descriptions-item>
            <el-descriptions-item class-name="class-content" label-class-name="class-label"
              label="Test 账号:">test@gmail.com</el-descriptions-item>
            <el-descriptions-item class-name="class-content" label-class-name="class-label"
              label="密码:">demo1234</el-descriptions-item>
          </el-descriptions>
        </div>

        <div class="loginFrom">
          <el-form ref="ruleFormRef" style="max-width: 600px" :model="loginForm" :rules="rules" label-width="auto"
            class="demo-ruleForm">

            <el-form-item prop="username">
              <el-input size="large" style="width: 100%; border-radius: 8px;" v-model="loginForm.username" name="username"
                placeholder="账号" type="text" />
            </el-form-item>

            <el-form-item prop="password" label-suffix>
              <el-input  size="large" style="width: 100%; border-radius: 8px;" v-model="loginForm.password" name="password"
                placeholder="密码" type="password" show-password />
            </el-form-item>

            <el-form-item class="code-box" prop="captcha_code">
              <el-input size="large" style="width: 100%; border-radius: 8px;" placeholder="图形验证码" v-model="loginForm.captcha_code"
                name="captcha_code" class="code-input" maxlength="4">
              </el-input>
              <div class="code-img" @click="getCodeImg">{{ code_net }}</div>
            </el-form-item>

            <el-from-item>
              <div class="rememberMe">
                <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
                <a href="/forgot-password">忘记密码?</a>
              </div>
            </el-from-item>

            <el-form-item>
              <el-button size="large" style="width: 100%; border-radius: 8px;" type="primary">登录</el-button>
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
</template>

<script setup>
import { reactive, ref } from 'vue'

const ruleFormRef = ref()

const loginForm = reactive({
  username: "",
  password: "",
  captcha_code: '',
  rememberMe: ""
})

</script>


<style lang="scss" scoped>

.loginWrapper {
  background-color: #f5f5f5;
  height: 100vh;
  display: flex;

  .loginBanner {
    flex-grow: 2; 
    background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)) center center / cover no-repeat,
      url(../../assets/xxx.jpg);
    @include flex-box(column);

    >h1,>p {flex: 0 0 auto; }
    >p{font-size: 16px; color:#1b1e1e;}
    >h1 {padding-top: 20px;}
    .bgImg {flex: 1; }
  }

  .loginContent {
    flex-shrink: 1; 
    flex-basis: auto;
    margin: 50px 16px 0 16px;
    padding: 0 64px;

    >h2{margin-bottom: 16px;}

    .testAccount {
      @include flex-box-set($ai:start,$jc:start);
      border: 1px solid #7af8ff;
      background-color: #e6ffff;
      padding: 20px 24px;
      border-radius: 10px;
      margin-bottom: 16px;

      .tipIcon{
        width: 25px;
        height: 25px;

        .class-content,
        .class-label {
          font-weight: 700;
        }

        .class-content {
          cursor: pointer;
          color: #52daec !important;
        }
      }
    }

    .loginFrom {

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

    /** 登录提示背景 */
    ::v-deep .el-divider__text {
      background-color: #f5f5f5;
    }

    ::v-deep .el-descriptions__body {
      background-color: transparent;
    }
    /** 分隔符 padding */
    ::v-deep .el-descriptions__body .el-descriptions__table:not(.is-bordered) .el-descriptions__cell {
      padding-bottom: 0;
    }
    ::v-deep .el-descriptions__label:not(.is-bordered-label){
      padding: 0 5px;
      margin: 0px 5px;
      color: rgba(0, 0, 0, 0.88);
    }
  }
  @media (max-width: 768px) {
    .loginBanner {
      display: none; 
    }

    .loginContent {
      min-width: 480px;
      margin: 30px auto;
    }
  }
  @media(max-width: 990px){
    .loginContent {
      padding: 0;
      width: 480px;
    }
  }
  @media (max-width: 860px) {
    .loginContent {
      min-width: 305px;
    }
  }
}
</style>