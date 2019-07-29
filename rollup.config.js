import vue from 'rollup-plugin-vue'
import replace from 'rollup-plugin-replace'
import node from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

import fs from 'fs'
import path from 'path'

import pack from './package.json'

const babelConfig = {
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false,
    presets: [['@babel/env', { useBuiltIns: 'entry', corejs: { version: 2 } }]],
    env: {
        es: {
            plugins: [
                ['@babel/plugin-transform-modules-commonjs', { loose: true }]
            ]
        },
        esm: {
            presets: [['@babel/env', { modules: false }]]
        }
    }
}

const bannerTxt = `/*! Buefy v${
    pack.version
} | MIT License | github.com/buefy/buefy */`

const baseFolder = './src/'
const componentsFolder = 'components/'

const components = fs
    .readdirSync(baseFolder + componentsFolder)
    .filter((f) =>
        fs.statSync(path.join(baseFolder + componentsFolder, f)).isDirectory()
    )

const entries = [
    './src/index.js',
    ...components.map(
        (name) => baseFolder + componentsFolder + `${name}`
    )
]

const config = [
    {
        input: entries,
        external: ['vue'],
        output: {
            format: 'esm',
            dir: `dist/esm`,
            banner: bannerTxt
        },
        plugins: [
            node({
                extensions: ['.vue', '.js']
            }),
            vue({
                template: {
                    isProduction: true
                }
            }),
            babel(babelConfig),
            cjs(),
            replace({ 'process.env.NODE_ENV': 'production' })
        ]
    },

    {
        input: entries,
        external: ['vue'],
        output: {
            format: 'cjs',
            dir: 'dist/cjs',
            exports: 'named'
        },
        plugins: [
            node({
                extensions: ['.vue', '.js']
            }),
            vue({
                template: {
                    isProduction: true
                }
            }),
            babel(babelConfig),
            cjs(),
            replace({ 'process.env.NODE_ENV': 'production' })
        ]
    },

    {
        input: 'src/index.js',
        external: ['vue'],
        output: {
            format: 'umd',
            name: 'buefy',
            file: 'dist/buefy.js',
            exports: 'named',
            banner: bannerTxt,
            globals: {
                vue: 'Vue'
            }
        },
        plugins: [
            replace({ 'process.env.NODE_ENV': 'production' }),
            node({
                extensions: ['.vue', '.js']
            }),
            cjs(),
            vue({
                template: {
                    isProduction: true
                }
            }),
            babel(babelConfig)
        ]
    }
]

export default () => {
    if (process.env.MINIFY === 'true') {
        config.forEach((c) => {
            if (c.output.file) {
                c.output.file = c.output.file.replace(/\.js/g, '.min.js')
            }
            if (c.output.dir) {
                c.output.dir = c.output.dir + '-min'
            }
            c.plugins.push(terser())
        })
    }
    return config
}
