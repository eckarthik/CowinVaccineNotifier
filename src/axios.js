import axios from 'axios';

const API_ENDPOINT =  'https://cdn-api.co-vin.in/api/';

const instance = axios.create({
    baseURL:API_ENDPOINT
});



export default instance;