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
        <nav v-if="hasNavigation" class="step-navigation">
            <a
                role="button"
                href="#"
                class="pagination-previous"
                :disabled="!hasPrev"
                @click.prevent="prev"
                :aria-label="ariaPreviousLabel">
                <b-icon
                    icon="chevron-left"
                    :pack="iconPack"
                    both
                    aria-hidden="true"/>
            </a>
            <a
                role="button"
                href="#"
                class="pagination-next"
                :disabled="!hasNext"
                @click.prevent="next"
                :aria-label="ariaNextLabel">
                <b-icon
                    icon="chevron-right"
                    :pack="iconPack"
                    both
                    aria-hidden="true"/>
            </a>
        </nav>
    </div>
</template>

<script>
import Icon from '../icon/Icon'
import SlotComponent from '../../utils/SlotComponent'

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
            stepItems: [],
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

        reversedStepItems() {
            return this.stepItems.slice().reverse()
        },

        /**
            * Check the first visible step index.
            */
        firstVisibleStepIndex() {
            return this.stepItems.findIndex((step, idx) => {
                return step.visible
            })
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
            let idx = this.reversedStepItems.findIndex((step, idx) => {
                return step.visible
            })
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
        /**
        * Change the active step and emit change event.
        */
        changeStep(newIndex) {
            if (this.activeStep === newIndex) return

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
            let prevItemIdx = this.reversedStepItems.findIndex((step, idx) => {
                return this.stepItems.length - 1 - idx < this.activeStep && step.visible
            })
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
            const nextItemIdx = this.stepItems.findIndex((step, idx) => {
                return idx > this.activeStep && step.visible
            })
            this.$emit('input', nextItemIdx)
            this.changeStep(nextItemIdx)
        }
    },
    mounted() {
        if (this.activeStep < this.stepItems.length) {
            this.stepItems[this.activeStep].isActive = true
        }
    }
}
</script>
