import esbuild from 'rollup-plugin-esbuild'
import node from '@rollup/plugin-node-resolve'
import cjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import vue from '@vitejs/plugin-vue'

import fs from 'node:fs'
import path from 'node:path'

import pack from '../../package.json' assert { type: 'json' }

const babelConfig = {
    exclude: 'node_modules/**',
    babelHelpers: 'runtime',
    babelrc: false,
    presets: [['@babel/preset-env', { modules: false }]],
    plugins: ['@babel/plugin-transform-runtime']
}

const bannerTxt = `/*! Buefy v${pack.version} | MIT License | github.com/buefy/buefy */`

const baseFolder = './src/'
const componentsFolder = 'components/'

const components = fs
    .readdirSync(baseFolder + componentsFolder)
    .filter((f) =>
        fs.statSync(path.join(baseFolder + componentsFolder, f)).isDirectory()
    )

const JS_COMPONENTS = [
    'autocomplete',
    'breadcrumb',
    'button',
    'carousel',
    'checkbox',
    'clockpicker',
    'collapse',
    'colorpicker',
    'datepicker',
    'datetimepicker',
    'dialog',
    'dropdown',
    'field',
    'icon',
    'image',
    'input',
    'loading',
    'menu',
    'message',
    'modal',
    'navbar',
    'notification',
    'numberinput',
    'pagination',
    'progress',
    'radio',
    'rate',
    'select',
    'sidebar',
    'skeleton',
    'slider',
    'snackbar',
    'steps',
    'switch',
    'table',
    'tabs',
    'tag',
    'taginput',
    'timepicker',
    'toast',
    'tooltip',
    'upload',
]

const entries = {
    index: './src/index.ts',
    helpers: './src/utils/helpers.ts',
    config: './src/utils/ConfigComponent.js',
    ...components.reduce((obj, name) => {
        const ext = JS_COMPONENTS.indexOf(name) !== -1 ? 'js' : 'ts'
        obj[name] = (baseFolder + componentsFolder + name + `/index.${ext}`)
        return obj
    }, {})
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const vuePluginConfig = {
    template: {
        isProduction: true,
        compilerOptions: {
            whitespace: 'condense'
        }
    }
}

const esbuildConfig = {
    sourceMap: false,
    minify: false,
    target: 'es2015'
}

export default () => {
    const mapComponent = (name) => {
        const ext = JS_COMPONENTS.indexOf(name) !== -1 ? 'js' : 'ts'
        return [
            {
                input: baseFolder + componentsFolder + `${name}/index.${ext}`,
                external: ['vue'],
                output: {
                    format: 'umd',
                    name: capitalize(name),
                    file: `dist/components/${name}/index.js`,
                    banner: bannerTxt,
                    exports: 'named',
                    globals: {
                        vue: 'Vue'
                    }
                },
                plugins: [
                    node({
                        extensions: ['.vue', '.js']
                    }),
                    esbuild(esbuildConfig),
                    vue(vuePluginConfig),
                    cjs()
                ]
            }
        ]
    }

    let config = [
        {
            input: entries,
            external: ['vue'],
            output: {
                format: 'esm',
                dir: 'dist/esm'
            },
            plugins: [
                node({
                    extensions: ['.vue', '.js']
                }),
                esbuild(esbuildConfig),
                vue(vuePluginConfig),
                cjs()
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
                esbuild(esbuildConfig),
                vue(vuePluginConfig),
                cjs()
            ]
        },
        {
            input: 'src/index.ts',
            external: ['vue'],
            output: {
                format: 'umd',
                name: capitalize('buefy'),
                file: 'dist/buefy.js',
                exports: 'named',
                banner: bannerTxt,
                globals: {
                    vue: 'Vue'
                }
            },
            plugins: [
                node({
                    extensions: ['.vue', '.js']
                }),
                esbuild(esbuildConfig),
                vue(vuePluginConfig),
                cjs()
            ]
        },
        {
            input: 'src/index.ts',
            external: ['vue'],
            output: {
                format: 'esm',
                file: 'dist/buefy.esm.js',
                banner: bannerTxt
            },
            plugins: [
                node({
                    extensions: ['.vue', '.js']
                }),
                esbuild(esbuildConfig),
                vue(vuePluginConfig),
                cjs()
            ]
        },
        // individual components
        ...components.map((f) => mapComponent(f)).reduce((r, a) => r.concat(a), [])
    ]

    if (process.env.MINIFY === 'true') {
        config = config.filter((c) => !!c.output.file)
        config.forEach((c) => {
            c.output.file = c.output.file.replace(/\.js/g, '.min.js')
            c.plugins.push(terser({
                format: {
                    comments: '/^!/'
                }
            }))
        })
    }
    return config
}
