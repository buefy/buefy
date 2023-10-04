'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const utils = require('./utils')
const webpackConfig = require('./webpack.prod.conf')

console.log(`    ${utils.bannerCLI()}`)

rm(config.build.assetsRoot, err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
