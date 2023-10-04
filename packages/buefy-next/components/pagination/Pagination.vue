<template>
    <nav class="pagination" :class="rootClasses">
        <slot
            v-if="$slots.previous"
            name="previous"
            :page="
                getPage(modelValue - 1, {
                    disabled: !hasPrev,
                    class: 'pagination-previous',
                    'aria-label': ariaPreviousLabel,
                })
            "
        >
            <b-icon
                :icon="iconPrev"
                :pack="iconPack"
                both
                aria-hidden="true"
            />
        </slot>
        <BPaginationButton
            v-else
            class="pagination-previous"
            :disabled="!hasPrev"
            :page="getPage(modelValue - 1)"
            :aria-label="ariaPreviousLabel"
        >
            <b-icon
                :icon="iconPrev"
                :pack="iconPack"
                both
                aria-hidden="true"
            />
        </BPaginationButton>
        <slot
            v-if="$slots.next"
            name="next"
            :page="
                getPage(modelValue + 1, {
                    disabled: !hasNext,
                    class: 'pagination-next',
                    'aria-label': ariaNextLabel,
                })
            "
        >
            <b-icon
                :icon="iconNext"
                :pack="iconPack"
                both
                aria-hidden="true"
            />
        </slot>
        <BPaginationButton
            v-else
            class="pagination-next"
            :disabled="!hasNext"
            :page="getPage(modelValue + 1)"
            :aria-label="ariaNextLabel"
        >
            <b-icon
                :icon="iconNext"
                :pack="iconPack"
                both
                aria-hidden="true"
            />
        </BPaginationButton>

        <div class="control pagination-input">
            <input
                v-if="pageInput"
                class="input"
                :value="inputValue"
                @input="handleAllowableInputPageRange"
                @keypress="handleOnKeyPress"
                :size="pageCount.toString().length"
                :maxlength="pageCount.toString().length"
            >
        </div>

        <small class="info" v-if="simple">
            <template v-if="perPage == 1"> {{ firstItem }} / {{ total }} </template>
            <template v-else>
                {{ firstItem }}-{{ Math.min(modelValue * perPage, total) }} / {{ total }}
            </template>
        </small>
        <ul class="pagination-list" v-else>
            <!--First-->
            <li v-if="hasFirst">
                <slot v-if="$slots.default" :page="getPage(1)" />
                <BPaginationButton v-else :page="getPage(1)" />
            </li>
            <li v-if="hasFirstEllipsis">
                <span class="pagination-ellipsis">&hellip;</span>
            </li>

            <!--Pages-->
            <li v-for="page in pagesInRange" :key="page.number">
                <slot v-if="$slots.default" :page="page" />
                <BPaginationButton v-else :page="page" />
            </li>

            <!--Last-->
            <li v-if="hasLastEllipsis">
                <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li v-if="hasLast">
                <slot v-if="$slots.default" :page="getPage(pageCount)" />
                <BPaginationButton v-else :page="getPage(pageCount)" />
            </li>
        </ul>
    </nav>
</template>

<script>
import PaginationButton from './PaginationButton.vue'
import Icon from '../icon/Icon.vue'
import config from '../../utils/config'
import debounce from '../../utils/debounce'

export default {
    name: 'BPagination',
    components: {
        [Icon.name]: Icon,
        [PaginationButton.name]: PaginationButton
    },
    props: {
        total: [Number, String],
        perPage: {
            type: [Number, String],
            default: 20
        },
        modelValue: {
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
        ariaCurrentLabel: String,
        pageInput: {
            type: Boolean,
            default: false
        },
        pageInputPosition: String,
        debouncePageInput: [Number, String]
    },
    data() {
        return {
            inputValue: this.modelValue
        }
    },
    emits: ['change', 'update:modelValue'],
    computed: {
        rootClasses() {
            return [
                this.order,
                this.size,
                this.pageInputPosition,
                {
                    'is-simple': this.simple,
                    'is-rounded': this.rounded,
                    'has-input': this.pageInput
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
            const firstItem = this.modelValue * this.perPage - this.perPage + 1
            return firstItem >= 0 ? firstItem : 0
        },

        /**
        * Check if previous button is available.
        */
        hasPrev() {
            return this.modelValue > 1
        },

        /**
         * Check if first page button should be visible.
        */
        hasFirst() {
            return this.modelValue >= 2 + this.beforeCurrent
        },

        /**
        * Check if first ellipsis should be visible.
        */
        hasFirstEllipsis() {
            return this.modelValue >= this.beforeCurrent + 4
        },

        /**
        * Check if last page button should be visible.
        */
        hasLast() {
            return this.modelValue <= this.pageCount - (1 + this.afterCurrent)
        },

        /**
        * Check if last ellipsis should be visible.
        */
        hasLastEllipsis() {
            return this.modelValue < this.pageCount - (2 + this.afterCurrent)
        },

        /**
        * Check if next button is available.
        */
        hasNext() {
            return this.modelValue < this.pageCount
        },

        /**
        * Get near pages, 1 before and 1 after the current.
        * Also add the click event to the array.
        */
        pagesInRange() {
            if (this.simple) return

            let left = Math.max(1, this.modelValue - this.beforeCurrent)
            if (left - 1 === 2) {
                left-- // Do not show the ellipsis if there is only one to hide
            }
            let right = Math.min(this.modelValue + this.afterCurrent, this.pageCount)
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
            if (this.modelValue > value) this.last()
        },

        modelValue(value) {
            this.inputValue = value
        },

        debouncePageInput: {
            handler(value) {
                this.debounceHandlePageInput = debounce(
                    this.handleOnInputPageChange,
                    value
                )
            },
            immediate: true
        }
    },
    methods: {
        /**
        * Previous button click listener.
        */
        prev(event) {
            this.changePage(this.modelValue - 1, event)
        },
        /**
         * Next button click listener.
        */
        next(event) {
            this.changePage(this.modelValue + 1, event)
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
            if (this.modelValue === num || num < 1 || num > this.pageCount) return

            this.$emit('update:modelValue', num)
            this.$emit('change', num)

            // Set focus on element to keep tab order
            if (event && event.target) {
                this.$nextTick(() => event.target.focus())
            }
        },

        getPage(num, options = {}) {
            return {
                number: num,
                isCurrent: this.modelValue === num,
                click: (event) => this.changePage(num, event),
                input: (event, inputNum) => this.changePage(+inputNum, event),
                disabled: options.disabled || false,
                class: options.class || '',
                'aria-label':
          options['aria-label'] ||
          this.getAriaPageLabel(num, this.modelValue === num)
            }
        },

        /**
        * Get text for aria-label according to page number.
        */
        getAriaPageLabel(pageNumber, isCurrent) {
            if (this.ariaPageLabel && (!isCurrent || !this.ariaCurrentLabel)) {
                return this.ariaPageLabel + ' ' + pageNumber + '.'
            } else if (this.ariaPageLabel && isCurrent && this.ariaCurrentLabel) {
                return (
                    this.ariaCurrentLabel +
          ', ' +
          this.ariaPageLabel +
          ' ' +
          pageNumber +
          '.'
                )
            }
            return null
        },

        handleOnInputPageChange(event) {
            this.getPage(this.inputValue).input(event, this.inputValue)
        },

        handleOnInputDebounce(event) {
            if (this.debouncePageInput) {
                this.debounceHandlePageInput(event)
            } else {
                this.handleOnInputPageChange(event)
            }
        },
        handleOnKeyPress(event) {
            // --- This is required to only allow numeric inputs for the page input - --- //
            // --- size attribute does not work with input type number. --- //
            const ASCIICode = event.which || event.keyCode

            if (ASCIICode >= 48 && ASCIICode <= 57) {
                return true
            } else {
                return event.preventDefault()
            }
        },
        handleAllowableInputPageRange(event) {
            if (+event.target.value > 0 && +event.target.value <= this.pageCount) {
                this.handleOnInputValue(event)
            } else {
                // --- It is nessacery to set inputValue to 1 and then to '' so that the DOM- --- //
                // --- will update the input component even when Backspace is used and then-
                // --- 0 us entered. --- //
                this.inputValue = 1
                this.inputValue = ''
            }
        },
        handleOnInputValue(event) {
            const inputValue = +event.target.value
            this.inputValue = inputValue
            if (Number.isInteger(this.inputValue)) {
                this.handleOnInputDebounce(event)
            } else {
                // --- if NaN, then set inputValue back to current --- //
                this.inputValue = this.modelValue
            }
        }
    }
}
</script>
