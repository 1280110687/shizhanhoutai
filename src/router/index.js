// 1.引入vue
import Vue from 'vue'
// 2.引入vue-router
import VueRouter from 'vue-router'

// 引入组件
import Login from '@/pages/login.vue'
// 3.use
Vue.use(VueRouter)

// 4.创建路由对象
const router = new VueRouter({
  // 5.添加路由配置
  routes: [
    // 6.添加具体的路由配置---路由映射组件
    {
      name: 'Login',
      path: '/login',
      component: Login
    }
  ]
})

// 7.导出
export default router
