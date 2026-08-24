<template>
    <a
        role="button"
        class="navbar-burger burger"
        :class="{ 'is-active': isOpened }"
        aria-label="menu"
        :aria-expanded="isOpened || undefined"
        v-bind="$attrs"
        tabindex="0"
    >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
    </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'NavbarBurger',
    // In vue/compat mode, INSTANCE_LISTENERS defaults to true and strips
    // event listeners out of $attrs, breaking the v-bind="$attrs" forwarding above.
    compatConfig: { INSTANCE_LISTENERS: false },
    props: {
        isOpened: {
            type: Boolean,
            default: false
        }
    }
})
</script>
