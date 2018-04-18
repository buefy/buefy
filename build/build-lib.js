require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.lib.conf')

var spinner = ora('building for library...')
spinner.start()

rm(path.join(config.lib.assetsRoot, config.lib.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
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
      '  Tip: Now you are ready to publish your library to npm.\n' +
      '  Then users can import it as an es6 module: import {{camelcase name}} from \'{{ name }}\'\n'
    ))
  })
})