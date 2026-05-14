<template>
    <span class="icon" :class="[newType, size]">
        <svg
            v-if="isSvgAlias"
            :viewBox="resolvedAliasSvg.viewBox || '0 0 24 24'"
            xmlns="http://www.w3.org/2000/svg"
            :class="customClass"
            aria-hidden="true"
        >
            <path fill="currentColor" :d="resolvedAliasSvg.path" />
        </svg>
        <component
            v-else-if="isComponentAlias"
            :is="resolvedAliasComponent.component"
            :icon="resolvedAliasComponent.icon"
            :class="customClass"
        />
        <i
            v-else-if="!useIconComponent"
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

import config, { type SvgIconAlias, type ComponentIconAlias } from '../../utils/config'
import getIcons, { type InternalIconPack } from '../../utils/icons'
import { resolveAlias } from '../../utils/iconAliases'

export default defineComponent({
    name: 'BIcon',
    props: {
        type: [String, Object],
        component: String,
        pack: String,
        icon: {
            type: String,
            required: false,
            default: undefined
        },
        /** Key into IconAliases (e.g. "chevronLeft"). Takes precedence over icon/pack. */
        alias: String,
        size: String,
        customSize: String,
        customClass: String,
        both: Boolean // This is used internally to show both MDI and FA icon
    },
    computed: {
        resolvedAlias() {
            if (!this.alias) return null
            return resolveAlias(this.alias) ?? null
        },
        isSvgAlias(): boolean {
            return this.resolvedAlias?.type === 'svg'
        },
        isComponentAlias(): boolean {
            return this.resolvedAlias?.type === 'component'
        },
        // Typed accessors used in the template
        resolvedAliasSvg(): SvgIconAlias {
            return this.resolvedAlias as SvgIconAlias
        },
        resolvedAliasComponent(): ComponentIconAlias {
            return this.resolvedAlias as ComponentIconAlias
        },
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
        /*
        * Internal icon name based on the pack.
        * If pack is 'fa', gets the equivalent FA icon name of the MDI,
        * internal icons are always MDI.
        */
        newIcon() {
            return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon ?? '')}`
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
        /*
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
