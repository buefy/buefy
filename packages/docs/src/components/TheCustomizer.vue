<template>
    <div class="customizer-wrapper">
        <button
            v-show="!footerVisible"
            class="customizer-toggle"
            :class="{ 'is-active': isOpen }"
            title="Customize theme"
            @click="isOpen = !isOpen"
        >
            <b-icon icon="palette" />
        </button>

        <Teleport to="body">
            <Transition name="customizer-slide">
                <div
                    v-if="isOpen"
                    class="customizer-panel"
                    role="dialog"
                    aria-label="Theme customizer"
                >
                    <div class="customizer-header">
                        <span class="customizer-title">Customize</span>
                        <button
                            class="customizer-close"
                            aria-label="Close customizer"
                            @click="isOpen = false"
                        >
                            <b-icon icon="close" />
                        </button>
                    </div>

                    <div class="customizer-body">
                        <div class="customizer-section">
                            <h4 class="customizer-section-title">
                                Colors
                            </h4>
                            <div
                                v-for="(label, key) in colorLabels"
                                :key="key"
                                class="customizer-color-row"
                            >
                                <label>{{ label }}</label>
                                <input
                                    type="color"
                                    :value="values[key as ColorKey]"
                                    @input="(e) => updateColor(
                                        key as ColorKey,
                                        (e.target as HTMLInputElement).value
                                    )"
                                >
                            </div>
                        </div>

                        <div class="customizer-section">
                            <h4 class="customizer-section-title">
                                Shape
                            </h4>
                            <div class="customizer-row">
                                <label>Border radius</label>
                                <span class="customizer-value">{{ values.radius }}px</span>
                            </div>
                            <input
                                v-model.number="values.radius"
                                type="range"
                                class="customizer-slider"
                                min="0"
                                max="20"
                                step="1"
                            >
                        </div>

                        <div class="customizer-section">
                            <h4 class="customizer-section-title">
                                Typography
                            </h4>
                            <div class="customizer-row">
                                <label>Base font size</label>
                                <span class="customizer-value">
                                    {{ values.sizeNormal.toFixed(2) }}rem
                                </span>
                            </div>
                            <input
                                v-model.number="values.sizeNormal"
                                type="range"
                                class="customizer-slider"
                                min="0.75"
                                max="1.25"
                                step="0.05"
                            >
                        </div>

                        <div class="customizer-section">
                            <h4 class="customizer-section-title">
                                Animations
                            </h4>
                            <div class="customizer-row">
                                <label>Speed slow</label>
                                <span class="customizer-value">{{ values.speedSlow }}ms</span>
                            </div>
                            <input
                                v-model.number="values.speedSlow"
                                type="range"
                                class="customizer-slider"
                                min="0"
                                max="500"
                                step="10"
                            >
                            <div class="customizer-row">
                                <label>Speed slower</label>
                                <span class="customizer-value">{{ values.speedSlower }}ms</span>
                            </div>
                            <input
                                v-model.number="values.speedSlower"
                                type="range"
                                class="customizer-slider"
                                min="0"
                                max="500"
                                step="10"
                            >
                        </div>

                        <div class="customizer-section">
                            <h4 class="customizer-section-title">
                                Component Variables
                            </h4>
                            <select
                                v-model="selectedComponent"
                                class="customizer-select"
                            >
                                <option value="">
                                    Select a component…
                                </option>
                                <option
                                    v-for="name in availableComponents"
                                    :key="name"
                                    :value="name"
                                >
                                    {{ formatComponentName(name) }}
                                </option>
                            </select>

                            <div
                                v-if="selectedComponent && componentVarList.length"
                                class="customizer-var-list"
                            >
                                <div
                                    v-for="entry in componentVarList"
                                    :key="extractVarName(entry.css)"
                                    class="customizer-var-entry"
                                >
                                    <div class="customizer-var-meta">
                                        <code class="customizer-var-name">
                                            {{ stripBulmaPrefix(extractVarName(entry.css)) }}
                                        </code>
                                        <span class="customizer-var-desc">
                                            {{ entry.description }}
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        class="customizer-var-input"
                                        :placeholder="extractDefault(entry.default)"
                                        :value="getCompVarValue(
                                            selectedComponent,
                                            extractVarName(entry.css)
                                        )"
                                        @change="(e) => setCompVar(
                                            selectedComponent,
                                            extractVarName(entry.css),
                                            (e.target as HTMLInputElement).value
                                        )"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="customizer-footer">
                        <button class="button is-light" @click="reset">
                            Reset
                        </button>
                        <button
                            class="button"
                            :class="copied ? 'is-success' : 'is-primary'"
                            @click="copyCss"
                        >
                            {{ copied ? 'Copied!' : 'Copy CSS' }}
                        </button>
                    </div>
                </div>
            </Transition>

            <Transition name="customizer-backdrop-fade">
                <div
                    v-if="isOpen"
                    class="customizer-backdrop"
                    @click="isOpen = false"
                />
            </Transition>
        </Teleport>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type ColorKey = 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger'

interface CustomizerValues {
    primary: string
    link: string
    info: string
    success: string
    warning: string
    danger: string
    radius: number
    sizeNormal: number
    speedSlow: number
    speedSlower: number
}

interface VarEntry {
    sass: string
    css?: string
    description: string
    default: string
}

const COLOR_LABELS: Record<ColorKey, string> = {
    primary: 'Primary',
    link: 'Link',
    info: 'Info',
    success: 'Success',
    warning: 'Warning',
    danger: 'Danger'
}

const COLOR_KEYS = Object.keys(COLOR_LABELS) as ColorKey[]

const DEFAULTS: CustomizerValues = {
    primary: '#7957d5',
    link: '#363636',
    info: '#3e8ed0',
    success: '#48c78e',
    warning: '#ffe08a',
    danger: '#f14668',
    radius: 4,
    sizeNormal: 1,
    speedSlow: 150,
    speedSlower: 250
}

const STORAGE_KEY = 'buefy-customizer'

// CSS selector where each component registers its CSS variables via cv.register-vars().
// Derived from SCSS: .#{iv.$class-prefix}{name} with empty Bulma $class-prefix.
const COMPONENT_SELECTORS: Record<string, string> = {
    autocomplete: '.autocomplete',
    breadcrumb: '.breadcrumb',
    carousel: '.carousel',
    checkbox: '.b-checkbox',
    clockpicker: '.b-clockpicker',
    colorpicker: '.colorpicker',
    datepicker: '.datepicker',
    dialog: '.dialog',
    dropdown: '.dropdown',
    field: '.field',
    icon: '.icon',
    image: '.b-image-wrapper',
    loading: '.loading-overlay',
    menu: '.menu',
    message: '.message',
    modal: '.modal',
    navbar: '.navbar',
    notification: '.notification',
    pagination: '.pagination',
    progress: '.progress-wrapper',
    radio: '.b-radio',
    rate: '.rate',
    select: '.select',
    sidebar: '.b-sidebar',
    skeleton: '.b-skeleton',
    slider: '.b-slider',
    snackbar: '.notices',
    steps: '.b-steps',
    switch: '.switch',
    table: '.b-table',
    tabs: '.b-tabs',
    tag: '.tag',
    taginput: '.taginput',
    timepicker: '.timepicker',
    toast: '.notices',
    tooltip: '.b-tooltip',
    upload: '.upload'
}

// Load all docs variable files at build time via Vite glob import.
const varModules = import.meta.glob<{ default: VarEntry[] }>(
    '../pages/components/*/variables/*.ts',
    { eager: true }
)

// Build map of { componentName → VarEntry[] } for components with at least one CSS var.
const COMPONENT_VAR_MAP: Record<string, VarEntry[]> = {}
for (const [path, mod] of Object.entries(varModules)) {
    const match = path.match(/components\/(\w+)\/variables/)
    if (!match) continue
    const entries = (mod.default || []).filter((e: VarEntry) => e.css)
    if (entries.length > 0) COMPONENT_VAR_MAP[match[1]] = entries
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const lf = (max + min) / 2
    let h = 0
    let s = 0
    if (max !== min) {
        const d = max - min
        s = lf > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
            case g: h = ((b - r) / d + 2) / 6; break
            case b: h = ((r - g) / d + 4) / 6; break
        }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(lf * 100) }
}

function stripHtml(html: string): string {
    return html.replace(/<[^>]+>/g, '').trim()
}

export default defineComponent({
    name: 'TheCustomizer',
    data() {
        return {
            isOpen: false,
            copied: false,
            footerVisible: false,
            footerObserver: null as IntersectionObserver | null,
            colorLabels: COLOR_LABELS,
            values: { ...DEFAULTS } as CustomizerValues,
            selectedComponent: '',
            componentVarOverrides: {} as Record<string, Record<string, string>>
        }
    },
    computed: {
        availableComponents(): string[] {
            return Object.keys(COMPONENT_VAR_MAP).sort()
        },
        componentVarList(): VarEntry[] {
            return COMPONENT_VAR_MAP[this.selectedComponent] || []
        }
    },
    watch: {
        values: {
            handler(vals: CustomizerValues) {
                this.applyGlobalVars(vals)
                this.saveToStorage()
            },
            deep: true
        },
        $route(to: { path: string }) {
            this.syncComponentFromRoute(to.path)
        }
    },
    methods: {
        updateColor(key: ColorKey, hex: string) {
            this.values[key] = hex
        },

        // Only sets an inline CSS property when the value differs from the default.
        // Removing it lets Bulma's .theme-dark / .theme-light rules take effect freely.
        applyGlobalVars(vals: CustomizerValues) {
            const el = document.documentElement
            for (const colorKey of COLOR_KEYS) {
                if (vals[colorKey] !== DEFAULTS[colorKey]) {
                    const { h, s, l } = hexToHsl(vals[colorKey])
                    el.style.setProperty(`--bulma-${colorKey}-h`, `${h}deg`)
                    el.style.setProperty(`--bulma-${colorKey}-s`, `${s}%`)
                    el.style.setProperty(`--bulma-${colorKey}-l`, `${l}%`)
                } else {
                    el.style.removeProperty(`--bulma-${colorKey}-h`)
                    el.style.removeProperty(`--bulma-${colorKey}-s`)
                    el.style.removeProperty(`--bulma-${colorKey}-l`)
                }
            }
            vals.radius !== DEFAULTS.radius
                ? el.style.setProperty('--bulma-radius', `${vals.radius}px`)
                : el.style.removeProperty('--bulma-radius')
            vals.sizeNormal !== DEFAULTS.sizeNormal
                ? el.style.setProperty('--bulma-size-normal', `${vals.sizeNormal}rem`)
                : el.style.removeProperty('--bulma-size-normal')
            vals.speedSlow !== DEFAULTS.speedSlow
                ? el.style.setProperty('--bulma-speed-slow', `${vals.speedSlow}ms`)
                : el.style.removeProperty('--bulma-speed-slow')
            vals.speedSlower !== DEFAULTS.speedSlower
                ? el.style.setProperty('--bulma-speed-slower', `${vals.speedSlower}ms`)
                : el.style.removeProperty('--bulma-speed-slower')
        },

        removeGlobalVars() {
            const el = document.documentElement
            for (const colorKey of COLOR_KEYS) {
                el.style.removeProperty(`--bulma-${colorKey}-h`)
                el.style.removeProperty(`--bulma-${colorKey}-s`)
                el.style.removeProperty(`--bulma-${colorKey}-l`)
            }
            el.style.removeProperty('--bulma-radius')
            el.style.removeProperty('--bulma-size-normal')
            el.style.removeProperty('--bulma-speed-slow')
            el.style.removeProperty('--bulma-speed-slower')
        },

        getCompVarValue(comp: string, varName: string): string {
            return this.componentVarOverrides[comp]?.[varName] || ''
        },

        setCompVar(comp: string, varName: string, rawValue: string) {
            const value = rawValue.trim()
            // Build a fresh copy to ensure Vue reactivity picks up the change
            const newOverrides: Record<string, Record<string, string>> = {}
            for (const [k, v] of Object.entries(this.componentVarOverrides)) {
                newOverrides[k] = { ...v }
            }
            if (!newOverrides[comp]) newOverrides[comp] = {}
            if (value) {
                newOverrides[comp][varName] = value
            } else {
                delete newOverrides[comp][varName]
                if (Object.keys(newOverrides[comp]).length === 0) {
                    delete newOverrides[comp]
                }
            }
            this.componentVarOverrides = newOverrides
            this.updateStyleTag()
            this.saveToStorage()
        },

        // Injects/updates a <style> tag targeting each component's own selector.
        // Appended to <head> so it comes after Buefy's compiled CSS; same-specificity
        // rules win by source order, no !important needed.
        updateStyleTag() {
            let styleEl = document.getElementById('buefy-customizer-styles') as HTMLStyleElement | null
            const css = this.buildStyleContent()
            if (!css) {
                styleEl?.remove()
                return
            }
            if (!styleEl) {
                styleEl = document.createElement('style')
                styleEl.id = 'buefy-customizer-styles'
                document.head.appendChild(styleEl)
            }
            styleEl.textContent = css
        },

        buildStyleContent(): string {
            const bySelector: Record<string, string[]> = {}
            for (const [comp, vars] of Object.entries(this.componentVarOverrides)) {
                const entries = Object.entries(vars).filter(([, v]) => v)
                if (!entries.length) continue
                const selector = COMPONENT_SELECTORS[comp] || `.b-${comp}`
                if (!bySelector[selector]) bySelector[selector] = []
                for (const [name, val] of entries) {
                    bySelector[selector].push(`  ${name}: ${val};`)
                }
            }
            return Object.entries(bySelector)
                .map(([sel, decls]) => `${sel} {\n${decls.join('\n')}\n}`)
                .join('\n\n')
        },

        reset() {
            Object.assign(this.values, DEFAULTS)
            this.componentVarOverrides = {}
            this.removeGlobalVars()
            this.updateStyleTag()
            localStorage.removeItem(STORAGE_KEY)
        },

        copyCss() {
            const vals = this.values
            const rootLines: string[] = []
            for (const colorKey of COLOR_KEYS) {
                if (vals[colorKey] !== DEFAULTS[colorKey]) {
                    const { h, s, l } = hexToHsl(vals[colorKey])
                    rootLines.push(`  --bulma-${colorKey}-h: ${h}deg;`)
                    rootLines.push(`  --bulma-${colorKey}-s: ${s}%;`)
                    rootLines.push(`  --bulma-${colorKey}-l: ${l}%;`)
                }
            }
            if (vals.radius !== DEFAULTS.radius) rootLines.push(`  --bulma-radius: ${vals.radius}px;`)
            if (vals.sizeNormal !== DEFAULTS.sizeNormal) rootLines.push(`  --bulma-size-normal: ${vals.sizeNormal}rem;`)
            if (vals.speedSlow !== DEFAULTS.speedSlow) rootLines.push(`  --bulma-speed-slow: ${vals.speedSlow}ms;`)
            if (vals.speedSlower !== DEFAULTS.speedSlower) rootLines.push(`  --bulma-speed-slower: ${vals.speedSlower}ms;`)

            const parts: string[] = []
            if (rootLines.length) parts.push(`:root {\n${rootLines.join('\n')}\n}`)
            const compCss = this.buildStyleContent()
            if (compCss) parts.push(compCss)
            if (!parts.length) parts.push('/* No customizations applied */')

            navigator.clipboard.writeText(parts.join('\n\n')).then(() => {
                this.copied = true
                setTimeout(() => { this.copied = false }, 2000)
            })
        },

        saveToStorage() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                values: this.values,
                componentVarOverrides: this.componentVarOverrides
            }))
        },

        extractVarName(html: string | undefined): string {
            return html ? stripHtml(html) : ''
        },

        stripBulmaPrefix(varName: string): string {
            return varName.replace(/^--bulma-/, '')
        },

        extractDefault(html: string): string {
            return stripHtml(html)
        },

        syncComponentFromRoute(path: string) {
            const match = path.match(/\/documentation\/(\w+)$/)
            if (match) {
                const name = match[1]
                if (this.availableComponents.includes(name)) {
                    this.selectedComponent = name
                }
            }
        },

        formatComponentName(name: string): string {
            const label = name.charAt(0).toUpperCase() + name.slice(1)
            return Object.keys(this.componentVarOverrides[name] || {}).length
                ? `${label} ●`
                : label
        }
    },
    mounted() {
        const footer = document.querySelector('footer.footer')
        if (footer) {
            this.footerObserver = new IntersectionObserver(([entry]) => {
                this.footerVisible = entry.isIntersecting
                if (entry.isIntersecting) this.isOpen = false
            })
            this.footerObserver.observe(footer)
        }

        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                if (parsed.values) {
                    Object.assign(this.values, parsed.values)
                    if (parsed.componentVarOverrides) {
                        this.componentVarOverrides = parsed.componentVarOverrides
                    }
                } else {
                    Object.assign(this.values, parsed)
                }
                this.applyGlobalVars(this.values)
                this.updateStyleTag()
            } catch {
                // ignore corrupted storage
            }
        }
        this.syncComponentFromRoute(this.$route.path)
    },
    beforeUnmount() {
        this.footerObserver?.disconnect()
        const el = document.getElementById('buefy-customizer-styles')
        if (el) el.remove()
    }
})
</script>
