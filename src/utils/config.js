import NotifyMixin from './NotifyMixin'
import Icon from '../components/icon'

export default {
    setDefaultContentElement(container) {
        NotifyMixin.props.container.default = container
    },
    setDefaultIconType(iconPack) {
        Icon.props.type.default = iconPack || 'mdi'
    }
}
