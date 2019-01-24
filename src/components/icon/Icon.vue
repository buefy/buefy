<template>
    <span class="icon" :class="[newType, size]">
        <i
            v-if="!useIconComponent"
            :class="[newPack, newIcon, newCustomSize, customClass]"/>

        <component
            v-else
            :is="useIconComponent"
            :icon="[newPack, newIcon]"
            :size="newCustomSize"
            :class="[customClass]"/>
    </span>
</template>

<script>
    import config from '../../utils/config'

    export default {
        name: 'BIcon',
        props: {
            type: [String, Object],
            pack: String,
            icon: String,
            size: String,
            customSize: String,
            customClass: String,
            both: Boolean // This is used internally to show both MDI and FA icon
        },
        computed: {
            /**
             * Internal icon name based on the pack.
             * If pack is 'fa', gets the equivalent FA icon name of the MDI,
             * internal icons are always MDI.
             */
            newIcon() {
                return this.newPack === 'mdi'
                    ? `${this.newPack}-${this.icon}`
                    : this.addFAPrefix(this.getEquivalentIconOf(this.icon))
            },
            newPack() {
                return this.pack || config.defaultIconPack
            },
            newType() {
                if (!this.type) return

                let splitType = []
                if (typeof this.type === 'string') {
                    splitType = this.type.split('-')
                } else {
                    for (let key in this.type) {
                        if (this.type[key]) {
                            splitType = key.split('-')
                            break
                        }
                    }
                }
                if (splitType.length <= 1) return

                return `has-text-${splitType[1]}`
            },
            newCustomSize() {
                return this.customSize || this.customSizeByPack
            },
            customSizeByPack() {
                const defaultSize = this.newPack === 'mdi'
                    ? 'mdi-24px'
                    : this.addFAPrefix('lg')
                const mediumSize = this.newPack === 'mdi'
                    ? 'mdi-36px'
                    : this.addFAPrefix('2x')
                const largeSize = this.newPack === 'mdi'
                    ? 'mdi-48px'
                    : this.addFAPrefix('3x')
                switch (this.size) {
                    case 'is-small': return
                    case 'is-medium': return mediumSize
                    case 'is-large': return largeSize
                    default: return defaultSize
                }
            },
            useIconComponent() {
                return config.defaultIconComponent
            }
        },
        methods: {
            addFAPrefix(value) {
                if (this.useIconComponent) {
                    return value
                }
                return `fa-${value}`
            },

            /**
             * Equivalent FA icon name of the MDI.
             */
            getEquivalentIconOf(value) {
                // Only transform the class if the both prop is set to true
                if (!this.both) {
                    return value
                }

                switch (value) {
                    case 'check': return 'check'
                    case 'information': return 'info-circle'
                    case 'check-circle': return 'check-circle'
                    case 'alert': return 'exclamation-triangle'
                    case 'alert-circle': return 'exclamation-circle'
                    case 'arrow-up': return 'arrow-up'
                    case 'chevron-right': return 'angle-right'
                    case 'chevron-left': return 'angle-left'
                    case 'chevron-down': return 'angle-down'
                    case 'eye': return 'eye'
                    case 'eye-off': return 'eye-slash'
                    case 'menu-down': return 'caret-down'
                    case 'menu-up': return 'caret-up'
                    default: return value
                }
            }
        }
    }
</script>
