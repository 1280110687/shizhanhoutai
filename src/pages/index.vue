<template>
  <div class="home">
    <!-- 左侧导航 -->
    <el-container>
      <el-aside width="200px">
        <img src="../assets/logo.png" alt class="logo" />
        <el-menu
          :router="true"
          :default-active='"1-1"'
          :unique-opened="true"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <span slot="title">
              <i class="el-icon-news"></i>
              <span>用户管理</span>
            </span>
            <el-menu-item index="1-1">
              <i class="el-icon-tickets"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <span slot="title">
              <i class="el-icon-tickets"></i>
              <span>文章管理</span>
            </span>
            <el-menu-item index="postList">
              <i class="el-icon-document"></i>
              <span>文章列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-edit"></i>
              <span>文章发布</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <span slot="title">
              <i class="el-icon-edit-outline"></i>
              <span>栏目管理</span>
            </span>
            <el-menu-item index="3-1">
              <i class="el-icon-tickets"></i>
              <span>栏目列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 头部 -->
      <el-container>
        <el-header>
          <span class="icon-menu toggle-btn"></span>
          <span class="system-title">黑马头条后台管理系统</span>
          <div>
            <span class="welcome">欢迎您：***</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>退出</span>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
