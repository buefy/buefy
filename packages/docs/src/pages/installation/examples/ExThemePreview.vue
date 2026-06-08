<template>
    <div class="theme-preview">
        <div class="columns is-desktop">
            <!-- Controls column -->
            <div class="column is-narrow">
                <div class="box controls-box">
                    <h4 class="title is-6 mb-4">Theme Controls</h4>

                    <div class="field">
                        <label class="label is-small">
                            Primary Color
                            <span class="color-swatch" :style="{ background: primaryHex }" />
                        </label>
                        <div class="control">
                            <input class="color-input" type="color" v-model="primaryHex" />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-small">
                            Success Color
                            <span class="color-swatch" :style="{ background: successHex }" />
                        </label>
                        <div class="control">
                            <input class="color-input" type="color" v-model="successHex" />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-small">
                            Danger Color
                            <span class="color-swatch" :style="{ background: dangerHex }" />
                        </label>
                        <div class="control">
                            <input class="color-input" type="color" v-model="dangerHex" />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-small">
                            Warning Color
                            <span class="color-swatch" :style="{ background: warningHex }" />
                        </label>
                        <div class="control">
                            <input class="color-input" type="color" v-model="warningHex" />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-small">Border Radius: {{ radius }}px</label>
                        <div class="control">
                            <input
                                type="range"
                                v-model.number="radius"
                                min="0"
                                max="16"
                                step="1"
                                class="radius-slider"
                            />
                        </div>
                    </div>

                    <b-button size="is-small" @click="resetDefaults">Reset defaults</b-button>
                </div>
            </div>

            <!-- Preview column -->
            <div class="column">
                <div class="box preview-box" :style="previewVars">
                    <h4 class="title is-6 mb-4">Live Preview</h4>

                    <div class="preview-row">
                        <b-button type="is-primary">Primary</b-button>
                        <b-button type="is-success">Success</b-button>
                        <b-button type="is-danger">Danger</b-button>
                        <b-button type="is-warning">Warning</b-button>
                        <b-button>Default</b-button>
                    </div>

                    <div class="preview-row">
                        <b-button type="is-primary" outlined>Outlined</b-button>
                        <b-button type="is-primary" rounded>Rounded</b-button>
                        <b-button type="is-primary" loading>Loading</b-button>
                    </div>

                    <div class="preview-row">
                        <b-input placeholder="Text input" />
                    </div>

                    <div class="preview-row">
                        <b-tag type="is-primary">Primary tag</b-tag>
                        <b-tag type="is-success">Success tag</b-tag>
                        <b-tag type="is-danger">Danger tag</b-tag>
                        <b-tag type="is-warning">Warning tag</b-tag>
                    </div>

                    <div class="preview-row">
                        <b-progress type="is-primary" :value="65" :max="100" show-value />
                    </div>

                    <div class="preview-row">
                        <b-progress type="is-success" :value="40" :max="100" show-value />
                    </div>
                </div>
            </div>
        </div>

        <!-- Generated CSS -->
        <div class="mt-4">
            <p class="mb-2">
                <strong>Generated CSS</strong> — paste this into your stylesheet:
            </p>
            <CodeView :code="generatedCss" lang="css" expanded />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BButton, BInput, BTag, BProgress } from 'buefy'
import CodeView from '@/components/CodeView.vue'

function hexToHsl(hex: string): { h: number; s: number; l: number } {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const l = (max + min) / 2
    let h = 0
    let s = 0

    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
            case g: h = ((b - r) / d + 2) / 6; break
            case b: h = ((r - g) / d + 4) / 6; break
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    }
}

const DEFAULTS = {
    primaryHex: '#00d1b2',
    successHex: '#48c78e',
    dangerHex:  '#f14668',
    warningHex: '#ffe08a',
    radius: 4,
}

export default defineComponent({
    components: { BButton, BInput, BTag, BProgress, CodeView },
    data() {
        return {
            primaryHex: DEFAULTS.primaryHex,
            successHex: DEFAULTS.successHex,
            dangerHex:  DEFAULTS.dangerHex,
            warningHex: DEFAULTS.warningHex,
            radius:     DEFAULTS.radius,
        }
    },
    computed: {
        previewVars(): Record<string, string> {
            const primary = hexToHsl(this.primaryHex)
            const success = hexToHsl(this.successHex)
            const danger  = hexToHsl(this.dangerHex)
            const warning = hexToHsl(this.warningHex)
            return {
                '--bulma-primary-h': `${primary.h}deg`,
                '--bulma-primary-s': `${primary.s}%`,
                '--bulma-primary-l': `${primary.l}%`,
                '--bulma-success-h': `${success.h}deg`,
                '--bulma-success-s': `${success.s}%`,
                '--bulma-success-l': `${success.l}%`,
                '--bulma-danger-h':  `${danger.h}deg`,
                '--bulma-danger-s':  `${danger.s}%`,
                '--bulma-danger-l':  `${danger.l}%`,
                '--bulma-warning-h': `${warning.h}deg`,
                '--bulma-warning-s': `${warning.s}%`,
                '--bulma-warning-l': `${warning.l}%`,
                '--bulma-radius-small': `${Math.max(0, this.radius - 2)}px`,
                '--bulma-radius':       `${this.radius}px`,
                '--bulma-radius-large': `${this.radius + 2}px`,
            }
        },
        generatedCss(): string {
            const p = hexToHsl(this.primaryHex)
            const s = hexToHsl(this.successHex)
            const d = hexToHsl(this.dangerHex)
            const w = hexToHsl(this.warningHex)
            const r = this.radius

            return `:root {
  --bulma-primary-h: ${p.h}deg;
  --bulma-primary-s: ${p.s}%;
  --bulma-primary-l: ${p.l}%;

  --bulma-success-h: ${s.h}deg;
  --bulma-success-s: ${s.s}%;
  --bulma-success-l: ${s.l}%;

  --bulma-danger-h: ${d.h}deg;
  --bulma-danger-s: ${d.s}%;
  --bulma-danger-l: ${d.l}%;

  --bulma-warning-h: ${w.h}deg;
  --bulma-warning-s: ${w.s}%;
  --bulma-warning-l: ${w.l}%;

  --bulma-radius-small: ${Math.max(0, r - 2)}px;
  --bulma-radius:       ${r}px;
  --bulma-radius-large: ${r + 2}px;
}`
        },
    },
    methods: {
        resetDefaults() {
            this.primaryHex = DEFAULTS.primaryHex
            this.successHex = DEFAULTS.successHex
            this.dangerHex  = DEFAULTS.dangerHex
            this.warningHex = DEFAULTS.warningHex
            this.radius     = DEFAULTS.radius
        },
    },
})
</script>

<style scoped>
.theme-preview {
    width: 100%;
}

.controls-box {
    min-width: 220px;
}

.preview-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    align-items: center;
}

.preview-row:last-child {
    margin-bottom: 0;
}

.color-input {
    width: 48px;
    height: 32px;
    padding: 2px;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    cursor: pointer;
    background: none;
}

.color-swatch {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.15);
    vertical-align: middle;
    margin-left: 4px;
}

.radius-slider {
    width: 100%;
    cursor: pointer;
}
</style>
