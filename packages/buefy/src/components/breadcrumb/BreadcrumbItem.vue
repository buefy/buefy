<template>
    <li
        :class="{ 'is-active': active }"
        v-bind="rootAttrs"
    >
        <component
            :is="tag"
            v-bind="fallthroughAttrs"
        >
            <slot />
        </component>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import config from '../../utils/config'
import CompatFallthroughMixin from '../../utils/CompatFallthroughMixin'

export default defineComponent({
    name: 'BBreadcrumbItem',
    // In vue/compat mode, INSTANCE_LISTENERS defaults to true and strips
    // event listeners out of $attrs, breaking the v-bind="fallthroughAttrs" forwarding below.
    compatConfig: { INSTANCE_LISTENERS: false },
    mixins: [CompatFallthroughMixin],
    props: {
        tag: {
            type: [String, Object],
            default: () => {
                return config.defaultBreadcrumbTag
            }
        },
        active: Boolean
    }
})
</script>
