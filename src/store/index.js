import { createStore } from 'vuex'
import menu from './menu'
import login from './login'
import selfInformation from './selfInformation'


export default createStore({
    modules: {
        menu,
        login,
        selfInformation
    }
})