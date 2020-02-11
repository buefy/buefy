<template>
    <component
        :is="tag"
        role="button"
        :href="href"
        :disabled="isDisabled"
        class="pagination-link"
        :class="{ 'is-current': page.isCurrent, [page.class]: true }"
        v-bind="$attrs"
        @click.prevent="page.click"
        :aria-label="page['aria-label']"
        :aria-current="page.isCurrent">
        <slot>{{ page.number }}</slot>
    </component>
</template>

<script>
import config from '../../utils/config'

export default {
    name: 'BPaginationButton',
    props: {
        page: {
            type: Object,
            required: true
        },
        tag: {
            type: String,
            default: 'a',
            validator: (value) => {
                return config.defaultLinkTags.indexOf(value) >= 0
            }
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        href() {
            if (this.tag === 'a') {
                return '#'
            }
        },
        isDisabled() {
            return this.disabled || this.page.disabled
        }
    }
}
</script>
