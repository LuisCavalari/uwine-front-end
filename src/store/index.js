import Vuex from "vuex";
import Vue from "vue";
import api from "../services/api";
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
            state.user = user.user 
            state.token = user.access_token
            setToken(user.access_token)
        },
        setWineList(state, { wineList }) {
            state.wineList = wineList
        }
    },
    actions: {
        async getWineList({ commit }) {
            const response = await api.get('/wines')
            commit('setWineList', { wineList: response.data })
        }
    }

    
})
export default store;