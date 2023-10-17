import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // we need the Vue runtime including the template compiler
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
    extensions: ['.vue', '.js', '.json']
  }
})
