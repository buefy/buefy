import menu from './menu.json'

export interface PageTree {
    category: string
    pages: (PageTree | string)[]
}

export default menu as Record<string, PageTree[]>
