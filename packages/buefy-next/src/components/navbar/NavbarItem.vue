<template>
    <component
        :is="tag"
        class="navbar-item"
        :class="{
            'is-active': active
        }"
        v-bind="$attrs"
    >
        <slot />
    </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { ComponentPublicInstance } from 'vue'

const clickableWhiteList = ['div', 'span', 'input']

/* eslint-disable @typescript-eslint/ban-types */
type NavbarItemParent = ComponentPublicInstance<
    {}, // P(rops)
    {}, // B (raw bindings)
    {
        // to accomodate [`_is${item}`] access
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any
    }, // D(ata)
    {}, // C(omputed)
    {
        closeMenu: () => void
    } // M(ethods)
>
/* eslint-enable @typescript-eslint/ban-types */

export default defineComponent({
    name: 'BNavbarItem',
    inheritAttrs: false,
    props: {
        tag: {
            type: String,
            default: 'a'
        },
        active: Boolean
    },
    methods: {
        /*
         * Keypress event that is bound to the document
         */
        keyPress({ key }: { key?: KeyboardEvent['key'] }) {
            if (key === 'Escape' || key === 'Esc') {
                this.closeMenuRecursive(this, ['NavBar'])
            }
        },
        /*
         * Close parent if clicked outside.
         */
        handleClickEvent(event: { target: { localName: string } }) {
            const isOnWhiteList = clickableWhiteList.some((item) => item === event.target.localName)
            if (!isOnWhiteList) {
                const parent = this.closeMenuRecursive(this, ['NavbarDropdown', 'NavBar'])
                if (parent && parent.$data._isNavbarDropdown) this.closeMenuRecursive(parent, ['NavBar'])
            }
        },
        /*
         * Close parent recursively
         */
        closeMenuRecursive(
            current: ComponentPublicInstance,
            targetComponents: string[]
        ): NavbarItemParent | null {
            const parent = current.$parent as NavbarItemParent | null
            if (!parent) return null
            const foundItem = targetComponents.reduce((acc, item) => {
                if (parent.$data[`_is${item}`]) {
                    parent.closeMenu()
                    return parent
                }
                return acc
            }, null as NavbarItemParent | null)
            return foundItem || this.closeMenuRecursive(parent, targetComponents)
        }
    },
    mounted() {
        if (typeof window !== 'undefined') {
            this.$el.addEventListener('click', this.handleClickEvent)
            document.addEventListener('keyup', this.keyPress)
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            this.$el.removeEventListener('click', this.handleClickEvent)
            document.removeEventListener('keyup', this.keyPress)
        }
    }
})
</script>
