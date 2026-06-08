import expo from './expo.json'

export interface ExpoInfo {
    title: string
    date: string
    img: string
    url: string
    featured?: boolean
    description?: string
    tags?: string[]
}

export default expo as ExpoInfo[]
