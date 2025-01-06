import config, { type IconPack } from '../utils/config'
import { merge } from '../utils/helpers'

/**
 * Internally used {@link IconPack} type.
 *
 * @internal
 */
export type InternalIconPack = IconPack & {
    /** Maps icon names to equivalent ones in MDI. */
    internalIcons: Record<string, string>
}

const mdiIcons: IconPack = {
    sizes: {
        default: 'mdi-24px',
        'is-small': null,
        'is-medium': 'mdi-36px',
        'is-large': 'mdi-48px'
    },
    iconPrefix: 'mdi-'
}

const faIcons: () => InternalIconPack = () => {
    const faIconPrefix = config && config.defaultIconComponent ? '' : 'fa-'
    return {
        sizes: {
            default: null,
            'is-small': null,
            'is-medium': faIconPrefix + 'lg',
            'is-large': faIconPrefix + '2x'
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
            'menu-up': 'caret-up',
            'close-circle': 'times-circle'
        }
    }
}

const getIcons: () => Record<string, IconPack> = () => {
    let icons: Record<string, IconPack> = {
        mdi: mdiIcons,
        fa: faIcons(),
        fas: faIcons(),
        far: faIcons(),
        fad: faIcons(),
        fab: faIcons(),
        fal: faIcons(),
        'fa-solid': faIcons(),
        'fa-regular': faIcons(),
        'fa-light': faIcons(),
        'fa-thin': faIcons(),
        'fa-duotone': faIcons(),
        'fa-brands': faIcons()
    }

    if (config && config.customIconPacks) {
        icons = merge<Record<string, IconPack>>(icons, config.customIconPacks, true)
    }

    return icons
}

export default getIcons
