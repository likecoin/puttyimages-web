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
  css: [
    // 'swiper/dist/css/swiper.css', // Uncomment this for UI development
    '~/assets/css/main.scss',
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: [
      'axios',
      'vuetify',
      '@likecoin/likecoin-eth-util',
    ],
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

      // Remove SVG from url-loader rules
      const urlLoader = config.module.rules.find(rule => rule.loader === 'url-loader');
      urlLoader.test = /\.(png|jpe?g|gif)$/;

      // Add custom SVG rule
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          // optional options, ref: https://github.com/svg/svgo
          svgo: {
            plugins: [
              { removeDoctype: true },
              { removeComments: true },
            ],
          },
        },
      });
    },
  },
  plugins: [
    '~/plugins/vuetify',
    { src: '~/plugins/ethUtil', ssr: false },
    { src: '~/plugins/swiper.js', ssr: false },
  ],
};
