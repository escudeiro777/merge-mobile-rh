import axios from 'axios'

const api = axios.create({
    baseURL: 'https://apigrupo3.azurewebsites.net/api'
})

export default api;