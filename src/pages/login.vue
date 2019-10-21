<template>
  <div class="login">
    <div class="container">
      <img src="../assets/avatar.jpg" alt class="avatar" />
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item label prop="username">
          <el-input v-model="loginForm.username" prefix-icon="icon-user-check" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="icon-key" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/users.js'
export default {
  data () {
    var usernamePass = (rule, value, callback) => {
      // console.log(value)
      // console.log(/\W/.test(value))
      if (/\W/.test(value)) {
        callback(new Error('用户名不能包含特殊符号'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '100869',
        password: '123'
      },
      rules: {
        username: [
          // required:必填项  message:如果数据不符合规则所给出的提示信息  trigger：什么时候触发，失去焦点时触发  pattern:添加正则表达式
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: usernamePass, min: 3, max: 8, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '请输入长度为6~12位的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 实现登录
    login () {
      // 再次验证用户是否输入合法，如果输入合法，则发起登录验证请求，否则给提示终止请求
      // 如果vliad为true，则说明通过了合法性的校验，否则不通过
      // 只有return false才会终止本次请求
      this.$refs.loginForm.validate(async valid => {
        // console.log(valid)// 返回true或者false，有错为false
        if (valid) {
          // 发起登录请求
          let res = await login(this.loginForm)
          console.log(res)
          if (res.status === 200 && res.data.message === '登录成功') {
            localStorage.setItem('heima_backstage_37_token', res.data.data.token)
            // 跳转到首页
            this.$router.push({ name: 'Index' })
          } else if (res.status === 200 && res.data.statusCode === 401) {
            this.$message.error('登录失败')
          }
        } else {
          this.$message.warning('数据输入不合法')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
