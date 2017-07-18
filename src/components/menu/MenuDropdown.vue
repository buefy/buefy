<template>
    <li class="b-menu-dropdown" :class="{ 'is-active': isActive }">
        <a @click="toggle"><slot name="trigger"></slot></a>
        <ul v-show="isActive">
            <slot></slot>
        </ul>
    </li>
</template>

<script>
import MenuMixin from './MenuMixin'

export default {
    name: 'bMenuDropdown',
    mixins: [MenuMixin],
    data() {
        return {
            isActive: false
        }
    },
    watch: {
        /**
         * Emit toggle event when this dropdown is toggled.
         */
        isActive(val) {
            this.$emit('toggle', this.isActive)
        }
    },
    methods: {
        /**
         * Collapse this dropdown and children if exist.
         */
        collapse() {
            this.isActive = false
            this.$children.forEach((child) => {
                if (child.$options.name === 'bMenuDropdown') {
                    child.collapse()
                }
            })
        },

        /**
         * Expand this dropdown and parent if exists.
         */
        expand() {
            if (!this.isActive) {
                this.isActive = true
                if (this.$parent.$options.name === 'bMenuDropdown') {
                    this.$parent.expand()
                }
            }
        },

        /**
         * Toggle active state and collapse other dropdowns.
         */
        toggle() {
            if (!this.isActive && this.menu.autoClose) {
                this.menu.collapse(this.rootDropdown)
            }
            this.isActive = !this.isActive
        }
    }
}
</script>

