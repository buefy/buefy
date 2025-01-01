import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import config, { NOTICE_POSITIONS } from './config'
import type { NoticePosition } from './config'
import { removeElement } from './helpers'

export default defineComponent({
    props: {
        type: {
            type: String,
            default: 'is-dark'
        },
        message: [String, Array] as PropType<string | string[]>,
        duration: Number,
        queue: {
            type: Boolean,
            default: undefined
        },
        indefinite: {
            type: Boolean,
            default: false
        },
        pauseOnHover: {
            type: Boolean,
            default: false
        },
        position: {
            type: String as PropType<NoticePosition>,
            default: 'is-top',
            validator(value: unknown): value is NoticePosition {
                return NOTICE_POSITIONS.indexOf(value as NoticePosition) > -1
            }
        },
        container: String
    },
    emits: {
        click: () => true,
        close: () => true
    },
    data() {
        return {
            isActive: false,
            isPaused: false,
            parentTop: null as Element | null,
            parentBottom: null as Element | null,
            newContainer: this.container || config.defaultContainerElement,
            timer: undefined as ReturnType<typeof setTimeout> | undefined,
            // host container should override `newDuration`
            newDuration: this.duration || 0
        }
    },
    computed: {
        correctParent() {
            switch (this.position) {
                case 'is-top-right':
                case 'is-top':
                case 'is-top-left':
                    return this.parentTop!

                case 'is-bottom-right':
                case 'is-bottom':
                case 'is-bottom-left':
                    return this.parentBottom!
                default: {
                    const exhaustiveCheck: never = this.position
                    throw new RangeError(`invalid position: ${exhaustiveCheck}`)
                }
            }
        },
        transition() {
            switch (this.position) {
                case 'is-top-right':
                case 'is-top':
                case 'is-top-left':
                    return {
                        enter: 'fadeInDown',
                        leave: 'fadeOut'
                    }
                case 'is-bottom-right':
                case 'is-bottom':
                case 'is-bottom-left':
                    return {
                        enter: 'fadeInUp',
                        leave: 'fadeOut'
                    }
                default: {
                    const exhaustiveCheck: never = this.position
                    throw new RangeError(`invalid position: ${exhaustiveCheck}`)
                }
            }
        }
    },
    methods: {
        pause() {
            if (this.pauseOnHover && !this.indefinite) {
                this.isPaused = true
                clearInterval(this.$buefy.globalNoticeInterval)
            }
        },
        removePause() {
            if (this.pauseOnHover && !this.indefinite) {
                this.isPaused = false
                this.close()
            }
        },
        shouldQueue() {
            const queue = this.queue !== undefined
                ? this.queue
                : config.defaultNoticeQueue

            if (!queue) return false

            return (
                this.parentTop!.childElementCount > 0 ||
                this.parentBottom!.childElementCount > 0
            )
        },
        click() {
            this.$emit('click')
        },
        close() {
            if (!this.isPaused) {
                clearTimeout(this.timer)
                this.isActive = false
                this.$emit('close')

                // Timeout for the animation complete before destroying
                setTimeout(() => {
                    removeElement(this.$el)
                }, 150)
            }
        },

        timeoutCallback() {
            return this.close()
        },

        showNotice() {
            if (this.shouldQueue()) this.correctParent.innerHTML = ''
            this.correctParent.insertAdjacentElement('afterbegin', this.$el)
            this.isActive = true

            if (!this.indefinite) {
                this.timer = setTimeout(() => this.timeoutCallback(), this.newDuration)
            }
        },

        setupContainer() {
            this.parentTop = document.querySelector((this.newContainer ? this.newContainer : 'body') + '>.notices.is-top')
            this.parentBottom = document.querySelector((this.newContainer ? this.newContainer : 'body') + '>.notices.is-bottom')

            if (this.parentTop && this.parentBottom) return

            if (!this.parentTop) {
                this.parentTop = document.createElement('div')
                this.parentTop.className = 'notices is-top'
            }

            if (!this.parentBottom) {
                this.parentBottom = document.createElement('div')
                this.parentBottom.className = 'notices is-bottom'
            }

            const container = document.querySelector(this.newContainer!) || document.body

            container.appendChild(this.parentTop)
            container.appendChild(this.parentBottom)

            if (this.newContainer) {
                this.parentTop.classList.add('has-custom-container')
                this.parentBottom.classList.add('has-custom-container')
            }
        }
    },
    beforeMount() {
        this.setupContainer()
    },
    mounted() {
        this.showNotice()
    }
})
