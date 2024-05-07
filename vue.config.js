const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {
  ElementPlusResolver
} = require('unplugin-vue-components/resolvers')

module.exports = {
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    }

  },

  // 解决跨域问题 设置代理
  devServer: {
    https: false,
    hot: 'only',
    proxy: {
      '/api': {
        target: 'http://43.143.0.76:8889/api/private/v1/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // .全局使用scss变量
  css: {
    loaderOptions: {
      sass: {
        additionalData: // 8版本用prependData:
          `
        @import "@/styles/variables.scss";  // scss文件地址
        @import "@/styles/mixin.scss";     // scss文件地址
      `
      }
    }
  }

}
