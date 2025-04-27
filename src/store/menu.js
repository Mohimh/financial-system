const state = {
    isCollapse: false,
    selectMenu: [],
    routerList: [
        {
            path: 'home',
            meta: { id: '1', name: '首页', icon: 'HomeFilled', path: '/home'},
        },
        {
            path: 'department',
            meta: { id: '2', name: '部门信息', icon: 'Postcard', path: '/department'},
        },
        {
            path: 'stuff',
            meta: { id: '3', name: '员工管理', icon: 'User', path: '/stuff'},
        },
        {
            path: 'salary',
            meta: { id: '4', name: '工资管理', icon: 'ScaleToOriginal', path: '/salary'},
        },
        {
            path: 'reimbursement',
            meta: { id: '5', name: '日常报销', icon: 'DocumentChecked', path: '/reimbursement'},
        }
    ]
}

const mutations = {
    collapseMenu (state) {
        state.isCollapse = !state.isCollapse
    },
    addMenu (state, payload) {
        if (state.selectMenu.findIndex(item => item.path === payload.path) === -1) {
            state.selectMenu.push(payload)
        }
    },
    closeMenu (state, payload) {
        const index = state.selectMenu.findIndex(val => val.name === payload.name)
        state.selectMenu.splice(index, 1)
    },
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
        state.menuActive = payload
    }
}

export default {
    state, 
    mutations
}