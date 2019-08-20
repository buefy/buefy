
    import Buefy from 'buefy'
    Vue.use(Buefy, {
        defaultIconComponent: 'ion-icon',
        defaultIconPack: 'ion',
        customIconPacks: {
            ion: {
                sizes: {
                    default: 'mdi-24px',
                    'is-small': '',
                    'is-medium': 'mdi-36px',
                    'is-large': 'mdi-48px'
                },
                iconPrefix: 'mdi-',
                internalIcons: {
                    check: 'check',
                    information: 'information',
                    'check-circle': 'check-circle',
                    alert: 'alert',
                    'alert-circle': 'alert-circle',
                    'arrow-up': 'arrow-up',
                    'chevron-right': 'chevron-right',
                    'chevron-left': 'chevron-left',
                    'chevron-down': 'chevron-down',
                    eye: 'eye',
                    'eye-off': 'eye-off',
                    'menu-down': 'menu-down',
                    'menu-up': 'menu-up'
                }
            }
        }
    });
