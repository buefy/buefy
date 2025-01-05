<template>
    <span class="icon" :class="[newType, size]">
        <i
            v-if="!useIconComponent"
            :class="[newPack, newIcon, newCustomSize, customClass]"
        />

        <component
            v-else
            :is="useIconComponent"
            :icon="[newPack, newIcon]"
            :size="newCustomSize"
            :class="[customClass]"
        />
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import config from '../../utils/config'
import getIcons, { type InternalIconPack } from '../../utils/icons'

export default defineComponent({
    name: 'BIcon',
    props: {
        type: [String, Object],
        component: String,
        pack: String,
        icon: {
            type: String,
            required: true
        },
        size: String,
        customSize: String,
        customClass: String,
        both: Boolean // This is used internally to show both MDI and FA icon
    },
    computed: {
        iconConfig() {
            const allIcons = getIcons()
            return allIcons[this.newPack]
        },
        iconPrefix() {
            if (this.iconConfig && this.iconConfig.iconPrefix) {
                return this.iconConfig.iconPrefix
            }
            return ''
        },
        /**
        * Internal icon name based on the pack.
        * If pack is 'fa', gets the equivalent FA icon name of the MDI,
        * internal icons are always MDI.
        */
        newIcon() {
            return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon)}`
        },
        newPack() {
            return this.pack || config.defaultIconPack
        },
        newType() {
            if (!this.type) return

            let splitType: string[] = []
            if (typeof this.type === 'string') {
                splitType = this.type.split('-')
            } else {
                for (const key in this.type) {
                    if (this.type[key]) {
                        splitType = key.split('-')
                        break
                    }
                }
            }
            if (splitType.length <= 1) return

            const [, ...type] = splitType
            return `has-text-${type.join('-')}`
        },
        newCustomSize() {
            return this.customSize || this.customSizeByPack
        },
        customSizeByPack() {
            if (this.iconConfig && this.iconConfig.sizes) {
                if (this.size && this.iconConfig.sizes[this.size] !== undefined) {
                    return this.iconConfig.sizes[this.size]
                } else if (this.iconConfig.sizes.default) {
                    return this.iconConfig.sizes.default
                }
            }
            return null
        },
        useIconComponent() {
            return this.component || config.defaultIconComponent
        }
    },
    methods: {
        /**
        * Equivalent icon name of the MDI.
        */
        getEquivalentIconOf(value: string) {
            // Only transform the class if the both prop is set to true
            if (!this.both) {
                return value
            }

            if (this.iconConfig == null) {
                return value
            }
            const maybeInternal = this.iconConfig as Partial<InternalIconPack>
            if (maybeInternal &&
                maybeInternal.internalIcons &&
                maybeInternal.internalIcons[value]) {
                return maybeInternal.internalIcons[value]
            }
            return value
        }
    }
})
</script>
