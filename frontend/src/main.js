// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element3/lib/theme-chalk/index.css'
import Element3 from 'element3'
import { createStore } from 'vuex'
const app = createApp(App)
const store = createStore({
    state() {
        return {
            logState: false,
            token: '',
            userid: -1,
        }
    },
    mutations: {
        login (state, data) {
            state.logState = !state.logState
            state.token = data.token
            state.userid = data.userid
        }
    }
})
app.use(store)
app.use(router)
app.use(Element3)
app.mount('#app')
