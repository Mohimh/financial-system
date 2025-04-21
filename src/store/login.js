const state = {
    formType: true
}

const mutations = {
    changeMenu (state) {
        state.formType = !state.formType
    }
}

export default {
    state, 
    mutations
}