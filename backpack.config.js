module.exports = {
  // eslint-disable-next-line no-unused-vars
  webpack: (config, options, webpack) => {
    config.entry.main = './server/index.js'; // eslint-disable-line no-param-reassign
    return config;
  },
};
