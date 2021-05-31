<template>
    <div class="menu">
        <slot />
    </div>
</template>

<script>
import MenuItemContainerMixin from './MenuItemContainerMixin'

export default {
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
}
</script>
