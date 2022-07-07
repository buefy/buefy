<template>
    <div class="b-sidebar">
        <div
            class="sidebar-background"
            v-if="overlay && isOpen"
        />
        <transition
            :name="transitionName"
            @before-enter="beforeEnter"
            @after-enter="afterEnter">
            <div
                v-show="isOpen"
                ref="sidebarContent"
                class="sidebar-content"
                :class="rootClasses"
                @mouseenter="onHover"
                @mouseleave="onHoverLeave">
                <slot />
            </div>
        </transition>
    </div>
</template>

<script>
import config from '../../utils/config'
import { removeElement, isCustomElement } from '../../utils/helpers'

export default {
    name: 'BSidebar',
    model: {
        prop: 'open',
        event: 'update:open'
    },
    props: {
        open: Boolean,
        type: [String, Object],
        overlay: Boolean,
        position: {
            type: String,
            default: 'fixed',
            validator: (value) => {
                return [
                    'fixed',
                    'absolute',
                    'static'
                ].indexOf(value) >= 0
            }
        },
        fullheight: Boolean,
        fullwidth: Boolean,
        right: Boolean,
        mobile: {
            type: String
        },
        reduce: Boolean,
        expandOnHover: Boolean,
        expandOnHoverFixed: Boolean,
        delay: {
            type: Number,
            default: () => config.defaultSidebarDelay
        },
        canCancel: {
            type: [Array, Boolean],
            default: () => ['escape', 'outside']
        },
        onCancel: {
            type: Function,
            default: () => {}
        },
        scroll: {
            type: String,
            default: () => {
                return config.defaultModalScroll
                    ? config.defaultModalScroll
                    : 'clip'
            },
            validator: (value) => {
                return [
                    'clip',
                    'keep'
                ].indexOf(value) >= 0
            }
        }
    },
    data() {
        return {
            isOpen: this.open,
            isDelayOver: false,
            transitionName: null,
            animating: true,
            savedScrollTop: null,
            hasLeaved: false,
            whiteList: []
        }
    },
    computed: {
        rootClasses() {
            return [this.type, {
                'is-fixed': this.isFixed,
                'is-static': this.isStatic,
                'is-absolute': this.isAbsolute,
                'is-fullheight': this.fullheight,
                'is-fullwidth': this.fullwidth,
                'is-right': this.right,
                'is-mini': this.reduce && !this.isDelayOver,
                'is-mini-expand': this.expandOnHover || this.isDelayOver,
                'is-mini-expand-fixed': (this.expandOnHover && this.expandOnHoverFixed) || this.isDelayOver,
                'is-mini-delayed': this.delay !== null,
                'is-mini-mobile': this.mobile === 'reduce',
                'is-hidden-mobile': this.mobile === 'hide',
                'is-fullwidth-mobile': this.mobile === 'fullwidth'
            }]
        },
        cancelOptions() {
            return typeof this.canCancel === 'boolean'
                ? this.canCancel
                    ? ['escape', 'outside']
                    : []
                : this.canCancel
        },
        isStatic() {
            return this.position === 'static'
        },
        isFixed() {
            return this.position === 'fixed'
        },
        isAbsolute() {
            return this.position === 'absolute'
        }
    },
    watch: {
        open: {
            handler(value) {
                this.isOpen = value
                if (this.overlay) {
                    this.handleScroll()
                }
                const open = this.right ? !value : value
                this.transitionName = !open ? 'slide-prev' : 'slide-next'
            },
            immediate: true
        }
    },
    methods: {
        /**
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
            if (this.isFixed) {
                if (this.isOpen && (key === 'Escape' || key === 'Esc')) this.cancel('escape')
            }
        },

        /**
        * Close the Sidebar if canCancel and call the onCancel prop (function).
        */
        cancel(method) {
            if (this.cancelOptions.indexOf(method) < 0) return
            if (this.isStatic) return

            this.onCancel.apply(null, arguments)
            this.close()
        },

        /**
        * Call the onCancel prop (function) and emit events
        */
        close() {
            this.isOpen = false
            this.$emit('close')
            this.$emit('update:open', false)
        },

        /**
         * Close fixed sidebar if clicked outside.
         */
        clickedOutside(event) {
            if (this.isFixed) {
                if (this.isOpen && !this.animating) {
                    const target = isCustomElement(this) ? event.composedPath()[0] : event.target
                    if (this.whiteList.indexOf(target) < 0) {
                        this.cancel('outside')
                    }
                }
            }
        },

        /**
        * Transition before-enter hook
        */
        beforeEnter() {
            this.animating = true
        },

        /**
        * Transition after-leave hook
        */
        afterEnter() {
            this.animating = false
        },

        handleScroll() {
            if (typeof window === 'undefined') return

            if (this.scroll === 'clip') {
                if (this.open) {
                    document.documentElement.classList.add('is-clipped')
                } else {
                    document.documentElement.classList.remove('is-clipped')
                }
                return
            }

            this.savedScrollTop = !this.savedScrollTop
                ? document.documentElement.scrollTop
                : this.savedScrollTop

            if (this.open) {
                document.body.classList.add('is-noscroll')
            } else {
                document.body.classList.remove('is-noscroll')
            }

            if (this.open) {
                document.body.style.top = `-${this.savedScrollTop}px`
                return
            }

            document.documentElement.scrollTop = this.savedScrollTop
            document.body.style.top = null
            this.savedScrollTop = null
        },
        onHover() {
            if (this.delay) {
                this.hasLeaved = false
                this.timer = setTimeout(() => {
                    if (!this.hasLeaved) {
                        this.isDelayOver = true
                    }
                    this.timer = null
                }, this.delay)
            } else {
                this.isDelayOver = false
            }
        },
        onHoverLeave() {
            this.hasLeaved = true
            this.timer = null
            this.isDelayOver = false
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress)
            document.addEventListener('click', this.clickedOutside)
        }
    },
    mounted() {
        if (typeof window !== 'undefined') {
            if (this.isFixed) {
                document.body.appendChild(this.$el)
            }
        }
        if (this.overlay && this.open) {
            this.handleScroll()
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress)
            document.removeEventListener('click', this.clickedOutside)
            if (this.overlay) {
                // reset scroll
                document.documentElement.classList.remove('is-clipped')
                const savedScrollTop = !this.savedScrollTop
                    ? document.documentElement.scrollTop
                    : this.savedScrollTop
                document.body.classList.remove('is-noscroll')
                document.documentElement.scrollTop = savedScrollTop
                document.body.style.top = null
            }
        }
        if (this.isFixed) {
            removeElement(this.$el)
        }
    },
    beforeUpdate() {
        /**
        * White-listed items to not close when clicked.
        * Add sidebar content and all children.
        */
        this.whiteList = []
        this.whiteList.push(this.$refs.sidebarContent)
        // Add all chidren from sidebar
        if (this.$refs.sidebarContent !== undefined) {
            const children = this.$refs.sidebarContent.querySelectorAll('*')
            for (const child of children) {
                this.whiteList.push(child)
            }
        }
    }
}
</script>
