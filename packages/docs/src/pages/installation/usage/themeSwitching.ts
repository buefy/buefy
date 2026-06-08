// Code snippets for the Theme Switching documentation page.
//
// Kept in a separate file so Vite doesn't try to compile the example
// code as actual project source.

export const composableSource = `
// composables/useTheme.ts
import { ref } from 'vue'

type Theme = 'light' | 'dark'

// Module-level ref so all components share one reactive state
const isLight = ref(
    localStorage.getItem('theme') === 'light' ||
    (!localStorage.getItem('theme') &&
     !window.matchMedia('(prefers-color-scheme: dark)').matches)
)

function setTheme(theme: Theme): void {
    isLight.value = theme === 'light'
    localStorage.setItem('theme', theme)
    // Suppress transitions so the switch is instant, not a slow cross-fade
    document.documentElement.classList.add('no-transition')
    document.documentElement.setAttribute('data-theme', theme)
    requestAnimationFrame(() => requestAnimationFrame(() => {
        document.documentElement.classList.remove('no-transition')
    }))
}

function toggleTheme(): void {
    setTheme(isLight.value ? 'dark' : 'light')
}

export function useTheme() {
    return { isLight, setTheme, toggleTheme }
}
`

export const noTransitionCss = `
/* Prevent cross-fading colors during a theme switch */
html.no-transition *,
html.no-transition *::before,
html.no-transition *::after {
    transition: none !important;
    animation: none !important;
}
`
