import * as fs from 'node:fs'
import * as path from 'node:path'
import * as util from 'node:util'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import commonjs from 'vite-plugin-commonjs'

const readFile = util.promisify(fs.readFile)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      // replaces `@ntohq/buefy-next` with the path to the source code
      // // in development to ease debugging
      name: 'link-buefy-next-src',
      apply: 'serve', // development only
      resolveId: {
        order: 'pre', // otherwise, IDs become "plugin-vue:export-helper"
        handler(id) {
          if (id === '@ntohq/buefy-next') {
            return path.resolve(__dirname, '../buefy-next/src/index.ts')
          }
        },
      },
    },
  ],
  resolve: {
    alias: {
      // we need the Vue runtime including the template compiler
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
    extensions: ['.vue', '.js', '.ts', '.json']
  }
})
