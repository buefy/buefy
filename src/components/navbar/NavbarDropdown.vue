<template>
    <div
        class="navbar-item has-dropdown"
        :class="{
            'is-hoverable': hoverable,
            'is-active': newActive
        }"
        v-click-outside="closeMenu"
    >
        <a
            class="navbar-link"
            :class="{
                'is-arrowless': arrowless
            }"
            @click="newActive = !newActive">
            <template v-if="label">{{ label }}</template>
            <slot v-else name="label" />
        </a>
        <div
            class="navbar-dropdown"
            :class="{
                'is-right': right,
                'is-boxed': boxed
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
    props: {
        label: String,
        hoverable: Boolean,
        active: Boolean,
        right: Boolean,
        arrowless: Boolean,
        boxed: Boolean
    },
    data() {
        return {
            newActive: this.active,
            _isNavDropdown: true // Used internally by NavbarItem
        }
    },
    watch: {
        active(value) {
            this.newActive = value
        }
    },
    methods: {
        showMenu() {
            this.newActive = true
        },
        /**
        * See naming convetion of navbaritem
        */
        closeMenu() {
            this.newActive = false
        }
    }
}
</script>
