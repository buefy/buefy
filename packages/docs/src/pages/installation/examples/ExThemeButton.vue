<template>
    <section class="section">
        <div class="container">
            <b-button
                :icon-left="isDark ? 'white-balance-sunny' : 'moon-waning-crescent'"
                rounded
                @click="toggle"
            >
                {{ isDark ? 'Light mode' : 'Dark mode' }}
            </b-button>
        </div>
    </section>
</template>

<script>
import { defineComponent } from 'vue'
import { BButton } from 'buefy'

export default defineComponent({
    components: { BButton },
    data() {
        const stored = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return {
            isDark: stored === 'dark' || (!stored && prefersDark)
        }
    },
    methods: {
        toggle() {
            this.isDark = !this.isDark
            const theme = this.isDark ? 'dark' : 'light'
            localStorage.setItem('theme', theme)
            document.documentElement.setAttribute('data-theme', theme)
        }
    }
})
</script>
