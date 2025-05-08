// frontend/vue.config.js
const path = require('path');

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        // make sure you have installed vue-i18n first!
        'vue-i18n$': path.join(
          __dirname,
          'node_modules/vue-i18n/dist/vue-i18n.cjs.js'
        )
      }
    }
  }
};


