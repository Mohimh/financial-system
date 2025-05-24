import router from "@/router/index"

const state = {
    routerList: router.options.routes[2].children,
    activeIndex: '1',
}

const mutations = {
    updateInformationActive(state , payload) {
        state.activeIndex = payload
    }
}

export default {
    state, 
    mutations
}