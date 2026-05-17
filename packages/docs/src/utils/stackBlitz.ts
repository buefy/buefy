import type { Project } from '@stackblitz/sdk'
import indexHtml from '../templates/stackblitz/index.html?raw'
import packageJson from '../templates/stackblitz/package.json?raw'
import viteConfig from '../templates/stackblitz/vite.config.ts?raw'
import mainJs from '../templates/stackblitz/main.ts?raw'
import buefySass from '../templates/stackblitz/buefy.scss?raw'

export function createCustomNuxtProject(exampleTitle: string): Project {
    const appVue = `<script setup lang="ts">
const count = ref(0)
</script>

<template>
    <section class="section">
        <div class="container">
            <h1 class="title">Buefy + Nuxt 3</h1>
            <b-field label="Your name">
                <b-input placeholder="e.g. Alice" />
            </b-field>
            <b-button type="is-primary" @click="count++">
                Clicked {{ count }} time{{ count === 1 ? '' : 's' }}
            </b-button>
        </div>
    </section>
</template>`

    return {
        title: exampleTitle,
        description: 'Buefy + Nuxt 3 example',
        template: 'node',
        files: {
            'package.json': JSON.stringify({
                name: 'buefy-nuxt3',
                private: true,
                type: 'module',
                scripts: {
                    dev: 'nuxt dev',
                    build: 'nuxt build',
                    generate: 'nuxt generate',
                    preview: 'nuxt preview'
                },
                dependencies: {
                    nuxt: '^3.13.0',
                    buefy: '^3.0.7',
                    '@mdi/font': '^7.4.47',
                    '@fortawesome/fontawesome-free': '^6.7.2'
                }
            }, null, 2),
            'nuxt.config.ts': [
                'export default defineNuxtConfig({',
                '    css: [',
                "        '@mdi/font/css/materialdesignicons.min.css',",
                "        '@fortawesome/fontawesome-free/css/all.css'",
                '    ],',
                "    compatibilityDate: '2025-01-01'",
                '})'
            ].join('\n'),
            'app.vue': appVue,
            'plugins/buefy.ts': [
                "import Buefy from 'buefy'",
                "import 'buefy/dist/css/buefy.css'",
                '',
                'export default defineNuxtPlugin((nuxtApp) => {',
                '    nuxtApp.vueApp.use(Buefy)',
                '})'
            ].join('\n'),
            '.npmrc': 'shamefully-hoist=true\n'
        }
    }
}

export function createCustomVueProject(exampleCode: string, exampleTitle: string): Project {
    return {
        title: exampleTitle,
        description: 'Generated project with App.vue scaffolded programmatically',
        template: 'node',
        files: {
            'index.html': indexHtml,
            'package.json': packageJson,
            'vite.config.js': viteConfig,
            'src/main.js': mainJs,
            'src/App.vue': exampleCode,
            'src/styles/buefy.scss': buefySass
        }
    }
}
