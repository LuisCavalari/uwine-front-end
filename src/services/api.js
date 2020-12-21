import axios from 'axios'
import { getToken } from './auth'
import router from "../router";
import store from "../store";
const api = axios.create({
    baseURL: 'http://localhost:8000/api'
})

api.interceptors.request.use(async config => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
api.interceptors.response.use(
    (response) => response,
     function (err) {
        const isTokenExpired = !!err.response.data.expiredToken  
        if (err.response.status === 401 && isTokenExpired) {
           store.dispatch('logout')
           router.push('/')
        }
        return Promise.reject(err)
    }
    
);

export default api