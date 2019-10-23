// 1.引入vue
import Vue from 'vue'
// 2.引入vue-router
import VueRouter from 'vue-router'

// 引入组件
import Login from '@/pages/login.vue'
import Index from '@/pages/index.vue'
import Welcome from '@/pages/welcome.vue'
import PostList from '@/pages/postList.vue'
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
    },
    {
      name: 'Index',
      path: '/',
      component: Index,
      // 添加重定向
      redirect: { name: 'Welcome' },
      children: [
        {
          name: 'Welcome',
          path: 'welcome',
          component: Welcome
        },
        {
          name: 'PostList',
          path: '/postList',
          component: PostList
        }
      ]
    }
  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('heima_backstage_37_token')
  console.log()
  if (token || to.path === '/login') {
    next()
  } else {
    next({ name: 'Login' })
  }
})

// 7.导出
export default router
