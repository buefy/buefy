<template>
    <span ref="tooltip" :class="rootClasses">
        <transition :name="animation">
            <div
                v-show="isActive || always"
                ref="content"
                class="tooltip-content"
                :style="style">
                <template v-if="label">{{ label }}</template>
                <template v-else-if="$slots.content">
                    <slot name="content" />
                </template>
            </div>
        </transition>
        <div
            ref="trigger"
            class="tooltip-trigger"
            @mouseenter="isActive = true"
            @mouseleave="isActive = false">
            <slot ref="slot" />
        </div>
    </span>
</template>

<script>
import config from '../../utils/config'
import { createAbsoluteElement, removeElement } from '../../utils/helpers'

export default {
    name: 'BTooltip',
    props: {
        type: {
            type: String,
            default: () => config.defaultTooltipType
        },
        label: String,
        position: {
            type: String,
            default: 'is-top',
            validator(value) {
                return [
                    'is-top',
                    'is-bottom',
                    'is-left',
                    'is-right'
                ].indexOf(value) > -1
            }
        },
        always: Boolean,
        square: Boolean,
        dashed: Boolean,
        multilined: Boolean,
        size: {
            type: String,
            default: 'is-medium'
        },
        appendToBody: Boolean,
        animation: {
            type: String,
            default: 'fade'
        }
    },
    data() {
        return {
            isActive: false,
            style: {},
            _bodyEl: undefined // Used to append to body
        }
    },
    computed: {
        rootClasses() {
            return ['b-tooltip', this.type, this.position, this.size, {
                'is-square': this.square,
                'is-animated': this.newAnimated,
                'is-always': this.always,
                'is-multiline': this.multilined,
                'is-dashed': this.dashed
            }]
        }
    },
    methods: {
        updateAppendToBody() {
            const tooltip = this.$refs.tooltip
            const trigger = this.$refs.trigger
            if (tooltip && trigger) {
                // update wrapper tooltip
                const tooltipEl = this.$data._bodyEl.children[0]
                tooltipEl.classList.forEach((item) => tooltipEl.classList.remove(item))
                this.rootClasses.forEach((item) => {
                    if (typeof item === 'object') {
                        for (let key in item) {
                            if (item[key]) {
                                tooltipEl.classList.add(key)
                            }
                        }
                    } else {
                        tooltipEl.classList.add(item)
                    }
                })
                tooltipEl.style.width = `${trigger.clientWidth}px`
                tooltipEl.style.height = `${trigger.clientHeight}px`
                const rect = trigger.getBoundingClientRect()
                let top = rect.top + window.scrollY
                let left = rect.left + window.scrollX
                const wrapper = this.$data._bodyEl
                wrapper.style.position = 'absolute'
                wrapper.style.top = `${top}px`
                wrapper.style.left = `${left}px`
                wrapper.style.zIndex = '99'
            }
        }
    },
    mounted() {
        if (this.appendToBody) {
            this.$data._bodyEl = createAbsoluteElement(this.$refs.content)
            this.updateAppendToBody()
        }
    },
    beforeDestroy() {
        if (this.appendToBody) {
            removeElement(this.$data._bodyEl)
        }
    }
}
</script>
