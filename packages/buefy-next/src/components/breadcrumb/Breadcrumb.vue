<template>
    <nav :class="breadcrumbClasses">
        <ul>
            <slot />
        </ul>
    </nav>
</template>

<script>
import config from '../../utils/config'

export default {
    name: 'BBreadcrumb',
    props: {
        align: {
            type: String,
            default: () => {
                return config.defaultBreadcrumbAlign
            }
        },
        separator: {
            type: String,
            default: () => {
                return config.defaultBreadcrumbSeparator
            }
        },
        size: {
            type: String,
            default: () => {
                return config.defaultBreadcrumbSize
            }
        }
    },

    computed: {
        breadcrumbClasses() {
            return ['breadcrumb', this.align, this.separator, this.size]
        }
    }
}
</script>
