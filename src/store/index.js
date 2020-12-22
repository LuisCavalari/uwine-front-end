import Vuex from 'vuex';
import Vue from 'vue';
import api from '../services/api';
import { getToken, setToken, removeToken } from '../services/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loading: false,
    token: getToken() || '',
    wineList: [],
    user: {},
    menuVisible: false
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  mutations: {
    setLoading(state, { isLoading }) {
      state.loading = isLoading;
    },
    setToken(state, { token }) {
      state.token = token;
      setToken(token);
    },
    setUser(state, { user }) {
      state.user = user;
    },
    setWineList(state, { wineList }) {
      state.wineList = wineList;
    },
    setMenuState(state) {
      state.menuVisible = !state.menuVisible
    }
  },
  actions: {
    changeMenuState({ commit }) {
      commit('setMenuState')
    },
    async getWineList({ commit }, url) {
      commit('setLoading', { isLoading: true });
      const response = await api.get('/wines');
      commit('setWineList', { wineList: response.data });
      commit('setLoading', { isLoading: false });
    },
    async getWineListPerPage({ commit },url) {
      commit('setLoading', { isLoading: true });
      const response = await api({
        url,
        method: 'GET',
      });
      commit('setWineList', { wineList: response.data });
      commit('setLoading', { isLoading: false });
    },
    async getWineListByName({ commit }, params) {
      commit('setLoading', { isLoading: true });
      const reponse = await api.get('/wines', {
        params,
      });
      commit('setWineList', { wineList: reponse.data });
      commit('setLoading', { isLoading: false });
    },
    async getUser({ commit }) {
      commit('setLoading', { isLoading: true });
      const response = await api.get('/auth/me');
      const user = response.data.user;
      commit('setUser', { user });
      commit('setLoading', { isLoading: false });
    },
    async login({ commit }, loginData) {
      commit('setLoading', { isLoading: true });
      const response = await api.post('/auth/login', loginData);
      const user = response.data.user;
      const token = response.data.access_token;
      commit('setUser', { user });
      commit('setToken', { token });
      commit('setLoading', { isLoading: false });
    },
    async logout({ commit }) {
      removeToken();
      commit('setToken', { token: '' });
      commit('setUser', { user: {} });
      commit('setLoading', { isLoading: false });
    },
    async addNewWine({ commit }, wineData) {
      commit('setLoading', { isLoading: true });
      const response = await api.post('/wines', wineData);
      commit('setLoading', { isLoading: false });
      return response;
    },
    async deleteWine({ commit }, id) {
      commit('setLoading', { isLoading: true });
      const response = await api.delete(`/wines/${id}`);
      return response;
    },
    async getWineById({ commit }, id) {
      commit('setLoading', { isLoading: true });
      const response = await api.get(`/wines/${id}`);
      commit('setLoading', { isLoading: false });
      return response;
    },
    async updateWine({ commit }, data) {
      commit('setLoading', { isLoading: true });
      const response = await api.put(`/wines/${data.id}`, data.updatedWine);
      commit('setLoading', { isLoading: false });
      return response;
    },
    async registerUser({ commit }, userData) {
      commit('setLoading', { isLoading: true });
      const response = await api.post('/user',userData)
      commit('setToken', { token: response.data.access_token })
      commit('setUser', { user:response.data.user })
      commit('setLoading', { isLoading: false });
    }
  },


});
export default store;
