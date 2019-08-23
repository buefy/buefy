<template>
    <component
        :is="tag"
        v-bind="$attrs"
        role="button"
        :href="href"
        class="pagination-link"
        :class="{ 'is-current': page.isCurrent }"
        @click.prevent="page.click"
        :aria-label="getAriaPageLabel(page.number, page.isCurrent)"
        :aria-current="page.isCurrent">
        <slot>{{ page.number }}</slot>
    </component>
</template>

<script>
export default {
    name: 'BPaginationButton',
    props: {
        page: Object,
        tag: {
            type: String,
            default: 'a',
            validator: (value) => {
                return [
                    'a',
                    'button',
                    'input',
                    'router-link',
                    'nuxt-link',
                    'n-link',
                    'NuxtLink',
                    'NLink'
                ].indexOf(value) >= 0
            }
        }
    },
    computed: {
        href() {
            if (this.tag === 'a') {
                return '#'
            }
        }
    },
    methods: {
        /**
        * Get text for aria-label according to page number.
        */
        getAriaPageLabel(pageNumber, isCurrent) {
            if (this.ariaPageLabel && (!isCurrent || !this.ariaCurrentLabel)) {
                return this.ariaPageLabel + ' ' + pageNumber + '.'
            } else if (this.ariaPageLabel && isCurrent && this.ariaCurrentLabel) {
                return this.ariaCurrentLabel + ', ' + this.ariaPageLabel + ' ' + pageNumber + '.'
            }
            return null
        }
    }
}
</script>
