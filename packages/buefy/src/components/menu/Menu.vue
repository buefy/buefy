<template>
    <div class="menu">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import MenuItemContainerMixin from './MenuItemContainerMixin'

export default defineComponent({
    name: 'BMenu',
    mixins: [MenuItemContainerMixin],
    props: {
        accordion: {
            type: Boolean,
            default: true
        },
        activable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            _isMenu: true // Used by MenuItem
        }
    }
})
</script>
