<template>
    <section>
        <b-navbar shadow>
            <template #brand>
                <b-navbar-item tag="span">My App</b-navbar-item>
            </template>
            <template #end>
                <b-navbar-item tag="div">
                    <b-switch
                        v-model="isDark"
                        @update:model-value="onToggle"
                    >
                        Dark
                    </b-switch>
                </b-navbar-item>
            </template>
        </b-navbar>
        <div class="section">
            <div class="container">
                <p>Current theme: <strong>{{ isDark ? 'dark' : 'light' }}</strong></p>
            </div>
        </div>
    </section>
</template>

<script>
import { defineComponent } from 'vue'
import { BNavbar, BNavbarItem, BSwitch } from 'buefy'

export default defineComponent({
    components: { BNavbar, BNavbarItem, BSwitch },
    data() {
        const stored = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return {
            isDark: stored === 'dark' || (!stored && prefersDark)
        }
    },
    methods: {
        onToggle(isDark) {
            const theme = isDark ? 'dark' : 'light'
            localStorage.setItem('theme', theme)
            document.documentElement.setAttribute('data-theme', theme)
        }
    }
})
</script>
