export const getToken = () => localStorage.getItem('uwine@token')
export const setToken = token => localStorage.setItem('uwine@token',token) 
export const removeToken = ()=> localStorage.removeItem('uwine@token')