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
    </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'NavbarBurger',
    props: {
        isOpened: {
            type: Boolean,
            default: false
        }
    }
})
</script>
