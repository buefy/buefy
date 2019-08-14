<template>
    <component
        :is="tag"
        class="navbar-item"
        v-bind="$attrs"
    >
        <slot/>
    </component>
</template>

<script>
export default {
    name: 'BNavbarItem',
    inheritAttrs: false,
    props: {
        tag: {
            type: String,
            default: 'a'
        }
    }
}
</script>
