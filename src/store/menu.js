import router from "@/router/index"

const state = {
    isCollapse: false,
    selectMenu: [],
    routerList: router.options.routes[0].children,
    activeIndex: ''
}

console.log(router.options.routes[0].children)

const mutations = {
    // 收折侧边栏
    collapseMenu (state) {
        state.isCollapse = !state.isCollapse
    },
    // 增加导航栏
    addMenu (state, payload) {
        if (payload.path === '/home') {
            return
        }
        if (state.selectMenu.findIndex(item => item.path === payload.path) === -1) {
            state.selectMenu.push(payload)
        }
    },
    // 删除导航栏
    closeMenu (state, payload) {
        const index = state.selectMenu.findIndex(val => val.name === payload.name)
        state.selectMenu.splice(index, 1)
    },
    // 
    dynamicMenu (state, payload) {
        console.log(payload)
        // 通过glob导入文件
        const modules = import.meta.glob('../views/**/**/*.vue')
        console.log(modules)
        function routerSet(router) {
            router.forEach(route => {
                // 判断没有子菜单，拼接路由数据
                if (!route.children) {
                    const url = `../views${route.meta.path}/index.vue`
                    // 拿到获取的vue组件
                    route.component = modules[url]
                } else {
                    routerSet(route.children)
                }
            })
        }
        routerSet(payload)
        // 拿到完整的路由数据
        state.routerList = payload
    },
    updateMenuActive(state, payload) {
        state.activeIndex = payload
    }
}

export default {
    state, 
    mutations
}