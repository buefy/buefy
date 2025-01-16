<template>
    <component
        :is="tag"
        role="button"
        :href="href"
        :disabled="disabledOrUndefined"
        class="pagination-link"
        :class="{ 'is-current': page.isCurrent, [page.class]: true }"
        v-bind="$attrs"
        @click.prevent="page.click"
        :aria-label="page['aria-label']"
        :aria-current="page.isCurrent || undefined"
    >
        <slot>{{ page.number }}</slot>
    </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import config from '../../utils/config'
import type { PaginationPage } from './types'

export default defineComponent({
    name: 'BPaginationButton',
    props: {
        page: {
            type: Object as PropType<PaginationPage>,
            required: true
        },
        tag: {
            type: String,
            default: 'a',
            validator: (value) => {
                return config.defaultLinkTags.indexOf(value as string) >= 0
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
            } else {
                return undefined
            }
        },
        isDisabled() {
            return this.disabled || this.page.disabled
        },
        disabledOrUndefined() {
            return this.isDisabled || undefined
        }
    }
})
</script>
