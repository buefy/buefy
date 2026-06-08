<template>
    <section class="section">
        <div class="container">
            <b-field>
                <b-switch
                    v-model="isDark"
                    @update:model-value="onToggle"
                >
                    Dark mode
                </b-switch>
            </b-field>
        </div>
    </section>
</template>

<script>
import { defineComponent } from 'vue'
import { BField, BSwitch } from 'buefy'

export default defineComponent({
    components: { BField, BSwitch },
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
