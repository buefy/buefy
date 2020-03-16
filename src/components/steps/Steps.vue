<template>
    <div class="b-steps">
        <nav class="steps" :class="mainClasses">
            <ul class="step-items">
                <li
                    v-for="(stepItem, index) in stepItems"
                    :key="index"
                    v-show="stepItem.visible"
                    class="step-item"
                    :class="[stepItem.type || type, {
                        'is-active': activeStep === index,
                        'is-previous': activeStep > index
                }]">
                    <a
                        class="step-link"
                        :class="{'is-clickable': isItemClickable(stepItem, index)}"
                        @click="isItemClickable(stepItem, index) && stepClick(index)">
                        <div class="step-marker">
                            <b-icon
                                v-if="stepItem.icon"
                                :icon="stepItem.icon"
                                :pack="stepItem.iconPack"
                                :size="size"/>
                        </div>
                        <div class="step-details">
                            <span class="step-title">{{ stepItem.label }}</span>
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
import SlotComponent from '../../utils/SlotComponent'
import config from '../../utils/config'

export default {
    name: 'BSteps',
    components: {
        [Icon.name]: Icon,
        [SlotComponent.name]: SlotComponent
    },
    props: {
        value: Number,
        type: [String, Object],
        size: String,
        animated: {
            type: Boolean,
            default: true
        },
        destroyOnHide: {
            type: Boolean,
            default: false
        },
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
        ariaNextLabel: String,
        ariaPreviousLabel: String
    },
    data() {
        return {
            activeStep: this.value || 0,
            defaultSlots: [],
            contentHeight: 0,
            isTransitioning: false,
            _isSteps: true // Used internally by StepItem
        }
    },
    computed: {
        mainClasses() {
            return [
                this.type,
                this.size
            ]
        },

        stepItems() {
            return this.defaultSlots
                .filter((vnode) =>
                    vnode.componentInstance &&
                    vnode.componentInstance.$data &&
                    vnode.componentInstance.$data._isStepItem)
                .map((vnode) => vnode.componentInstance)
        },

        reversedStepItems() {
            return this.stepItems.slice().reverse()
        },

        /**
         * Check the first visible step index.
         */
        firstVisibleStepIndex() {
            return this.stepItems.map(
                (step, idx) => step.visible
            ).indexOf(true)
        },

        /**
         * Check if previous button is available.
         */
        hasPrev() {
            return this.firstVisibleStepIndex >= 0 &&
                this.activeStep > this.firstVisibleStepIndex
        },

        /**
         * Check the last visible step index.
         */
        lastVisibleStepIndex() {
            let idx = this.reversedStepItems.map(
                (step, idx) => step.visible
            ).indexOf(true)
            if (idx >= 0) {
                return this.stepItems.length - 1 - idx
            }
            return idx
        },

        /**
         * Check if next button is available.
         */
        hasNext() {
            return this.lastVisibleStepIndex >= 0 &&
                this.activeStep < this.lastVisibleStepIndex
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
    watch: {
        /**
        * When v-model is changed set the new active step.
        */
        value(value) {
            this.changeStep(value)
        },

        /**
        * When step-items are updated, set active one.
        */
        stepItems() {
            if (this.activeStep < this.stepItems.length) {
                this.stepItems[this.activeStep].isActive = true
            }
        }
    },
    methods: {
        refreshSlots() {
            this.defaultSlots = this.$slots.default || []
        },

        /**
         * Change the active step and emit change event.
         */
        changeStep(newIndex) {
            if (this.activeStep === newIndex) return

            if (newIndex > this.stepItems.length) throw new Error('The index you trying to set is bigger than the steps length')

            if (this.activeStep < this.stepItems.length) {
                this.stepItems[this.activeStep].deactivate(this.activeStep, newIndex)
            }
            this.stepItems[newIndex].activate(this.activeStep, newIndex)
            this.activeStep = newIndex
            this.$emit('change', newIndex)
        },

        /**
         * Return if the step should be clickable or not.
         */
        isItemClickable(stepItem, index) {
            if (stepItem.clickable === undefined) {
                return this.activeStep > index
            }
            return stepItem.clickable
        },

        /**
         * Step click listener, emit input event and change active step.
         */
        stepClick(value) {
            this.$emit('input', value)
            this.changeStep(value)
        },

        /**
         * Previous button click listener.
         */
        prev() {
            if (!this.hasPrev) return
            let prevItemIdx = this.reversedStepItems.map(
                (step, idx) => this.stepItems.length - 1 - idx < this.activeStep && step.visible
            ).indexOf(true)
            if (prevItemIdx >= 0) {
                prevItemIdx = this.stepItems.length - 1 - prevItemIdx
            }
            this.$emit('input', prevItemIdx)
            this.changeStep(prevItemIdx)
        },

        /**
         * Previous button click listener.
         */
        next() {
            if (!this.hasNext) return
            const nextItemIdx = this.stepItems.map(
                (step, idx) => idx > this.activeStep && step.visible
            ).indexOf(true)
            this.$emit('input', nextItemIdx)
            this.changeStep(nextItemIdx)
        }
    },
    mounted() {
        if (this.activeStep < this.stepItems.length) {
            this.stepItems[this.activeStep].isActive = true
        }
        this.refreshSlots()
    }
}
</script>
