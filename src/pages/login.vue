<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      class="demo-ruleForm"
    >
      <el-form-item label prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {

      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
