var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var fs = require('fs')
var config = require('../config')
var pack = require('../package.json')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeJsPlugin = require('optimize-js-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

function getFilename(ext, minimize) {
  return '[name]' + (minimize ? '.min' : '') + ext
}

module.exports = function(options) {

  if (options.components) {
    var root = './src/components'
    baseWebpackConfig.entry = {
      'components/index': [`${root}/index`]
    }
    var files = fs.readdirSync(root)
    files.forEach(component => {
      if (fs.statSync(path.join(root, component)).isDirectory()) {
        var entryKey = `components/${component}/index`
        var entryValue = `${root}/${component}/index`
        baseWebpackConfig.entry[entryKey] = [entryValue]
      }
    })
  } else {
    baseWebpackConfig.entry = {
      [config.lib.filename]: './src/index.js'
    }
  }

  var webpackConfig = merge(baseWebpackConfig, {
    module: {
      rules: utils.styleLoaders({
        sourceMap: false,
        extract: true,
        minimize: options.minimize
      })
    },
    externals: {
      vue: {
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue',
        root: 'Vue'
      }
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
      }),
      new webpack.BannerPlugin({
        banner: `/*! Buefy v${pack.version} | MIT License | github.com/buefy/buefy */ `,
        raw: true,
        entryOnly: true
      }),
      new webpack.optimize.ModuleConcatenationPlugin()
    ]
  })

  if (options.minimize) {
    webpackConfig.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: false
      })
    )
    webpackConfig.plugins.push(
      new OptimizeJsPlugin({
        sourceMap: false
      })
    )
    webpackConfig.plugins.push(
      new webpack.optimize.OccurrenceOrderPlugin()
    )
    webpackConfig.plugins.push(
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    )
  }

  if (options.components) {
    delete webpackConfig.output.library
    webpackConfig.output.filename = utils.assetsLibPath(getFilename('.js', false))
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
