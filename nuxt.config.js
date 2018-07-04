const nodeExternals = require('webpack-node-externals');

module.exports = {
  /*
  ** Add axios globally
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          exclude: /(node_modules)/,
          loader: 'eslint-loader',
          test: /\.(js|vue)$/,
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
      const urlLoader = config.module.rules.find(
        (rule) => rule.loader === 'url-loader'
      );
      urlLoader.test = /\.(png|jpe?g|gif)$/;

      // Add custom SVG rule
      config.module.rules.push({
        loader: 'vue-svg-loader',
        options: {
          // optional options, ref: https://github.com/svg/svgo
          svgo: {
            plugins: [{ removeDoctype: true }, { removeComments: true }],
          },
        },
        test: /\.svg$/,
      });
    },
    extractCSS: true,
    vendor: ['axios', 'vuetify', '@likecoin/likecoin-eth-util'],
  },
  /*
  ** Global CSS
  */
  css: [
    // 'swiper/dist/css/swiper.css', // Uncomment this for UI development
    '~/assets/css/main.scss',
  ],
  /*
  ** Headers of the page
  */
  head: {
    link: [
      { href: '/favicon.png', rel: 'icon', type: 'image/x-icon' },
      {
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
        rel: 'stylesheet',
        type: 'text/css',
      },
    ],
    meta: [
      { charset: 'utf-8' },
      { content: 'width=device-width, initial-scale=1', name: 'viewport' },
      { content: 'Nuxt.js project', hid: 'description', name: 'description' },
    ],
    title: 'starter',
  },
  plugins: [
    '~/plugins/vuetify',
    { src: '~/plugins/ethUtil', ssr: false },
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/vue-clipboard2.js', ssr: false },
  ],
  router: {
    middleware: 'routing',
  },
};
