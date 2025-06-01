import { fileURLToPath, URL } from 'node:url'

import { configDefaults, defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@utils': fileURLToPath(new URL('./src/utils', import.meta.url))
        }
    },
    test: {
        include: ['src/**/*.spec.ts'],
        exclude: [
            ...configDefaults.exclude,
            'src/types/*'
        ],
        environment: 'jsdom'
    }
})
