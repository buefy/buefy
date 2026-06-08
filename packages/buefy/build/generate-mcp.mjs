import * as fs from 'node:fs'
import * as path from 'node:path'
import * as vm from 'node:vm'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkgBuefyDir = path.resolve(__dirname, '..')
const repoRoot = path.resolve(pkgBuefyDir, '../..')
const docsDir = path.resolve(repoRoot, 'packages/docs')
const componentsDir = path.join(docsDir, 'src/pages/components')

function stripHtml(str) {
    if (typeof str !== 'string') return str
    return str
        .replace(/<[^>]+>/g, '')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim()
}

function componentTag(title) {
    return 'B' + title.replace(/\s+/g, '')
}

function parseApiFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const src = content.replace(/^export default\s+/, '').trim()
    try {
        return vm.runInNewContext(src, {})
    } catch (e) {
        console.warn(`  Warning: could not parse ${filePath}: ${e.message}`)
        return []
    }
}

function renderSection(section, lines) {
    const { props, events, slots, methods } = section

    if (props && props.length > 0) {
        lines.push('#### Props')
        lines.push('| Prop | Type | Default | Description |')
        lines.push('|------|------|---------|-------------|')
        for (const p of props) {
            const col = [
                stripHtml(p.name),
                stripHtml(p.type || '—'),
                stripHtml(p.default || '—'),
                stripHtml(p.description || '—'),
            ]
            lines.push(`| ${col.join(' | ')} |`)
        }
        lines.push('')
    }

    if (events && events.length > 0) {
        lines.push('#### Events')
        lines.push('| Event | Parameters | Description |')
        lines.push('|-------|-----------|-------------|')
        for (const e of events) {
            const col = [
                stripHtml(e.name),
                stripHtml(e.parameters || '—'),
                stripHtml(e.description || '—'),
            ]
            lines.push(`| ${col.join(' | ')} |`)
        }
        lines.push('')
    }

    if (slots && slots.length > 0) {
        lines.push('#### Slots')
        lines.push('| Slot | Props | Description |')
        lines.push('|------|-------|-------------|')
        for (const s of slots) {
            const col = [
                stripHtml(s.name),
                stripHtml(s.props || '—'),
                stripHtml(s.description || '—'),
            ]
            lines.push(`| ${col.join(' | ')} |`)
        }
        lines.push('')
    }

    if (methods && methods.length > 0) {
        lines.push('#### Methods')
        lines.push('| Method | Parameters | Return | Description |')
        lines.push('|--------|-----------|--------|-------------|')
        for (const m of methods) {
            const col = [
                stripHtml(m.name),
                stripHtml(m.parameters || '—'),
                stripHtml(m.return || '—'),
                stripHtml(m.description || '—'),
            ]
            lines.push(`| ${col.join(' | ')} |`)
        }
        lines.push('')
    }
}

const routes = JSON.parse(fs.readFileSync(path.join(docsDir, 'src/data/routes.json'), 'utf-8'))
const { version } = JSON.parse(fs.readFileSync(path.join(pkgBuefyDir, 'package.json'), 'utf-8'))

const componentNames = fs.readdirSync(componentsDir)
    .filter(n => fs.statSync(path.join(componentsDir, n)).isDirectory())
    .sort()

const lines = []

lines.push('---')
lines.push('description: Buefy 3 — Vue 3 UI components based on Bulma CSS')
lines.push(`version: ${version}`)
lines.push('---')
lines.push('')
lines.push('# Buefy 3')
lines.push('Buefy is a lightweight library of responsive UI components for Vue.js 3 based on the Bulma CSS framework. All components are registered globally with the `B` prefix (e.g. `<BButton>`, `<BInput>`).')
lines.push('')
lines.push('- [Documentation](https://buefy.org)')
lines.push('- [GitHub](https://github.com/buefy/buefy)')
lines.push('')
lines.push('## Installation')
lines.push('```sh')
lines.push('npm install buefy')
lines.push('```')
lines.push('')
lines.push('Register the full library:')
lines.push('```javascript')
lines.push("import { createApp } from 'vue'")
lines.push("import Buefy from 'buefy'")
lines.push("import 'buefy/dist/buefy.css'")
lines.push('')
lines.push('const app = createApp(App)')
lines.push('app.use(Buefy)')
lines.push("app.mount('#app')")
lines.push('```')
lines.push('')
lines.push('Or import individual components:')
lines.push('```javascript')
lines.push("import { BButton, BInput } from 'buefy'")
lines.push('```')
lines.push('')
lines.push('## Usage')
lines.push('1. All components use the `B` prefix: `<BButton>`, `<BInput>`, `<BModal>`, etc.')
lines.push('2. Color/type values follow Bulma class names: `is-primary`, `is-success`, `is-warning`, `is-danger`, `is-info`, `is-dark`, `is-light`')
lines.push('3. Size values: `is-small` (default), `is-medium`, `is-large`')
lines.push('4. Icons use Material Design Icons (mdi) by default; Font Awesome packs (`fa`, `fas`, `far`, `fad`, `fal`) are also supported')
lines.push('5. Wrap form inputs in `<BField>` to get labels, messages, grouped layouts, and validation styling')
lines.push('')
lines.push('## Components')
lines.push('')

for (const name of componentNames) {
    const apiFile = path.join(componentsDir, name, 'api', `${name}.ts`)
    if (!fs.existsSync(apiFile)) continue

    const apiData = parseApiFile(apiFile)
    if (!apiData || apiData.length === 0) continue

    const route = routes[`documentation/${name}`] || {}
    const subtitle = route.subtitle ? stripHtml(route.subtitle) : ''

    const isMultiSection = apiData.length > 1

    if (isMultiSection) {
        // Top-level heading for the component group
        const groupTitle = route.title || apiData[0].title || name
        lines.push(`### ${componentTag(groupTitle)}`)
        if (subtitle) lines.push(subtitle)
        lines.push('')

        for (const section of apiData) {
            const sectionTitle = section.title || groupTitle
            lines.push(`#### ${componentTag(sectionTitle)}`)
            lines.push('')
            renderSection(section, lines)
        }
    } else {
        const section = apiData[0]
        const title = route.title || section.title || name
        lines.push(`### ${componentTag(title)}`)
        if (subtitle) lines.push(subtitle)
        lines.push('')
        renderSection(section, lines)
    }
}

const output = lines.join('\n')
const outputPath = path.join(repoRoot, 'mcp.txt')
fs.writeFileSync(outputPath, output, 'utf-8')
console.log(`Generated mcp.txt (${output.length} bytes) → ${outputPath}`)
