import Vuex from "vuex";
import Vue from "vue";
import { getToken,setToken } from "../services/auth";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        loading: false,
        token: getToken() || '',
        wineList: [],
        user: {},
    },
    getters : {
        isAuthenticated(state) {
            return !!state.token 
        }
    },
    mutations: {
        setLoading(state, { isLoading }) {
            state.loading = isLoading
        },
        setUser(state, { user }) {
            console.log(user)
            state.user = user.user 
            state.token = user.access_token
            setToken(user.access_token)
        }
    }
    
})
export default store;