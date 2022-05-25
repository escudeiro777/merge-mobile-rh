import axios from 'axios';

const api = axios.create({
    baseURL: 'https://newapibackendgp2.azurewebsites.net/api'
});

export default api;