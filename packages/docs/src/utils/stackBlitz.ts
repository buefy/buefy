import type { Project } from '@stackblitz/sdk'
import {
    INDEX_HTML,
    PACKAGE_JSON,
    VITE_CONFIG,
    MAIN_JS
} from '../data/stackblitz'

export function createCustomVueProject(exampleCode: string, exampleTitle: string): Project {
    return {
        title: exampleTitle,
        description: 'Generated project with App.vue scaffolded programmatically',
        template: 'node',
        files: {
            'index.html': INDEX_HTML,
            'package.json': PACKAGE_JSON,
            'vite.config.js': VITE_CONFIG,
            'src/main.js': MAIN_JS,
            'src/App.vue': exampleCode
        },
        dependencies: {
            '@vitejs/plugin-vue': '^6.0.0'
        }
    }
}
