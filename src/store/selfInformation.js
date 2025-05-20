import router from "@/router/index"

const state = {
    routerList: router.options.routes[2].children,
    activeIndex: ''
}

const mutations = {
    updateMenuActive(state, payload) {
        state.activeIndex = payload
    }
}

export default {
    state, 
    mutations
}