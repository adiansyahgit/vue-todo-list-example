import axios from 'axios'
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export default api