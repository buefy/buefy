import config from '../utils/config'

let mdiIcons = {
    sizes: {
        default: 'mdi-24px',
        'is-small': '',
        'is-medium': 'mdi-36px',
        'is-large': 'mdi-48px'
    },
    iconPrefix: 'mdi-'
}

const faIconPrefix = config.defaultIconComponent ? '' : 'fa-'
let faIcons = {
    sizes: {
        default: faIconPrefix + 'lg',
        'is-small': '',
        'is-medium': faIconPrefix + '2x',
        'is-large': faIconPrefix + '3x'
    },
    iconPrefix: faIconPrefix,
    internalIcons: {
        information: 'info-circle',
        alert: 'exclamation-triangle',
        'alert-circle': 'exclamation-circle',
        'chevron-right': 'angle-right',
        'chevron-left': 'angle-left',
        'chevron-down': 'angle-down',
        'eye-off': 'eye-slash',
        'menu-down': 'caret-down',
        'menu-up': 'caret-up'
    }
}

let icons = {
    mdi: mdiIcons,
    fa: faIcons,
    fas: faIcons,
    far: faIcons,
    fad: faIcons
}

if (config.customIconPacks) {
    icons.assign(config.customIconPacks)
}

export default icons
