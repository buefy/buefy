<template>
    <div
        class="navbar-item has-dropdown"
        :class="{
            'is-hoverable': isHoverable,
            'is-active': newActive
        }"
        @mouseenter="checkHoverable"
        v-click-outside="closeMenu"
    >
        <component
            :is="tag"
            class="navbar-link"
            :class="{
                'is-arrowless': arrowless,
                'is-active': newActive && collapsible
            }"
            v-bind="$attrs"
            v-on="$listeners"
            aria-haspopup="true"
            @click.prevent="toggleMenu"
            @keyup.enter="toggleMenu"
            tabindex="0"
        >
            <template v-if="label">{{ label }}</template>
            <slot v-else name="label" />
        </component>
        <div
            v-show="!collapsible || (collapsible && newActive)"
            class="navbar-dropdown"
            :class="{
                'is-right': right,
                'is-boxed': boxed,
            }"
        >
            <slot />
        </div>
    </div>
</template>

<script>
import clickOutside from '../../directives/clickOutside'

export default {
    name: 'BNavbarDropdown',
    directives: {
        clickOutside
    },
    inheritAttrs: false,
    props: {
        label: String,
        hoverable: Boolean,
        active: Boolean,
        right: Boolean,
        arrowless: Boolean,
        boxed: Boolean,
        closeOnClick: {
            type: Boolean,
            default: true
        },
        collapsible: Boolean,
        tag: {
            type: String,
            default: 'a'
        }
    },
    data() {
        return {
            newActive: this.active,
            isHoverable: this.hoverable,
            _isNavbarDropdown: true // Used internally by NavbarItem
        }
    },
    watch: {
        active(value) {
            this.newActive = value
        },

        newActive(value) {
            this.$emit('active-change', value)
        }
    },
    methods: {
        toggleMenu() {
            this.newActive = !this.newActive
        },
        showMenu() {
            this.newActive = true
        },
        /**
        * See naming convetion of navbaritem
        */
        closeMenu() {
            this.newActive = !this.closeOnClick
            if (this.hoverable && this.closeOnClick) {
                this.isHoverable = false
            }
        },
        checkHoverable() {
            if (this.hoverable) {
                this.isHoverable = true
            }
        }
    }
}
</script>
