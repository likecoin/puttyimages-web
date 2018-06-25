import * as axios from 'axios';

const options = {};
// The server-side needs a full url to works
if (process.server) {
  options.baseURL =
    process.env.API_HOST ||
    `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`;
}

export default axios.create(options);
