<template>
      <div class="backGround">
        <el-card class="box-card">
            <div class="logo">
                <img src="../../assets/elm-logo.png" alt="">
            </div>
            <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef">
                <el-form-item prop="phoneNumber">
                    <el-input placeholder="请输入手机号" v-model="loginForm.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input style="width:62%" placeholder="验证码" v-model="loginForm.code"></el-input>
                    <el-button style="float:right;width:33%" plain>发送验证码</el-button>
                </el-form-item>
                <el-form-item prop="check">
                    <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%" @click="submit">登录</el-button>
                </el-form-item>
                <div class="aaa">aaa</div>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        phoneNumber: '',
        code: '',
        check: true
      },
      loginRules: {
        phoneNumber: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入六位验证码' }
        ],
        check: [
          { validator: (role, value, callback) => value ? callback() : callback(new Error('请详细阅读并勾选上方所有协议')) }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.loginFormRef.validate(isOK => isOK ? console.log('该请求接口啦~') : null)
    }
  }
}
</script>

<style scoped lang="less">
.backGround{
    background: url('../../assets/elm-bg.jpeg') no-repeat ;
    background-position: 0 0;
    background-size: cover;
    height: 100vh;
    animation: bgMove 20s infinite linear;
    .box-card{
        position: absolute;
        top: 0;right: 0;bottom: 0;left: 650px;
        margin: auto;
        width: 450px;
        height: 400px;
        .logo{
            text-align: center;
            margin-bottom: 0px;
            img{
                height: 120px;
            }
        }
    }
}

@keyframes bgMove {
    0%{
        background-position:0 0;
    }
    100%{
        background-position:100% 0;
    }
}

</style>
