<template>
    <section class="section">
        <div class="container">
            <b-dropdown @change="onSelect">
                <template #trigger="{ active }">
                    <b-button
                        :icon-left="isDark ? 'moon-waning-crescent' : 'white-balance-sunny'"
                        :icon-right="active ? 'chevron-up' : 'chevron-down'"
                    >
                        {{ isDark ? 'Dark' : 'Light' }}
                    </b-button>
                </template>

                <b-dropdown-item value="light">
                    <div class="media">
                        <b-icon class="media-left" icon="white-balance-sunny" />
                        <div class="media-content">Light</div>
                    </div>
                </b-dropdown-item>
                <b-dropdown-item value="dark">
                    <div class="media">
                        <b-icon class="media-left" icon="moon-waning-crescent" />
                        <div class="media-content">Dark</div>
                    </div>
                </b-dropdown-item>
            </b-dropdown>
        </div>
    </section>
</template>

<script>
import { defineComponent } from 'vue'
import { BButton, BDropdown, BDropdownItem, BIcon } from 'buefy'

export default defineComponent({
    components: { BButton, BDropdown, BDropdownItem, BIcon },
    data() {
        const stored = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return {
            isDark: stored === 'dark' || (!stored && prefersDark)
        }
    },
    methods: {
        onSelect(theme) {
            this.isDark = theme === 'dark'
            localStorage.setItem('theme', theme)
            document.documentElement.setAttribute('data-theme', theme)
        }
    }
})
</script>
