const axios = require('axios');

const { API_HOST } = process.env;

module.exports = {
  get: (url) => axios.get(`${API_HOST}/api/${url}`),
  post: (url, data) => axios.post(`${API_HOST}/api/${url}`, data),
};
