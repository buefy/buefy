<template>
    <p v-if="label || $slots.label" class="menu-label">
        <template v-if="label">
            <template v-if="icon">
                <b-icon
                    :icon="icon"
                    :pack="iconPack"
                    :size="size"
                />
                <span>{{ label }}</span>
            </template>
            <template v-else>
                {{ label }}
            </template>
        </template>
        <slot v-else name="label" />
    </p>
    <ul class="menu-list" :role="ariaRole === 'menu' ? ariaRole : undefined">
        <slot />
    </ul>
</template>

<script>
export default {
    name: 'BMenuList',
    props: {
        label: String,
        icon: String,
        iconPack: String,
        ariaRole: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'is-small'
        }
    }
}
</script>
