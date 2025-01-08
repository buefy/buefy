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

<script lang="ts">
import { defineComponent } from 'vue'

import BIcon from '../icon/Icon.vue'

export default defineComponent({
    name: 'BMenuList',
    components: {
        BIcon
    },
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
})
</script>
