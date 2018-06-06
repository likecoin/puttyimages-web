const axios = require('axios');

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

module.exports = {
  get: (url) => axios.get(`http://${host}:${port}/api/${url}`),
  post: (url, data) => axios.post(`http://${host}:${port}/api/${url}`, data),
};
