import axios from 'axios';

const api = axios.create({
    baseURL : "https://localhost:7107",
})

export default api;