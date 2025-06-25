<template>
    <div class="b-sidebar">
        <div
            class="sidebar-background"
            v-if="overlay && isOpen"
        />
        <transition
            :name="transitionName"
            @before-enter="beforeEnter"
            @after-enter="afterEnter"
        >
            <div
                v-show="isOpen"
                ref="sidebarContent"
                class="sidebar-content"
                :class="rootClasses"
                @mouseenter="onHover"
                @mouseleave="onHoverLeave"
            >
                <button
                    type="button"
                    v-if="fullwidth"
                    @click="clickedCloseButton"
                    class="modal-close is-large sidebar-close"
                    aria-label="Close"
                />
                <slot />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import config from '../../utils/config'
import type { ModalScrollOption, VueClassAttribute } from '../../utils/config'
import { removeElement } from '../../utils/helpers'

export const SIDEBAR_POSITIONS = ['fixed', 'absolute', 'static'] as const
export type SidebarPosition = typeof SIDEBAR_POSITIONS[number]

export const SCROLL_BEHAVIORS = ['clip', 'keep'] as const
export type ScrollBehavior = ModalScrollOption

export const CANCEL_METHODS = ['escape', 'outside']
export type CancelMethod = typeof CANCEL_METHODS[number]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CancelHandler = (method: CancelMethod, ...args: any[]) => void

export default defineComponent({
    name: 'BSidebar',
    props: {
        modelValue: Boolean,
        type: [String, Object] as PropType<VueClassAttribute>,
        overlay: Boolean,
        position: {
            type: String as PropType<SidebarPosition>,
            default: 'fixed',
            validator: (value: SidebarPosition) => {
                return SIDEBAR_POSITIONS.indexOf(value) >= 0
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
            type: [Number, null] as PropType<number | null>,
            default: () => config.defaultSidebarDelay
        },
        canCancel: {
            type: [Array<CancelMethod>, Boolean],
            default: () => ['escape', 'outside'] as CancelMethod[]
        },
        onCancel: {
            type: Function as PropType<CancelHandler>,
            default: () => {}
        },
        scroll: {
            type: String as PropType<ScrollBehavior>,
            default: () => {
                return config.defaultModalScroll
                    ? config.defaultModalScroll
                    : 'clip'
            },
            validator: (value: ScrollBehavior) => {
                return SCROLL_BEHAVIORS.indexOf(value) >= 0
            }
        }
    },
    emits: {
        close: () => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        'update:modelValue': (_value: boolean) => true
    },
    data() {
        return {
            isOpen: this.modelValue,
            isDelayOver: false,
            transitionName: undefined as string | undefined,
            animating: true,
            savedScrollTop: null as number | null,
            hasLeaved: false,
            timer: undefined as ReturnType<typeof setTimeout> | undefined
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
        modelValue: {
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
        /*
        * Keypress event that is bound to the document.
        */
        keyPress({ key }: { key?: KeyboardEvent['key'] }) {
            if (this.isFixed) {
                if (this.isOpen && (key === 'Escape' || key === 'Esc')) this.cancel('escape')
            }
        },

        /*
        * Close the Sidebar if canCancel and call the onCancel prop (function).
        */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cancel(method: CancelMethod, ...args: any[]) {
            if (this.cancelOptions.indexOf(method) < 0) return
            if (this.isStatic) return

            this.onCancel.call(null, method, ...args)
            this.close()
        },

        /*
        * Call the onCancel prop (function) and emit events
        */
        close() {
            this.isOpen = false
            this.$emit('close')
            this.$emit('update:modelValue', false)
        },

        /*
         * Close fixed sidebar if clicked outside.
         */
        clickedOutside(event: MouseEvent) {
            if (!this.isFixed || !this.isOpen || this.animating) { return }

            if (!event.composedPath().includes(this.$refs.sidebarContent as HTMLElement)) {
                this.cancel('outside')
            }
        },

        /*
        * Transition before-enter hook
        */
        beforeEnter() {
            this.animating = true
        },

        /*
        * Transition after-leave hook
        */
        afterEnter() {
            this.animating = false
        },

        handleScroll() {
            if (typeof window === 'undefined') return

            if (this.scroll === 'clip') {
                if (this.modelValue) {
                    document.documentElement.classList.add('is-clipped')
                } else {
                    document.documentElement.classList.remove('is-clipped')
                }
                return
            }

            this.savedScrollTop = !this.savedScrollTop
                ? document.documentElement.scrollTop
                : this.savedScrollTop

            if (this.modelValue) {
                document.body.classList.add('is-noscroll')
            } else {
                document.body.classList.remove('is-noscroll')
            }

            if (this.modelValue) {
                document.body.style.top = `-${this.savedScrollTop}px`
                return
            }

            document.documentElement.scrollTop = this.savedScrollTop
            document.body.style.top = ''
            this.savedScrollTop = null
        },
        onHover() {
            if (this.delay) {
                this.hasLeaved = false
                this.timer = setTimeout(() => {
                    if (!this.hasLeaved) {
                        this.isDelayOver = true
                    }
                    this.timer = undefined
                }, this.delay)
            } else {
                this.isDelayOver = false
            }
        },
        onHoverLeave() {
            this.hasLeaved = true
            this.timer = undefined
            this.isDelayOver = false
        },
        /*
         * Close sidebar if close button is clicked.
         */
        clickedCloseButton() {
            if (this.isFixed) {
                if (this.isOpen && this.fullwidth) {
                    this.cancel('outside')
                }
            }
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
        if (this.overlay && this.modelValue) {
            this.handleScroll()
        }
    },
    beforeUnmount() {
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
                document.body.style.top = ''
            }
        }
        if (this.isFixed) {
            removeElement(this.$el)
        }
        clearTimeout(this.timer)
    }
})
</script>
