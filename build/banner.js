'use strict'
const pack = require('../package.json')

const bannerTxt = `/*! Buefy v${pack.version} | MIT License | github.com/buefy/buefy */\n`

process.stdout.write(bannerTxt)
process.stdin.pipe(process.stdout)
