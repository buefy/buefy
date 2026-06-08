<template>
    <button
        class="theme-toggle-btn"
        :class="{ 'is-dark': !isLight }"
        :title="isLight ? 'Switch to dark mode' : 'Switch to light mode'"
        :aria-label="isLight ? 'Switch to dark mode' : 'Switch to light mode'"
        type="button"
        @click="toggle"
    >
        <span class="toggle-track">
            <span class="toggle-thumb">
                <b-icon
                    :icon="isLight ? 'white-balance-sunny' : 'moon-waning-crescent'"
                    size="is-small"
                />
            </span>
        </span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BIcon } from 'buefy'
import { useTheme } from '@/composables/useTheme'

export default defineComponent({
    components: { BIcon },
    data() {
        return {
            isLight: useTheme().isLight
        }
    },
    methods: {
        toggle() {
            useTheme().toggleTheme()
        }
    }
})
</script>

<style scoped>
.theme-toggle-btn {
    display: inline-flex;
    align-items: center;
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    border-radius: 100px;
    transition: opacity 0.15s ease;

    &:hover {
        opacity: 0.8;
    }

    &:focus-visible {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
    }
}

.toggle-track {
    display: flex;
    align-items: center;
    width: 52px;
    height: 28px;
    border-radius: 100px;
    background: rgba(127, 127, 127, 0.2);
    border: 1px solid rgba(127, 127, 127, 0.3);
    padding: 2px;
    transition:
        background 0.2s ease,
        border-color 0.2s ease;

    .theme-toggle-btn.is-dark & {
        background: rgba(121, 87, 213, 0.35);
        border-color: rgba(121, 87, 213, 0.5);
    }
}

.toggle-thumb {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, background 0.2s ease;
    color: #7957D5;
    flex-shrink: 0;

    .theme-toggle-btn.is-dark & {
        transform: translateX(24px);
        background: #7957D5;
        color: #fff;
    }
}
</style>
