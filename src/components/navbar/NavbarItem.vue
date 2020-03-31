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
const clickableWhiteList = ['div', 'span']

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
        keyPress(event) {
            // Esc key
            // TODO: use code instead (because keyCode is actually deprecated)
            // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
            if (event.keyCode === 27) {
                this.$parent.closeMenu()
            }
        },
        /**
         * Close parent if clicked outside.
         */
        handleClickEvent(event) {
            const isOnWhiteList = clickableWhiteList.some((item) => item === event.target.localName)
            if (!isOnWhiteList) {
                const navDropDown = this.closeMenuRecursive(this, 'NavDropdown')
                if (navDropDown) this.closeMenuRecursive(navDropDown, 'NavBar')
            }
        },
        /**
         * Close parent recursively
         */
        closeMenuRecursive(current, targetComponentType) {
            if (!current.$parent) return null
            if (current.$parent.$data[`_is${targetComponentType}`]) {
                current.$parent.closeMenu()
                return current.$parent
            }
            return this.closeMenuRecursive(current.$parent, targetComponentType)
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
