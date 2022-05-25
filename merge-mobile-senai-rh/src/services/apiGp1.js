import axios from 'axios';

const api = axios.create({
    baseURL: 'http://apirhsenaigp1.azurewebsites.net/api'
    
});

export default api;