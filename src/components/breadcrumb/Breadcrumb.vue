<template>
    <nav :class="breadcrumbClasses">
        <ul>
            <template v-for="(item, index) in items">
                <li
                    v-if="item"
                    :key="item"
                    :class="{ 'is-active': index === items.length - 1 }">
                    <router-link
                        :to="item.path"
                        tag="a">
                        {{ item.label }}
                    </router-link>
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

    data() {
        return {
            bulmaKnownAlignments: ['is-left', 'is-centered', 'is-right'],
            bulmaKnownSeparators: ['has-arrow-separator', 'has-bullet-separator', 'has-dot-separator', 'has-succeeds-separator'],
            bulmaKnownSizes: ['is-small', 'is-medium', 'is-large']
        }
    },
    computed: {
        computedAlign() {
            return this.bulmaKnownAlignments.includes(this.align)
                ? this.align
                : config.defaultBreadcrumbAlign
        },
        computedSeparator() {
            return this.bulmaKnownSeparators.includes(this.separator)
                ? this.separator
                : config.defaultBreadcrumbSeparator
        },
        computedSize() {
            return this.bulmaKnownSizes.includes(this.size)
                ? this.size
                : config.defaultBreadcrumbSize
        },
        breadcrumbClasses() {
            return {
                'breadcrumb': true,
                [this.computedAlign]: true,
                [this.computedSeparator]: true,
                [this.computedSize]: true
            }
        }
    }
}
</script>
