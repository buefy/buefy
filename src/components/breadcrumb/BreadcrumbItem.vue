<template>
    <li
        :class="{ 'is-active': active }">
        <component
            :is="tag"
            :href="tag == 'a' ? href : undefined"
            :to="tag == 'router-link' ? to : undefined"
        >
            <slot />
        </component>
    </li>
</template>

<script>
import config from '../../utils/config'
export default {

    name: 'BBreadcrumbItem',
    props: {
        tag: {
            type: String,
            default: () => {
                return config.defaultBreadcrumbTag
            }
        },
        href: String,
        to: String,
        active: Boolean
    }
}
</script>
