<template>
    <span class="icon is-unselectable" :class="[type, size]">
        <i :class="[pack, pack === 'fa' ? `fa-${newIcon}` : null ]">{{ pack === 'mdi' ? newIcon : null }}</i>
    </span>
</template>

<script>
    export default {
        name: 'bIcon',
        props: {
            type: String,
            pack: {
                type: String,
                default: 'mdi'
            },
            icon: String,
            both: Boolean, // This is used internally show both mdi and fa icon
            size: String
        },
        computed: {
            newIcon() {
                if (this.both) {
                    return this.pack === 'mdi' ? this.icon : this.equivalentIconOf(this.icon)
                } else {
                    return this.icon
                }
            }
        },
        methods: {
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
                    default: return null
                }
            }
        }
    }
</script>
