'use strict'
const path = require('path')
const chalk = require('chalk')
const config = require('../config')
const pkg = require('../package.json')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.assetsLibPath = function (_path) {
  return path.posix.join(config.lib.assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: options.minimize,
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
          minimize: options.minimize
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return [MiniCssExtractPlugin.loader, 'vue-style-loader'].concat(loaders)
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

// Banner CLI
exports.bannerCLI = () => {
  let isProd = process.env.NODE_ENV === 'production'
  let _port = process.env.PORT || config.dev.port

  const names = `${chalk.hex('#7957d5').bold('Buefy')} v${pkg.version}`
  const url = `http://localhost:${_port}/`
  let _env = isProd ? 'production' : 'development'
  let rendering = isProd ? 'client-side' : 'server-side'
  let listening = isProd
    ? `${chalk.bold('Status: ')} ${chalk.bold.cyan('on building...')}`
    : `${chalk.bold('Listening: ')} ${chalk.underline.blue(url)}`

  const label = name => chalk.bold.cyan(`▸ ${name}: `)

  return `${names}\n
    ${label('Environment')} ${_env}
    ${label('Rendering')}   ${rendering}\n
    ${listening}`
}
