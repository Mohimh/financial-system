import { createApp } from 'vue'
import './assets/style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 路由守卫
router.beforeEach((to, from) => {
    const token = localStorage.getItem('fs_token')
    const expiresAt = localStorage.getItem('fs_expiresAt')
    // 非登录页面token不存在
    if (!token && !expiresAt && to.path !== '/login') {
        return '/login'
    } else if (token && expiresAt && to.path === '/login') {
        return '/'
    } else {
        return true
    }
})

const app = createApp(App)

app.use(ElementPlus)
// 路由挂载
app.use(router)
app.use(store)
app.mount('#app')

// ElementPlus组件内容
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}