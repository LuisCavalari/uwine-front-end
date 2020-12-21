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
  },
  actions: {
    async getWineList({ commit }, url) {
      let response;
      if (!url) {
        response = await api.get('/wines');
      } else {
        response = await api({
          url,
          method: 'GET',
        });
      }

      commit('setWineList', { wineList: response.data });
    },
    async getWineListByName({ commit }, params) {
      const reponse = await api.get('/wines', {
        params,
      });
      commit('setWineList', { wineList: reponse.data });
    },
    async getUser({ commit }) {
      const response = await api.get('/auth/me');
      const user = response.data.user;
      commit('setUser', { user });
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
      commit('setLoading', { isLoading: false });
      return response;
    },
  },


});
export default store;
