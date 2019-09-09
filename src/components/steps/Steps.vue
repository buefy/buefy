<template>
    <div class="b-steps" :class="wrapperClasses">
        <nav class="steps" :class="mainClasses">
            <ul class="step-items">
                <li
                    v-for="(childItem, index) in childItems"
                    :key="index"
                    v-show="childItem.visible"
                    class="step-item"
                    :class="[childItem.type || type, {
                        'is-active': activeChild === index,
                        'is-previous': activeChild > index
                }]">
                    <a
                        class="step-link"
                        :class="{'is-clickable': isItemClickable(childItem, index)}"
                        @click="isItemClickable(childItem, index) && childClick(index)">
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
import TabbedMixin from '../../utils/TabbedMixin.js'
import config from '../../utils/config'

export default {
    name: 'BSteps',
    mixins: [TabbedMixin],
    props: {
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
        ariaNextLabel: String,
        ariaPreviousLabel: String
    },
    data() {
        return {
            _isSteps: true // Used internally by StepItem
        }
    },
    computed: {
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
                    'is-rounded': this.rounded
                }
            ]
        },

        childItems() {
            return this.defaultSlots
                .filter((vnode) =>
                    vnode.componentInstance &&
                    vnode.componentInstance.$data &&
                    vnode.componentInstance.$data._isStepItem)
                .map((vnode) => vnode.componentInstance)
        },

        reversedChildItems() {
            return this.childItems.slice().reverse()
        },

        /**
         * Check the first visible step index.
         */
        firstVisibleStepIndex() {
            return this.childItems.map(
                (step, idx) => step.visible
            ).indexOf(true)
        },

        /**
         * Check if previous button is available.
         */
        hasPrev() {
            return this.firstVisibleStepIndex >= 0 &&
                this.activeChild > this.firstVisibleStepIndex
        },

        /**
         * Check the last visible step index.
         */
        lastVisibleStepIndex() {
            let idx = this.reversedChildItems.map(
                (step, idx) => step.visible
            ).indexOf(true)
            if (idx >= 0) {
                return this.childItems.length - 1 - idx
            }
            return idx
        },

        /**
         * Check if next button is available.
         */
        hasNext() {
            return this.lastVisibleStepIndex >= 0 &&
                this.activeChild < this.lastVisibleStepIndex
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
        isItemClickable(stepItem, index) {
            if (stepItem.clickable === undefined) {
                return this.activeChild > index
            }
            return stepItem.clickable
        },

        /**
         * Previous button click listener.
         */
        prev() {
            if (!this.hasPrev) return
            let prevItemIdx = this.reversedChildItems.map(
                (step, idx) => this.childItems.length - 1 - idx < this.activeChild && step.visible
            ).indexOf(true)
            if (prevItemIdx >= 0) {
                prevItemIdx = this.childItems.length - 1 - prevItemIdx
            }
            this.$emit('input', prevItemIdx)
            this.changeActive(prevItemIdx)
        },

        /**
         * Previous button click listener.
         */
        next() {
            if (!this.hasNext) return
            const nextItemIdx = this.childItems.map(
                (step, idx) => idx > this.activeChild && step.visible
            ).indexOf(true)
            this.$emit('input', nextItemIdx)
            this.changeActive(nextItemIdx)
        }
    }
}
</script>
