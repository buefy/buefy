<template>
    <div ref="tooltip" :class="rootClasses">
        <transition :name="newAnimation">
            <div
                v-show="active && (isActive || always)"
                ref="content"
                :class="['tooltip-content', contentClass]"
            >
                <template v-if="label">
                    {{ label }}
                </template>
                <template v-else-if="$slots.content">
                    <slot name="content" />
                </template>
            </div>
        </transition>
        <div
            ref="trigger"
            class="tooltip-trigger"
            :style="triggerStyle"
            @click="onClick"
            @contextmenu="onContextMenu"
            @mouseenter="onHover"
            @focus.capture="onFocus"
            @blur.capture="close"
            @mouseleave="close"
        >
            <slot ref="slot" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import config from '../../utils/config'
import type { VueClassAttribute } from '../../utils/config'
import { createAbsoluteElement, removeElement } from '../../utils/helpers'

export const TOOLTIP_POSITIONS = ['is-top', 'is-bottom', 'is-left', 'is-right'] as const
export type TooltipPosition = typeof TOOLTIP_POSITIONS[number]

export const CLOSE_OPTIONS = ['inside', 'outside', 'escape'] as const
export type CloseOption = typeof CLOSE_OPTIONS[number]

export default defineComponent({
    name: 'BTooltip',
    props: {
        active: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: () => config.defaultTooltipType
        },
        label: String,
        delay: {
            type: Number,
            default: () => config.defaultTooltipDelay
        },
        closeDelay: {
            type: Number,
            default: () => config.defaultTooltipCloseDelay
        },
        position: {
            type: String as PropType<TooltipPosition>,
            default: 'is-top',
            validator(value) {
                return TOOLTIP_POSITIONS.indexOf(value as TooltipPosition) > -1
            }
        },
        triggers: {
            type: Array,
            default: () => ['hover']
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
        animated: {
            type: Boolean,
            default: true
        },
        animation: {
            type: String,
            default: 'fade'
        },
        contentClass: String,
        autoClose: {
            type: [Array<CloseOption>, Boolean],
            default: true
        }
    },
    emits: {
        close: () => true,
        open: () => true
    },
    data() {
        return {
            isActive: false,
            triggerStyle: {},
            timer: undefined as ReturnType<typeof setTimeout> | undefined,
            _bodyEl: undefined as HTMLElement | undefined, // Used to append to body
            resizeObserver: undefined as ResizeObserver | undefined,
            resizeListener: undefined as (() => void) | undefined,
            timeOutID: undefined as ReturnType<typeof setTimeout> | undefined,
            controller: undefined as AbortController | undefined
        }
    },
    computed: {
        rootClasses(): VueClassAttribute[] {
            return ['b-tooltip', this.type, this.position, this.size, {
                'is-square': this.square,
                'is-always': this.always,
                'is-multiline': this.multilined,
                'is-dashed': this.dashed
            }]
        },
        newAnimation() {
            return this.animated ? this.animation : undefined
        }
    },
    watch: {
        isActive() {
            this.isActive ? this.$emit('open') : this.$emit('close')
            if (this.appendToBody) {
                this.updateAppendToBody()
            }
        }
    },
    methods: {
        updateAppendToBody() {
            const tooltip = this.$refs.tooltip
            const trigger = this.$refs.trigger as Element
            if (tooltip && trigger) {
                // update wrapper tooltip
                const tooltipEl = this.$data._bodyEl!.children[0] as HTMLElement
                tooltipEl.classList.forEach((item) => tooltipEl.classList.remove(item))
                // the following block no longer works in Vue 3, which was
                // introduced to address the following issue:
                // https://github.com/buefy/buefy/issues/2780
                // FIXME: I comment out the following block until we learn more
                // about the issue
                /*
                if (
                    this.$vnode &&
                    this.$vnode.data &&
                    this.$vnode.data.staticClass
                ) {
                    tooltipEl.classList.add(this.$vnode.data.staticClass)
                } */
                this.rootClasses.forEach((item) => {
                    if (typeof item === 'object') {
                        const record = item as Record<string, boolean | undefined>
                        for (const key in record) {
                            if (record[key]) {
                                tooltipEl.classList.add(key)
                            }
                        }
                    } else {
                        tooltipEl.classList.add(item!)
                    }
                })

                const rect = trigger.getBoundingClientRect()

                const top = rect.top + window.scrollY
                const left = rect.left + window.scrollX

                // `tooltipEl` will be placed relative to `wrapper`
                // because `wrapper` should create a stacking context
                // as its z-index is non-auto
                tooltipEl.style.position = 'absolute'
                switch (this.position) {
                    case 'is-top':
                        tooltipEl.style.width = `${trigger.clientWidth}px`
                        tooltipEl.style.height = '0px'
                        tooltipEl.style.top = '0px'
                        tooltipEl.style.left = '0px'
                        break
                    case 'is-bottom':
                        tooltipEl.style.width = `${trigger.clientWidth}px`
                        tooltipEl.style.height = '0px'
                        tooltipEl.style.top = `${trigger.clientHeight}px`
                        tooltipEl.style.left = '0px'
                        break
                    case 'is-left':
                        tooltipEl.style.width = '0px'
                        tooltipEl.style.height = `${trigger.clientHeight}px`
                        tooltipEl.style.top = '0px'
                        tooltipEl.style.left = '0px'
                        break
                    case 'is-right':
                        tooltipEl.style.width = '0px'
                        tooltipEl.style.height = `${trigger.clientHeight}px`
                        tooltipEl.style.top = '0px'
                        tooltipEl.style.left = `${trigger.clientWidth}px`
                        break
                }

                const wrapper = this.$data._bodyEl!
                wrapper.style.position = 'absolute'
                wrapper.style.top = `${top}px`
                wrapper.style.left = `${left}px`
                wrapper.style.width = '0px'
                wrapper.style.zIndex = this.isActive || this.always ? '99' : '-1'
                this.triggerStyle = {
                    zIndex: this.isActive || this.always ? '100' : undefined
                }
            }
        },
        onClick() {
            if (this.triggers.indexOf('click') < 0) return
            // if not active, toggle after clickOutside event
            // this fixes toggling programmatic
            this.$nextTick(() => {
                this.timeOutID = setTimeout(() => this.open())
            })
        },
        onHover() {
            if (this.triggers.indexOf('hover') < 0) return
            this.open()
        },
        onContextMenu(e: { preventDefault: Event['preventDefault'] }) {
            if (this.triggers.indexOf('contextmenu') < 0) return
            e.preventDefault()
            this.open()
        },
        onFocus() {
            if (this.triggers.indexOf('focus') < 0) return
            this.open()
        },
        open() {
            if (this.delay) {
                this.timer = setTimeout(() => {
                    this.isActive = true
                    this.timer = undefined
                }, this.delay)
            } else {
                this.isActive = true
            }
        },
        close() {
            if (typeof this.autoClose === 'boolean') {
                if (this.autoClose && this.timer) clearTimeout(this.timer)
                if (this.closeDelay) {
                    this.timer = setTimeout(() => {
                        this.isActive = !this.autoClose
                        this.timer = undefined
                    }, this.closeDelay)
                } else {
                    this.isActive = !this.autoClose
                }
            }
        },
        /*
        * Close tooltip if clicked outside.
        */
        clickedOutside(event: MouseEvent) {
            if (this.isActive) {
                if (Array.isArray(this.autoClose)) {
                    if (this.autoClose.includes('outside')) {
                        if (!this.isInWhiteList(event.target)) {
                            this.isActive = false
                            return
                        }
                    }
                    if (this.autoClose.includes('inside')) {
                        if (this.isInWhiteList(event.target)) this.isActive = false
                    }
                }
            }
        },
        /*
         * Keypress event that is bound to the document
         */
        keyPress({ key }: { key: KeyboardEvent['key'] }) {
            if (this.isActive && (key === 'Escape' || key === 'Esc')) {
                if (Array.isArray(this.autoClose)) {
                    if (this.autoClose.indexOf('escape') >= 0) this.isActive = false
                }
            }
        },
        /*
        * White-listed items to not close when clicked.
        */
        isInWhiteList(el: EventTarget | null) {
            if (el === this.$refs.content) return true
            // All chidren from content
            if (this.$refs.content != null) {
                const children = (this.$refs.content as Element).querySelectorAll('*')
                for (const child of children) {
                    if (el === child) {
                        return true
                    }
                }
            }
            return false
        }
    },
    mounted() {
        if (this.appendToBody && typeof window !== 'undefined') {
            this.controller = new window.AbortController()
            this.$data._bodyEl = createAbsoluteElement(this.$refs.content as Element)
            this.updateAppendToBody()
            // updates the tooltip position if the tooltip is inside
            // `.animation-content`
            const animation = this.$el.closest('.animation-content')
            if (animation != null) {
                const listener = () => {
                    this.updateAppendToBody()
                    animation.removeEventListener('transitionend', listener)
                }
                animation.addEventListener('transitionend', listener, {
                    signal: this.controller.signal
                })
            }
            // observes changes in the window size
            this.resizeListener = () => this.updateAppendToBody()
            window.addEventListener('resize', this.resizeListener)
            // observes changes in the size of the immediate parent
            this.resizeObserver = new ResizeObserver(this.resizeListener)
            if (this.$el.parentNode != null && this.$el.parentNode.nodeType === Node.ELEMENT_NODE) {
                this.resizeObserver.observe(this.$el.parentNode)
            }
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('click', this.clickedOutside)
            document.addEventListener('keyup', this.keyPress)
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('click', this.clickedOutside)
            document.removeEventListener('keyup', this.keyPress)
        }
        if (this.resizeListener != null) {
            window.removeEventListener('resize', this.resizeListener)
        }
        if (this.resizeObserver != null) {
            this.resizeObserver.disconnect()
        }
        if (this.appendToBody) {
            removeElement(this.$data._bodyEl!)
        }
        if (this.controller != null) {
            this.controller.abort()
        }
        clearTimeout(this.timer)
        clearTimeout(this.timeOutID)
    }
})
</script>
