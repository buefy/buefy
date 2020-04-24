<template>
    <div class="menu">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'BMenu',
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
