import * as fs from "node:fs";
import * as path from "node:path";
import * as util from "node:util";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import commonjs from "vite-plugin-commonjs";

const readFile = util.promisify(fs.readFile);

// Plugin to copy font files to public directory
const copyFontsPlugin = () => ({
  name: 'copy-fonts',
  configureServer() {
    // Copy FontAwesome fonts from root node_modules
    const faSrc = path.resolve(__dirname, '../../node_modules/@fortawesome/fontawesome-free/webfonts');
    const faDest = path.resolve(__dirname, 'public/webfonts');
    
    // Copy files if source directories exist
    if (fs.existsSync(faSrc)) {
      if (!fs.existsSync(faDest)) fs.mkdirSync(faDest, { recursive: true });
      const faFiles = fs.readdirSync(faSrc).filter(file => /\.(woff2?|eot|ttf)$/.test(file));
      faFiles.forEach(file => {
        const srcFile = path.join(faSrc, file);
        const destFile = path.join(faDest, file);
        if (!fs.existsSync(destFile) || fs.statSync(srcFile).mtime > fs.statSync(destFile).mtime) {
          fs.copyFileSync(srcFile, destFile);
        }
      });
    }
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    copyFontsPlugin(),
    {
      // replaces `@ntohq/buefy-next` with the path to the source code
      // // in development to ease debugging
      name: 'link-buefy-src',
      apply: 'serve', // development only
      resolveId: {
        order: 'pre', // otherwise, IDs become "plugin-vue:export-helper"
        handler(id) {
          if (id === '@buefy/buefy') {
            return path.resolve(__dirname, '../buefy/src/index.ts')
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
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Suppress deprecation warnings from external libraries
        silenceDeprecations: ['import', 'global-builtin']
      }
    }
  },
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.eot', '**/*.ttf'],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep font files in their expected directories
          if (assetInfo.name && /\.(woff|woff2|eot|ttf)$/.test(assetInfo.name)) {
            if (assetInfo.name.includes('materialdesign')) {
              return 'fonts/[name][extname]';
            }
            if (assetInfo.name.includes('fa-')) {
              return 'webfonts/[name][extname]';
            }
            return 'fonts/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
})
