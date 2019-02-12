<template>
    <transition :name="animation">
        <div v-if="isActive" class="modal is-active">
            <div class="modal-background" @click="cancel('outside')"/>
            <div
                class="animation-content"
                :class="{ 'modal-content': !hasModalCard }"
                :style="{ maxWidth: newWidth }">
                <component
                    v-if="component"
                    v-bind="props"
                    v-on="events"
                    :is="component"
                    @close="close"/>
                <div
                    v-else-if="content"
                    v-html="content"/>
                <slot v-else/>
            </div>
            <button
                type="button"
                v-if="showX"
                class="modal-close is-large"
                @click="cancel('x')"/>
        </div>
    </transition>
</template>

<script>
    import { removeElement } from '../../utils/helpers'
    import config from '../../utils/config'

    export default {
        name: 'BModal',
        props: {
            active: Boolean,
            component: [Object, Function],
            content: String,
            programmatic: Boolean,
            props: Object,
            events: Object,
            width: {
                type: [String, Number],
                default: 960
            },
            hasModalCard: Boolean,
            animation: {
                type: String,
                default: 'zoom-out'
            },
            canCancel: {
                type: [Array, Boolean],
                default: () => {
                    return config.defaultModalCanCancel
                        ? config.defaultModalCanCancel
                        : ['escape', 'x', 'outside', 'button']
                }
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
                isActive: this.active || false,
                savedScrollTop: null,
                newWidth: typeof this.width === 'number'
                    ? this.width + 'px'
                    : this.width
            }
        },
        computed: {
            cancelOptions() {
                return typeof this.canCancel === 'boolean'
                    ? this.canCancel
                        ? ['escape', 'x', 'outside', 'button']
                        : []
                    : this.canCancel
            },
            showX() {
                return this.cancelOptions.indexOf('x') >= 0
            }
        },
        watch: {
            active(value) {
                this.isActive = value
            },
            isActive() {
                this.handleScroll()
            }
        },
        methods: {
            handleScroll() {
                if (typeof window === 'undefined') return

                if (this.scroll === 'clip') {
                    if (this.isActive) {
                        document.documentElement.classList.add('is-clipped')
                    } else {
                        document.documentElement.classList.remove('is-clipped')
                    }
                    return
                }

                this.savedScrollTop = !this.savedScrollTop
                    ? document.documentElement.scrollTop
                    : this.savedScrollTop

                if (this.isActive) {
                    document.body.classList.add('is-noscroll')
                } else {
                    document.body.classList.remove('is-noscroll')
                }

                if (this.isActive) {
                    document.body.style.top = `-${this.savedScrollTop}px`
                    return
                }

                document.documentElement.scrollTop = this.savedScrollTop
                document.body.style.top = null
                this.savedScrollTop = null
            },

            /**
             * Close the Modal if canCancel and call the onCancel prop (function).
             */
            cancel(method) {
                if (this.cancelOptions.indexOf(method) < 0) return

                this.onCancel.apply(null, arguments)
                this.close()
            },

            /**
             * Call the onCancel prop (function).
             * Emit events, and destroy modal if it's programmatic.
             */
            close() {
                this.$emit('close')
                this.$emit('update:active', false)

                // Timeout for the animation complete before destroying
                if (this.programmatic) {
                    this.isActive = false
                    setTimeout(() => {
                        this.$destroy()
                        removeElement(this.$el)
                    }, 150)
                }
            },

            /**
             * Keypress event that is bound to the document.
             */
            keyPress(event) {
                // Esc key
                if (this.isActive && event.keyCode === 27) this.cancel('escape')
            }
        },
        created() {
            if (typeof window !== 'undefined') {
                document.addEventListener('keyup', this.keyPress)
            }
        },
        beforeMount() {
            // Insert the Modal component in body tag
            // only if it's programmatic
            this.programmatic && document.body.appendChild(this.$el)
        },
        mounted() {
            if (this.programmatic) this.isActive = true
            else if (this.isActive) this.handleScroll()
        },
        beforeDestroy() {
            if (typeof window !== 'undefined') {
                document.removeEventListener('keyup', this.keyPress)
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
    }
</script>
