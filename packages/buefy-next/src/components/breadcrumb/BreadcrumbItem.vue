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

<script>
import config from '../../utils/config'
import CompatFallthroughMixin from '../../utils/CompatFallthroughMixin'

export default {
    name: 'BBreadcrumbItem',
    mixins: [CompatFallthroughMixin],
    props: {
        tag: {
            type: String,
            default: () => {
                return config.defaultBreadcrumbTag
            }
        },
        active: Boolean
    }
}
</script>
