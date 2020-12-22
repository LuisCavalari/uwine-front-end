import { getToken } from '../services/auth';

const state = {
  loading: false,
  token: getToken() || '',
  wineList: [],
  user: {},
  menuVisible: false,
};

export default state;
