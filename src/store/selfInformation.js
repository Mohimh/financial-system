import router from "@/router/index"

const state = {
    routerList: router.options.routes[2].children,
    activeIndex: '',
}

const mutations = {
    updateInformationActive(state , payload) {
        console.log('当前被选中的目标是:', payload)
        state.activeIndex = payload
        console.log('activeIndex的值是:', state.activeIndex)
    }
}

export default {
    state, 
    mutations
}