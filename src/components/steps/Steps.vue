<template>
    <div class="b-steps" :class="wrapperClasses">
        <nav class="steps" :class="mainClasses">
            <ul class="step-items">
                <li
                    v-for="childItem in items"
                    :key="childItem.value"
                    v-show="childItem.visible"
                    class="step-item"
                    :class="[childItem.type || type, childItem.headerClass, {
                        'is-active': childItem.isActive,
                        'is-previous': activeItem.index > childItem.index
                }]">
                    <a
                        class="step-link"
                        :class="{'is-clickable': isItemClickable(childItem)}"
                        @click="isItemClickable(childItem) && childClick(childItem)">
                        <div class="step-marker">
                            <b-icon
                                v-if="childItem.icon"
                                :icon="childItem.icon"
                                :pack="childItem.iconPack"
                                :size="size"/>
                            <span v-else-if="childItem.step">{{ childItem.step }}</span>
                        </div>
                        <div class="step-details">
                            <span class="step-title">{{ childItem.label }}</span>
                        </div>
                    </a>
                </li>
            </ul>
        </nav>
        <section class="step-content" :class="{'is-transitioning': isTransitioning}">
            <slot/>
        </section>
        <slot
            name="navigation"
            :previous="navigationProps.previous"
            :next="navigationProps.next">
            <nav v-if="hasNavigation" class="step-navigation">
                <a
                    role="button"
                    class="pagination-previous"
                    :disabled="navigationProps.previous.disabled"
                    @click.prevent="navigationProps.previous.action"
                    :aria-label="ariaPreviousLabel">
                    <b-icon
                        :icon="iconPrev"
                        :pack="iconPack"
                        both
                        aria-hidden="true"/>
                </a>
                <a
                    role="button"
                    class="pagination-next"
                    :disabled="navigationProps.next.disabled"
                    @click.prevent="navigationProps.next.action"
                    :aria-label="ariaNextLabel">
                    <b-icon
                        :icon="iconNext"
                        :pack="iconPack"
                        both
                        aria-hidden="true"/>
                </a>
            </nav>
        </slot>
    </div>
</template>

<script>
import Icon from '../icon/Icon'

import TabbedMixin from '../../utils/TabbedMixin.js'
import config from '../../utils/config'

export default {
    name: 'BSteps',
    components: {
        [Icon.name]: Icon
    },
    mixins: [TabbedMixin('step')],
    props: {
        type: [String, Object],
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
        hasNavigation: {
            type: Boolean,
            default: true
        },
        labelPosition: {
            type: String,
            validator(value) {
                return [
                    'bottom',
                    'right',
                    'left'
                ].indexOf(value) > -1
            },
            default: 'bottom'
        },
        rounded: {
            type: Boolean,
            default: true
        },
        mobileMode: {
            type: String,
            validator(value) {
                return [
                    'minimalist',
                    'compact'
                ].indexOf(value) > -1
            },
            default: 'minimalist'
        },
        ariaNextLabel: String,
        ariaPreviousLabel: String
    },
    computed: {
        // Override mixin implementation to always have a value
        activeItem() {
            return this.childItems.filter((i) => i.value === this.activeId)[0] || this.items[0]
        },
        wrapperClasses() {
            return [
                this.size,
                {
                    'is-vertical': this.vertical,
                    [this.position]: this.position && this.vertical
                }
            ]
        },
        mainClasses() {
            return [
                this.type,
                {
                    'has-label-right': this.labelPosition === 'right',
                    'has-label-left': this.labelPosition === 'left',
                    'is-animated': this.animated,
                    'is-rounded': this.rounded,
                    [`mobile-${this.mobileMode}`]: this.mobileMode !== null
                }
            ]
        },

        /**
         * Check if previous button is available.
         */
        hasPrev() {
            return this.prevItemIdx !== null
        },

        /**
         * Retrieves the next visible item index
         */
        nextItemIdx() {
            let idx = this.activeItem ? this.items.indexOf(this.activeItem) : 0
            return this.getNextItemIdx(idx)
        },

        /**
         * Retrieves the next visible item
         */
        nextItem() {
            let nextItem = null
            if (this.nextItemIdx !== null) {
                nextItem = this.items[this.nextItemIdx]
            }
            return nextItem
        },

        /**
        * Retrieves the next visible item index
        */
        prevItemIdx() {
            if (!this.activeItem) { return null }
            let idx = this.items.indexOf(this.activeItem)
            return this.getPrevItemIdx(idx)
        },

        /**
         * Retrieves the previous visible item
         */
        prevItem() {
            if (!this.activeItem) { return null }

            let prevItem = null
            if (this.prevItemIdx !== null) {
                prevItem = this.items[this.prevItemIdx]
            }
            return prevItem
        },

        /**
         * Check if next button is available.
         */
        hasNext() {
            return this.nextItemIdx !== null
        },

        navigationProps() {
            return {
                previous: {
                    disabled: !this.hasPrev,
                    action: this.prev
                },
                next: {
                    disabled: !this.hasNext,
                    action: this.next
                }
            }
        }
    },
    methods: {
        /**
         * Return if the step should be clickable or not.
         */
        isItemClickable(stepItem) {
            if (stepItem.clickable === undefined) {
                return stepItem.index < this.activeItem.index
            }
            return stepItem.clickable
        },

        /**
         * Previous button click listener.
         */
        prev() {
            if (this.hasPrev) {
                this.activeId = this.prevItem.value
            }
        },

        /**
         * Previous button click listener.
         */
        next() {
            if (this.hasNext) {
                this.activeId = this.nextItem.value
            }
        }
    }
}
</script>
