import config from './config'

export default {
    props: {
        iconPack: String
    },
    data() {
        return {
            newIconPack: this.iconPack || config.defaultIconPack
        }
    }
}
