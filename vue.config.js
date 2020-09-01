module.exports = {
  devServer: {
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: 'https://element-interface.herokuapp.com/api',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
