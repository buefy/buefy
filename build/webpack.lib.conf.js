var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var fs = require('fs')
var config = require('../config')
var package = require('../package.json')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

function getFilename(ext, minimize) {
  return '[name]' + (minimize ? '.min' : '') + ext
}

module.exports = function(options) {

  if (options.components) {
    baseWebpackConfig.entry = {}
    var files = fs.readdirSync('./src/components/')
    files.forEach(component => {
      var entryKey = `components/${component}/${component}`
      var entryValue = `./src/components/${component}/index.js`
      baseWebpackConfig.entry[entryKey] = entryValue
    })
  } else {
    baseWebpackConfig.entry = {
      [config.lib.filename]: './src/index.js'
    }
  }

  var webpackConfig = merge(baseWebpackConfig, {
    module: {
      rules: utils.styleLoaders({
        sourceMap: config.lib.productionSourceMap,
        extract: true,
        minimize: options.minimize
      })
    },
    devtool: config.lib.productionSourceMap ? '#source-map' : false,
    externals: {
      vue: 'vue'
    },
    output: {
      path: config.lib.assetsRoot,
      filename: utils.assetsLibPath(getFilename('.js', options.minimize)),
      library: config.lib.name,
      libraryTarget: 'umd'
    },
    plugins: [
      // http://vuejs.github.io/vue-loader/en/workflow/production.html
      new webpack.DefinePlugin({
        'process.env': config.lib.env
      }),
      // extract css into its own file
      new ExtractTextPlugin({
        filename: utils.assetsLibPath(getFilename('.css', options.minimize))
      })
    ]
  })

  if (options.minimize) {
    webpackConfig.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: true
      })
    )
    webpackConfig.plugins.push(
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    )
  } else {
    webpackConfig.plugins.push(
      new webpack.BannerPlugin({
        banner: `/*! Buefy v${package.version} | MIT License | github.com/buefy/buefy */ `,
        raw: true,
        entryOnly: true
      })
    )
  }

  if (config.lib.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          config.lib.productionGzipExtensions.join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8
      })
    )
  }

  if (config.lib.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  }

  return webpackConfig
}
