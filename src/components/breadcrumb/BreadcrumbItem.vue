<template>
    <li
        :class="{ 'is-active': active }">
        <component
            :is="tag"
            v-bind="$attrs"
            v-on="$listeners"
        >
            <slot />
        </component>
    </li>
</template>

<script>
import config from '../../utils/config'

export default {

    name: 'BBreadcrumbItem',

    inheritAttrs: false,

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
