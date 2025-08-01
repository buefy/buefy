import type { Project } from '@stackblitz/sdk'
import indexHtml from '../templates/stackblitz/index.html?raw'
import packageJson from '../templates/stackblitz/package.json?raw'
import viteConfig from '../templates/stackblitz/vite.config.ts?raw'
import mainJs from '../templates/stackblitz/main.ts?raw'

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
            'src/App.vue': exampleCode
        }
    }
}
