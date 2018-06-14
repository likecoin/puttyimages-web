const resolve = require('path').resolve; // eslint-disable-line

// Minimal Webpack config to supply to Eslint.
// This is not actually used by Nuxt but instead mirrors
// the resolve and loader rules.
module.exports = {
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.js$/,
      },
      {
        exclude: /node_modules/,
        loader: 'vue-loader',
        test: /\.vue$/,
      },
    ],
  },

  resolve: {
    alias: {
      '@': __dirname,
      '~': __dirname,
      // your aliases go here.
    },
    extensions: ['.js', '.vue'],
    modules: [resolve(__dirname, 'lib'), 'node_modules'],
  },
};
