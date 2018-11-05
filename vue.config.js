const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  pages: {
    shop: {
      entry: 'src/entershop/main.js',
      template: 'public/shop/index.html',
      filename: 'shop/index.html'
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
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/mixin.scss";`
      }
    }
  }
}
