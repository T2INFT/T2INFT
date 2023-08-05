// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element3/lib/theme-chalk/index.css'
import Element3 from 'element3'
import { createStore } from 'vuex'
import Loading from "@/components/Loading/loading"
const app = createApp(App)
const store = createStore({
    state() {
        return {
            // url: 'http://10.68.40.185:4000',
            // url: "http://101.32.32.33:7502",
            url: "http://43.136.53.52:7502",

            logState: localStorage.token != null,
            token: localStorage.token ? localStorage.token : '',
            userid: localStorage.userid,
            imgid: -1,
            isRateDisabled: false,
            rateValue: null,
            datahttp: '',
            imgdata: null,
            publicKey: '',
        }
    },
    mutations: {
        login (state, data) {
            state.logState = !state.logState
            state.token = data.token
            state.userid = data.userid
        },
        logout (state) {
            state.logState = false
            state.token = ''
            state.userid = -1
        }
    }
})
app.use(store)
app.use(router)
app.use(Element3)
app.use(Loading)
app.mount('#app')

export default app
