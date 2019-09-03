<template>
    <div
        class="navbar-item has-dropdown"
        :class="{
            'is-hoverable': hoverable,
            'is-active': newActive
        }"
        v-click-outside="closeMenu"
    >
        <a class="navbar-link" @click="newActive = true">
            <template v-if="label">{{ label }}</template>
            <slot v-else name="label" />
        </a>
        <div class="navbar-dropdown">
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
        active: Boolean
    },
    data() {
        return {
            newActive: this.active,
            _isNavDropdown: true // Used internally by NavbarItem
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
