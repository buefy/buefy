<template>
    <div class="b-menu-list">
        <p v-if="label" class="menu-label">
            {{ label }}
        </p>
        <ul class="menu-list">
            <slot></slot>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'bMenuList',
    props: {
        label: String
    }
}
</script>
