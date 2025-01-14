import routes from './routes.json'

export interface Route {
    title: string
    subtitle: string
    breadTitle?: string
    path: string
    githubPath?: string
    menu?: string
    breadcrumb?: string[]
    isUpdated?: boolean
    isNew?: boolean
    hideSidebar?: boolean
}

export default routes as Record<string, Route>
