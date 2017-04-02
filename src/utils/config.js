import NoticeMixin from './NoticeMixin'
import Icon from '../components/icon'

export default {
    setDefaultContentElement(container) {
        NoticeMixin.props.container.default = container
    },
    setDefaultIconType(iconPack) {
        Icon.props.type.default = iconPack || 'mdi'
    }
}
