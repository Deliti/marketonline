const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  baseUrl: '/store/',
  pages: {
    shop: {
      entry: 'src/entershop/main.js',
      template: 'public/shop/index.html',
      filename: 'index.html'
    },
    seller: {
      entry: 'src/enterseller/main.js',
      template: 'public/seller/index.html',
      filename: 'seller/index.html'
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('$', resolve(__dirname, '../node_modules/jquery/src/jquery'),)
  },
  devServer: {
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://134.175.241.207:8080',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/mixin.scss";`
      }
    }
  }
}
