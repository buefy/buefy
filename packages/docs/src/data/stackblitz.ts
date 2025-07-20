// 📄 index.html
export const INDEX_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="https://buefy.org/static/img/icons/safari-pinned-tab.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`

// 🧾 package.json
export const PACKAGE_JSON = JSON.stringify({
    name: 'vite-vue-buefy-starter',
    private: true,
    version: '1.0.0',
    type: 'module',
    scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview'
    },
    dependencies: {
        vue: '^3.5.17',
        buefy: '^1.0.1',
        '@stackblitz/sdk': '^1.11.0'
    },
    devDependencies: {
        vite: '^7.0.4',
        '@vitejs/plugin-vue': '^6.0.0'
    }
}, null, 2)

// ⚙️ vite.config.js
export const VITE_CONFIG = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})`

// 🚀 src/main.js
export const MAIN_JS = `import { createApp } from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import App from './App.vue';

const app = createApp(App);
app.use(Buefy);
app.mount('#app');`
