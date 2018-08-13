import axiosist from 'axiosist';
import express from 'express';
import api from '../../../server/api';

const app = express();
app.use('/api', api);

const axios = axiosist(app);

module.exports = {
  axios,
  get: (url) => axios.get(`/api/${url}`),
  post: (url, data) => axios.post(`/api/${url}`, data),
};
