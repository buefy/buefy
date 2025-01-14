import expo from './expo.json'

export interface ExpoInfo {
    title: string
    date: string
    img: string
    url: string
    featured?: boolean
}

export default expo as ExpoInfo[]
