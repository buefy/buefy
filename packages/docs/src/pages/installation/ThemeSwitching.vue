<template>
    <div>
        <div class="content">
            <p>
                Buefy's theme system uses a <code>data-theme</code> attribute on <code>&lt;html&gt;</code>
                combined with CSS custom properties to switch between light and dark modes.
                A small composable handles persistence in <code>localStorage</code> and reads
                the user's OS preference on first visit.
            </p>
        </div>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">1</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Create the composable</h3>
                <p class="content">
                    Add <code>useTheme.ts</code> anywhere in your project (e.g.
                    <code>composables/useTheme.ts</code>). The module-level ref ensures every
                    component that calls <code>useTheme()</code> shares the same reactive state —
                    toggling in the navbar instantly updates any other toggle on the page.
                </p>
                <CodeView :code="preformat(composableSource)" lang="typescript" expanded />
                <p class="content">
                    Add this CSS rule to your global stylesheet so theme switches are instant
                    rather than a slow color cross-fade:
                </p>
                <CodeView :code="preformat(noTransitionCss)" lang="css" expanded />
            </div>
        </div>

        <Example
            :component="ExThemeSwitch"
            :code="ExThemeSwitchCode"
            title="Toggle with b-switch"
        >
            <p>
                Bind <code>:model-value</code> to the inverse of <code>isLight</code> so the
                switch reads "on&nbsp;=&nbsp;dark&nbsp;mode", and call <code>setTheme</code>
                on change.
            </p>
        </Example>

        <Example
            :component="ExThemeButton"
            :code="ExThemeButtonCode"
            title="Toggle with b-button"
        >
            <p>
                An icon button is the most compact option. The icon and label update
                reactively so the control always reflects the current theme.
            </p>
        </Example>

        <Example
            :component="ExThemeDropdown"
            :code="ExThemeDropdownCode"
            title="Select with b-dropdown"
        >
            <p>
                A dropdown scales well when you want to offer more than two themes.
                Each <code>b-dropdown-item</code> emits its <code>value</code> on selection,
                which maps directly to the theme string.
            </p>
        </Example>

        <Example
            :component="ExThemeNavbar"
            :code="ExThemeNavbarCode"
            title="Inside a b-navbar"
        >
            <p>
                Wrap any toggle in a <code>b-navbar-item</code> tagged as <code>div</code>
                and place it in the <code>#end</code> slot. Because all components share the
                same composable ref, this toggle stays in sync with any other toggle on
                the page automatically.
            </p>
        </Example>

        <div class="content">
            <h4 class="title is-4">Persistence and system preference</h4>
            <p>
                On first visit the composable checks
                <code>window.matchMedia('(prefers-color-scheme: dark)')</code> and applies the
                matching theme. Once the user makes a manual selection it is written to
                <code>localStorage</code> and takes priority on all subsequent visits.
                Clear the <code>theme</code> key to reset to the OS default.
            </p>
            <b-message type="is-warning" :closable="false">
                <strong>SSR / Nuxt:</strong> <code>localStorage</code> and <code>matchMedia</code>
                are browser-only APIs. Guard the composable behind
                <code>typeof window !== 'undefined'</code> and apply the theme inside a
                <code>mounted</code> hook rather than <code>setup</code> or
                <code>created</code> to avoid hydration mismatches.
            </b-message>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BMessage } from 'buefy'

import { shallowFields } from '@/utils'
import CodeView from '@/components/CodeView.vue'
import Example from '@/components/Example.vue'
import { preformat } from '@/utils'

import { composableSource, noTransitionCss } from './usage/themeSwitching'

import ExThemeSwitch from './examples/ExThemeSwitch.vue'
import ExThemeSwitchCode from './examples/ExThemeSwitch.vue?raw'

import ExThemeButton from './examples/ExThemeButton.vue'
import ExThemeButtonCode from './examples/ExThemeButton.vue?raw'

import ExThemeDropdown from './examples/ExThemeDropdown.vue'
import ExThemeDropdownCode from './examples/ExThemeDropdown.vue?raw'

import ExThemeNavbar from './examples/ExThemeNavbar.vue'
import ExThemeNavbarCode from './examples/ExThemeNavbar.vue?raw'

export default defineComponent({
    components: { BMessage, CodeView, Example },
    data() {
        return {
            composableSource,
            noTransitionCss,
            ...shallowFields({
                ExThemeSwitch,
                ExThemeButton,
                ExThemeDropdown,
                ExThemeNavbar
            }),
            ExThemeSwitchCode,
            ExThemeButtonCode,
            ExThemeDropdownCode,
            ExThemeNavbarCode
        }
    },
    methods: { preformat }
})
</script>
