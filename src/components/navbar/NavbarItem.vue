<template>
    <component
        :is="tag"
        class="navbar-item"
        :class="{
            'is-active': active
        }"
        v-bind="$attrs"
        v-on="$listeners">
        <slot/>
    </component>
</template>

<script>
const clickableWhiteList = ['div', 'span', 'input']

export default {
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
        /**
         * Keypress event that is bound to the document
         */
        keyPress({ key }) {
            if (key === 'Escape' || key === 'Esc') {
                this.closeMenuRecursive(this, ['NavBar'])
            }
        },
        /**
         * Close parent if clicked outside.
         */
        handleClickEvent(event) {
            const isOnWhiteList = clickableWhiteList.some((item) => item === event.target.localName)
            if (!isOnWhiteList) {
                const parent = this.closeMenuRecursive(this, ['NavbarDropdown', 'NavBar'])
                if (parent && parent.$data._isNavbarDropdown) this.closeMenuRecursive(parent, ['NavBar'])
            }
        },
        /**
         * Close parent recursively
         */
        closeMenuRecursive(current, targetComponents) {
            if (!current.$parent) return null
            const foundItem = targetComponents.reduce((acc, item) => {
                if (current.$parent.$data[`_is${item}`]) {
                    current.$parent.closeMenu()
                    return current.$parent
                }
                return acc
            }, null)
            return foundItem || this.closeMenuRecursive(current.$parent, targetComponents)
        }
    },
    mounted() {
        if (typeof window !== 'undefined') {
            this.$el.addEventListener('click', this.handleClickEvent)
            document.addEventListener('keyup', this.keyPress)
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            this.$el.removeEventListener('click', this.handleClickEvent)
            document.removeEventListener('keyup', this.keyPress)
        }
    }
}
</script>
