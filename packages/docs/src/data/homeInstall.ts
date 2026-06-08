export interface InstallTab {
    id: string
    label: string
    cmd: string
}

const tabs: InstallTab[] = [
    { id: 'npm', label: 'npm', cmd: 'npm install buefy' },
    { id: 'pnpm', label: 'pnpm', cmd: 'pnpm add buefy' },
    { id: 'yarn', label: 'yarn', cmd: 'yarn add buefy' }
]

export default tabs
