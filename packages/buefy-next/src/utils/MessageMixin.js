import Icon from '../components/icon/Icon.vue'

export default {
    components: {
        [Icon.name]: Icon
    },
    props: {
        modelValue: {
            type: Boolean,
            default: true
        },
        title: String,
        closable: {
            type: Boolean,
            default: true
        },
        message: String,
        type: String,
        hasIcon: Boolean,
        size: String,
        icon: String,
        iconPack: String,
        iconSize: String,
        autoClose: {
            type: Boolean,
            default: false
        },
        duration: {
            type: Number,
            default: 2000
        },
        progressBar: {
            type: Boolean,
            default: false
        }
    },
    emits: ['click', 'close', 'update:modelValue'],
    data() {
        return {
            isActive: this.modelValue,
            remainingTime: this.duration / 1000, // in seconds
            newIconSize: this.iconSize || this.size || 'is-large'
        }
    },
    watch: {
        modelValue(value) {
            this.isActive = value
        },
        isActive(value) {
            if (value) {
                this.setAutoClose()
                this.setDurationProgress()
            } else {
                if (this.timer) {
                    clearTimeout(this.timer)
                }
            }
        }
    },
    computed: {
        /**
         * Icon name (MDI) based on type.
         */
        computedIcon() {
            if (this.icon) {
                return this.icon
            }
            switch (this.type) {
                case 'is-info':
                    return 'information'
                case 'is-success':
                    return 'check-circle'
                case 'is-warning':
                    return 'alert'
                case 'is-danger':
                    return 'alert-circle'
                default:
                    return null
            }
        }
    },
    methods: {
        /**
         * Close the Message and emit events.
         */
        close() {
            this.isActive = false
            this.resetDurationProgress()
            this.$emit('close')
            this.$emit('update:modelValue', false)
        },
        click() {
            this.$emit('click')
        },
        /**
         * Set timer to auto close message
         */
        setAutoClose() {
            if (this.autoClose) {
                this.timer = setTimeout(() => {
                    if (this.isActive) {
                        this.close()
                    }
                }, this.duration)
            }
        },
        setDurationProgress() {
            if (this.progressBar || this.autoClose) {
                /**
                 * Runs every one second to set the duration passed before
                 * the alert will auto close to show it in the progress bar (Remaining Time)
                 */
                this.$buefy.globalNoticeInterval = setInterval(() => {
                    if (this.remainingTime !== 0) {
                        this.remainingTime -= 1
                    } else {
                        this.resetDurationProgress()
                    }
                }, 1000)
            }
        },
        resetDurationProgress() {
            /**
             * Wait until the component get closed and then reset
             **/
            setTimeout(() => {
                this.remainingTime = this.duration / 1000
                clearInterval(this.$buefy.globalNoticeInterval)
            }, 100)
        }
    },
    mounted() {
        this.setAutoClose()
    }
}
