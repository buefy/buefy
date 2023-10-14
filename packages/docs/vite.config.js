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
  },
  server: {
    fs: {
        // allows serving files from one level up to the docs folder.
        // - buefy-next/
        //   - docs/ <-- we are here
        //     - node_modules/ <-- we resolve packages here
        //     - src/
        //   - src/ <-- we want to import files form here but not allowed by
        //     default
        //   - node_modules/ <-- dependencies from buefy-next/src,
        //     e.g., @vue/shared, are resolved here; i.e., we have to run
        //     `npm install` in buefy-next/
        //
        // this workaround will be unnecessary when we introduce lerna
        // https://vitejs.dev/config/server-options.html#server-fs-allow
        allow: ['..']
    }
  }
})
