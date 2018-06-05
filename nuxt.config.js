const nodeExternals = require('webpack-node-externals');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.scss'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'vuetify'],
    extractCSS: true,
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
      if (ctx.isServer) {
        // eslint-disable-next-line no-param-reassign
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/],
          }),
        ];
      }
    },
  },
  plugins: ['~/plugins/vuetify'],
};
