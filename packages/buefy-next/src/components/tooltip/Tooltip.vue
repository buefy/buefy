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

<script>
import config from '../../utils/config'
import { createAbsoluteElement, removeElement } from '../../utils/helpers'

export default {
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
            type: [Array, Boolean],
            default: true
        }
    },
    emits: ['close', 'open'],
    data() {
        return {
            isActive: false,
            triggerStyle: {},
            timer: null,
            _bodyEl: undefined, // Used to append to body
            resizeObserver: undefined,
            resizeListener: undefined,
            timeOutID: null
        }
    },
    computed: {
        rootClasses() {
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
            this.$emit(this.isActive ? 'open' : 'close')
            if (this.appendToBody) {
                this.updateAppendToBody()
            }
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
                if (
                    this.$vnode &&
                    this.$vnode.data &&
                    this.$vnode.data.staticClass
                ) {
                    tooltipEl.classList.add(this.$vnode.data.staticClass)
                }
                this.rootClasses.forEach((item) => {
                    if (typeof item === 'object') {
                        for (const key in item) {
                            if (item[key]) {
                                tooltipEl.classList.add(key)
                            }
                        }
                    } else {
                        tooltipEl.classList.add(item)
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

                const wrapper = this.$data._bodyEl
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
        onContextMenu(e) {
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
                    this.timer = null
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
                        this.timer = null
                    }, this.closeDelay)
                } else {
                    this.isActive = !this.autoClose
                }
            }
        },
        /**
        * Close tooltip if clicked outside.
        */
        clickedOutside(event) {
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
        /**
         * Keypress event that is bound to the document
         */
        keyPress({ key }) {
            if (this.isActive && (key === 'Escape' || key === 'Esc')) {
                if (Array.isArray(this.autoClose)) {
                    if (this.autoClose.indexOf('escape') >= 0) this.isActive = false
                }
            }
        },
        /**
        * White-listed items to not close when clicked.
        */
        isInWhiteList(el) {
            if (el === this.$refs.content) return true
            // All chidren from content
            if (this.$refs.content != null) {
                const children = this.$refs.content.querySelectorAll('*')
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
            this.$data._bodyEl = createAbsoluteElement(this.$refs.content)
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
            removeElement(this.$data._bodyEl)
        }
        if (this.controller != null) {
            this.controller.abort()
        }
        clearTimeout(this.timer)
        clearTimeout(this.timeOutID)
    }
}
</script>
