import axios from 'axios';

const api = axios.create({
  baseURL: 'https://eulabs-backend.herokuapp.com/' || 'http://localhost:3333',
});

export default api;
