import { createStore } from 'vuex'
import menu from './menu'
import login from './login'


export default createStore({
    modules: {
        menu,
        login
    }
})