<template>
    <div :class="{ menu: true, 'is-dark': isDark }">
        <slot name="title" />
        <div class="divider" />
        <ul class="menu-list">
            <slot />
        </ul>
    </div>
</template>

<script>

    export default {
        name: 'BMenu',
        props: {
            isDark: Boolean
        }
    }

</script>
