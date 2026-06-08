import { ref } from 'vue'

type Theme = 'light' | 'dark'

function getTheme(): Theme {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored === 'light' || stored === 'dark') return stored
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    return 'light'
}

const isLight = ref(getTheme() === 'light')

function setTheme(theme: Theme): void {
    isLight.value = theme === 'light'
    localStorage.setItem('theme', theme)
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
    return { isLight, getTheme, setTheme, toggleTheme }
}
