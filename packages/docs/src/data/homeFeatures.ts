export interface HomeFeature {
    icon: string
    title: string
    description: string
}

const features: HomeFeature[] = [
    {
        icon: 'puzzle-outline',
        title: 'Vue 3 Native',
        description: 'Built from the ground up for Vue 3.'
    },
    {
        icon: 'palette-outline',
        title: 'Bulma-Powered',
        description: 'Inherits your entire Bulma theme. CSS variables, SCSS overrides — all supported.'
    },
    {
        icon: 'lightning-bolt-outline',
        title: 'Lightweight',
        description: '~88KB min+gzip including Bulma. Tree-shake individual components for even less.'
    },
    {
        icon: 'check-circle-outline',
        title: 'Accessible',
        description: 'ARIA labels, keyboard navigation, and focus management built into every component.'
    },
    {
        icon: 'responsive',
        title: 'Responsive',
        description: 'Every component works across mobile, tablet, and desktop without extra configuration.'
    },
    {
        icon: 'code-braces',
        title: 'TypeScript Ready',
        description: 'Full TypeScript definitions included. Autocomplete and type safety out of the box.'
    }
]

export default features
