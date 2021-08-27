<template>
    <nav :class="breadcrumbClasses">
        <ul>
            <template v-for="(item, index) in items">
                <li
                    v-if="item"
                    :key="item"
                    :class="{ 'is-active': index === items.length - 1 }">
                    <component
                        :is="tag"
                        :href="tag == 'a' ? item.path : undefined"
                        :to="tag == 'router-link' ? item.path : undefined"
                    >
                        {{ item.label }}
                    </component>
                </li>
            </template>
        </ul>
    </nav>
</template>

<script>
import config from '../../utils/config'

export default {

    name: 'BBreadcrumb',

    props: {
        tag: {
            type: String,
            default: () => {
                return config.defaultBreadcrumbTag
            }
        },
        items: Array,
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
