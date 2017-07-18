<template>
    <li @click="handleClick">
        <slot v-if="menu.router"></slot>
        <a v-else :class="{ 'is-active': isActive }"><slot></slot></a>
    </li>
</template>

<script>
import MenuMixin from './MenuMixin'

export default {
    name: 'bMenuItem',
    mixins: [MenuMixin],
    props: {
        value: {
            default: null
        }
    },
    mounted() {
        if (this.menu.router) {
            // Observe the custom element (router option) to detect if it is active, is-active class is added,
            // to correct the states in Menu component.
            this.detectActiveLink = new MutationObserver((event) => {
                const oldClass = event[0].oldValue.split(' +')
                const newClass = event[0].target.classList
                if (oldClass.indexOf('is-active') === -1 && newClass.contains('is-active')) {
                    this.menu.selectItem(this)
                    this.ensureExpandedDropdown()
                }
            })
            this.detectActiveLink.observe(this.$slots.default[0].elm, {
                attributes: true,
                attributeOldValue: true,
                attributeFilter: ['class'],
                childList: false,
                characterData: false
            })
        }
    },
    beforeDestroyed() {
        // Clear the observer.
        if (this.detectActiveLink) {
            this.detectActiveLink.disconnect()
        }
    },
    computed: {
        /**
         * Get value from v-model in Menu component.
         */
        activeValue() {
            return this.menu.value
        },

        /**
         * Check if this item is active.
         */
        isActive() {
            return this._uid === this.menu.activeItem
        }
    },
    watch: {
        /**
         * If the v-model value is changed,
         * active this item if matched.
         */
        activeValue(val) {
            if (val === this.value && !this.isActive) {
                this.menu.selectItem(this)
                this.ensureExpandedDropdown()
            }
        }
    },
    methods: {
        /**
         * If this item is selected by not clicking the item,
         * make sure that all parent dropdowns are expanded.
         */
        ensureExpandedDropdown() {
            if (this.$parent.$options.name === 'bMenuDropdown') {
                this.$parent.expand()
            }
        },

        /**
         * Handle clicking item.
         * 1. Emit click event.
         * 2. Set this item to active.
         */
        handleClick() {
            this.$emit('click', this.value)
            this.menu.selectItem(this)
        }
    }
}
</script>
