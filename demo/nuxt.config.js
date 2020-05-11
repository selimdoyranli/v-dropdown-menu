const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [{ src: 'https://cdn.jsdelivr.net/npm/gist-embed@1.0.3/dist/gist-embed.min.js' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#012353' },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources'
    // Doc: https://bootstrap-vue.js.org/docs/
    // Doc: https://axios.nuxtjs.org/
  ],

  /*
   ** Global Styles
   */
  styleResources: {
    scss: [
      // Utilities
      '~/assets/scss/utilities/_browserhack.scss', // Doc: https://github.com/selimdoyranli/browser-hack-sass-mixins
      '~/assets/scss/utilities/_variables.scss',
      '~/assets/scss/utilities/_mixins.scss'
    ]
  },

  /*
   ** Global Styles (App, Libs.)
   */
  css: [
    // App
    '~/assets/scss/app.scss',
    // External Libs
    '~/assets/css/libs/animate.css' // Doc: https://github.com/daneden/animate.css
  ],

  /*
   ** Plugins to load before mounting the App (NPM or your modules & vue plugins)
   */
  plugins: [
    { src: '~/plugins/v-dropdown-menu.js' } // Doc: https://github.com/radkod/v-dropdown-menu
  ],

  /*
   ** Axios Config
   */
  axios: {
    // proxyHeaders: false
  },

  /*
   ** Build configuration
   */
  build: {
    extractCSS: process.env.NODE_ENV === 'production',
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  /*
   ** Server configuration
   */
  server: {
    host: '0.0.0.0', // default: localhost,
    timing: false,
    port: 80
  }
}
