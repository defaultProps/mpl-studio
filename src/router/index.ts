import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/App.vue'
// import Preview from '../platform/Preview.vue'

// 只有一个根级路由，仅参数不同，参数不同跳转的地址不同
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    // { path: '/preview', component: Preview },
    // { path: '/shear', component: '' }, // 分享窗口
    // { path: '/404', component: '' }, // 找不到页面。可能权限不够、页面路径错误
    // 打印页面
    // 事件流页面
    // H5预览
  ]
})

export default router
