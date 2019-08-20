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
import icons from '../../utils/icons'

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
        iconConfig() {
            return icons[this.newPack]
        },
        /**
        * Internal icon name based on the pack.
        * If pack is 'fa', gets the equivalent FA icon name of the MDI,
        * internal icons are always MDI.
        */
        newIcon() {
            return `${this.iconConfig.iconPrefix}${this.getEquivalentIconOf(this.icon)}`
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
            if (this.size && this.iconConfig.sizes[this.size]) {
                return this.iconConfig.sizes[this.size]
            }
            return this.iconConfig.default
        },
        useIconComponent() {
            return config.defaultIconComponent
        }
    },
    methods: {
        /**
        * Equivalent icon name of the MDI.
        */
        getEquivalentIconOf(value) {
            // Only transform the class if the both prop is set to true
            if (!this.both) {
                return value
            }

            if (this.size &&
                this.iconConfig.internalIcons &&
                this.iconConfig.internalIcons[value]) {
                return this.iconConfig.internalIcons[value]
            }
            return value
        }
    }
}
</script>
