<template>
    <nav class="pagination" :class="rootClasses">
        <slot
            v-if="$scopedSlots.previous"
            name="previous"
            :page="getPage(current - 1, {
                disabled: !hasPrev,
                class: 'pagination-previous',
                'aria-label': ariaPreviousLabel
        })">
            <b-icon
                :icon="iconPrev"
                :pack="iconPack"
                both
                aria-hidden="true"/>
        </slot>
        <BPaginationButton
            v-else
            class="pagination-previous"
            :disabled="!hasPrev"
            :page="getPage(current - 1)"
            :aria-label="ariaPreviousLabel">
            <b-icon
                :icon="iconPrev"
                :pack="iconPack"
                both
                aria-hidden="true"/>
        </BPaginationButton>
        <slot
            v-if="$scopedSlots.next"
            name="next"
            :page="getPage(current + 1, {
                disabled: !hasNext,
                class: 'pagination-next',
                'aria-label': ariaNextLabel
        })">
            <b-icon
                :icon="iconNext"
                :pack="iconPack"
                both
                aria-hidden="true"/>
        </slot>
        <BPaginationButton
            v-else
            class="pagination-next"
            :disabled="!hasNext"
            :page="getPage(current + 1)"
            :aria-label="ariaNextLabel">
            <b-icon
                :icon="iconNext"
                :pack="iconPack"
                both
                aria-hidden="true"/>
        </BPaginationButton>

        <small class="info" v-if="simple">
            <template v-if="perPage == 1">
                {{ firstItem }} / {{ total }}
            </template>
            <template v-else>
                {{ firstItem }}-{{ Math.min(current * perPage, total) }} / {{ total }}
            </template>
        </small>
        <ul class="pagination-list" v-else>
            <!--First-->
            <li v-if="hasFirst">
                <slot
                    v-if="$scopedSlots.default"
                    :page="getPage(1)"
                />
                <BPaginationButton
                    v-else
                    :page="getPage(1)" />
            </li>
            <li v-if="hasFirstEllipsis"><span class="pagination-ellipsis">&hellip;</span></li>

            <!--Pages-->
            <li v-for="page in pagesInRange" :key="page.number">
                <slot
                    v-if="$scopedSlots.default"
                    :page="page"
                />
                <BPaginationButton
                    v-else
                    :page="page" />
            </li>

            <!--Last-->
            <li v-if="hasLastEllipsis"><span class="pagination-ellipsis">&hellip;</span></li>
            <li v-if="hasLast">
                <slot
                    v-if="$scopedSlots.default"
                    :page="getPage(pageCount)"
                />
                <BPaginationButton
                    v-else
                    :page="getPage(pageCount)" />
            </li>
        </ul>
    </nav>
</template>

<script>
import PaginationButton from './PaginationButton'
import Icon from '../icon/Icon'
import config from '../../utils/config'

export default {
    name: 'BPagination',
    components: {
        [Icon.name]: Icon,
        [PaginationButton.name]: PaginationButton
    },
    // deprecated, to replace with default 'value' in the next breaking change
    model: {
        prop: 'current',
        event: 'update:current'
    },
    props: {
        total: [Number, String],
        perPage: {
            type: [Number, String],
            default: 20
        },
        current: {
            type: [Number, String],
            default: 1
        },
        rangeBefore: {
            type: [Number, String],
            default: 1
        },
        rangeAfter: {
            type: [Number, String],
            default: 1
        },
        size: String,
        simple: Boolean,
        rounded: Boolean,
        order: String,
        iconPack: String,
        iconPrev: {
            type: String,
            default: () => {
                return config.defaultIconPrev
            }
        },
        iconNext: {
            type: String,
            default: () => {
                return config.defaultIconNext
            }
        },
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String
    },
    computed: {
        rootClasses() {
            return [
                this.order,
                this.size,
                {
                    'is-simple': this.simple,
                    'is-rounded': this.rounded
                }
            ]
        },

        beforeCurrent() {
            return parseInt(this.rangeBefore)
        },

        afterCurrent() {
            return parseInt(this.rangeAfter)
        },

        /**
        * Total page size (count).
        */
        pageCount() {
            return Math.ceil(this.total / this.perPage)
        },

        /**
        * First item of the page (count).
        */
        firstItem() {
            const firstItem = this.current * this.perPage - this.perPage + 1
            return firstItem >= 0 ? firstItem : 0
        },

        /**
        * Check if previous button is available.
        */
        hasPrev() {
            return this.current > 1
        },

        /**
        * Check if first page button should be visible.
        */
        hasFirst() {
            return this.current >= (2 + this.beforeCurrent)
        },

        /**
        * Check if first ellipsis should be visible.
        */
        hasFirstEllipsis() {
            return this.current >= (this.beforeCurrent + 4)
        },

        /**
        * Check if last page button should be visible.
        */
        hasLast() {
            return this.current <= this.pageCount - (1 + this.afterCurrent)
        },

        /**
        * Check if last ellipsis should be visible.
        */
        hasLastEllipsis() {
            return this.current < this.pageCount - (2 + this.afterCurrent)
        },

        /**
        * Check if next button is available.
        */
        hasNext() {
            return this.current < this.pageCount
        },

        /**
        * Get near pages, 1 before and 1 after the current.
        * Also add the click event to the array.
        */
        pagesInRange() {
            if (this.simple) return

            let left = Math.max(1, this.current - this.beforeCurrent)
            if (left - 1 === 2) {
                left-- // Do not show the ellipsis if there is only one to hide
            }
            let right = Math.min(this.current + this.afterCurrent, this.pageCount)
            if (this.pageCount - right === 2) {
                right++ // Do not show the ellipsis if there is only one to hide
            }

            const pages = []
            for (let i = left; i <= right; i++) {
                pages.push(this.getPage(i))
            }
            return pages
        }
    },
    watch: {
        /**
        * If current page is trying to be greater than page count, set to last.
        */
        pageCount(value) {
            if (this.current > value) this.last()
        }
    },
    methods: {
        /**
        * Previous button click listener.
        */
        prev(event) {
            this.changePage(this.current - 1, event)
        },
        /**
        * Next button click listener.
        */
        next(event) {
            this.changePage(this.current + 1, event)
        },
        /**
        * First button click listener.
        */
        first(event) {
            this.changePage(1, event)
        },
        /**
        * Last button click listener.
        */
        last(event) {
            this.changePage(this.pageCount, event)
        },

        changePage(num, event) {
            if (this.current === num || num < 1 || num > this.pageCount) return
            this.$emit('update:current', num)
            this.$emit('change', num)

            // Set focus on element to keep tab order
            if (event && event.target) {
                this.$nextTick(() => event.target.focus())
            }
        },

        getPage(num, options = {}) {
            return {
                number: num,
                isCurrent: this.current === num,
                click: (event) => this.changePage(num, event),
                disabled: options.disabled || false,
                class: options.class || '',
                'aria-label': options['aria-label'] || this.getAriaPageLabel(num, this.current === num)
            }
        },

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
