<template>
    <span class="icon" :class="[type, size]">
        <i :class="[newPack, newPack === 'fa' ? `fa-${newIcon}` : null ]">{{ newPack === 'mdi' ? newIcon : null }}</i>
    </span>
</template>

<script>
    import config from '../../utils/config'

    export default {
        name: 'bIcon',
        props: {
            type: String,
            pack: String,
            icon: String,
            both: Boolean, // This is used internally to show both MDI and FA icon
            size: String
        },
        data() {
            return {
                newPack: this.pack || config.defaultIconPack
            }
        },
        computed: {
            /**
             * Internal icon name based on the pack.
             * If pack is 'fa', gets the equivalent FA icon name of the MDI,
             * internal icons are always MDI.
             */
            newIcon() {
                if (this.both) {
                    return this.newPack === 'mdi' ? this.icon : this.equivalentIconOf(this.icon)
                } else {
                    return this.icon
                }
            }
        },
        methods: {
            /**
             * Equivalent FA icon name of the MDI.
             */
            equivalentIconOf(value) {
                switch (value) {
                    case 'done': return 'check'
                    case 'info': return 'info-circle'
                    case 'check_circle': return 'check-circle'
                    case 'warning': return 'exclamation-triangle'
                    case 'error': return 'exclamation-circle'
                    case 'arrow_upward': return 'arrow-up'
                    case 'chevron_right': return 'angle-right'
                    case 'chevron_left': return 'angle-left'
                    case 'keyboard_arrow_down': return 'angle-down'
                    case 'visibility': return 'eye'
                    case 'visibility_off': return 'eye-slash'
                    case 'arrow_drop_down': return 'caret-down'
                    case 'arrow_drop_up': return 'caret-up'
                    default: return null
                }
            }
        }
    }
</script>
