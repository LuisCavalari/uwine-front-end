import { setToken } from '../services/auth';
const mutations =  {
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
}

export default mutations