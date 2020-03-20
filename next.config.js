const TerserPlugin = require('terser-webpack-plugin')
const withSourceMaps = require('@zeit/next-source-maps')

module.exports = withSourceMaps({
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimizer = [new TerserPlugin({
        parallel: true,
        sourceMap: true
      })]
    }

    return config
  }
})
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  cssModules: true
})
