<template>
    <div class="b-sidebar" @click="clickedOutside">
        <div
            class="sidebar-background"
            v-if="overlay && isOpen"
        />
        <transition :name="transitionName">
            <div
                v-show="isOpen"
                ref="sidebarContent"
                class="sidebar-content"
                :class="rootClasses">
                <slot />
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'BSidebar',
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
        canCancel: {
            type: [Array, Boolean],
            default: () => ['escape', 'outside']
        },
        onCancel: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            isOpen: this.open,
            transitionName: null,
            animating: true
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
                'is-mini': this.reduce,
                'is-mini-expand': this.expandOnHover,
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
        },
        /**
         * White-listed items to not close when clicked.
         * Add sidebar content and all children.
         */
        whiteList() {
            const whiteList = []
            whiteList.push(this.$refs.sidebarContent)
            // Add all chidren from dropdown
            if (this.$refs.sidebarContent !== undefined) {
                const children = this.$refs.sidebarContent.querySelectorAll('*')
                for (const child of children) {
                    whiteList.push(child)
                }
            }
            return whiteList
        }
    },
    watch: {
        open: {
            handler(value) {
                this.isOpen = value
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
        keyPress(event) {
            // Esc key
            if (this.isFixed) {
                if (this.isOpen && event.keyCode === 27) this.cancel('escape')
            }
        },

        /**
        * Close the Sidebar if canCancel and call the onCancel prop (function).
        */
        cancel(method) {
            if (this.cancelOptions.indexOf(method) < 0) return
            if (this.static) return

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
                if (this.whiteList.indexOf(event.target) < 0) {
                    this.cancel('outside')
                }
            }
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress)
        }
    },
    mounted() {
        if (this.isFixed) {
            document.body.appendChild(this.$el)
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress)
        }
        if (this.isFixed) {
            document.body.removeChild(this.$el)
        }
    }
}
</script>
