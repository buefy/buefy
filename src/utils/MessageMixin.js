import Icon from '../components/icon/Icon'

export default {
    components: {
        [Icon.name]: Icon
    },
    // deprecated, to replace with default 'value' in the next breaking change
    model: {
        prop: 'active',
        event: 'update:active'
    },
    props: {
        active: {
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
            default: 5000
        },
        progressBar: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isActive: this.active,
            remainingTime: this.duration / 1000 // in seconds
        }
    },
    watch: {
        active(value) {
            this.isActive = value
        },
        isActive(value) {
            if (value) {
                if (this.progressBar) {
                    this.setDurationProgress()
                }
                this.setAutoClose()
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
            this.$emit('close')
            this.$emit('update:active', false)
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
            if (this.autoClose) {
                /**
                 * Runs every one second to set the duration passed before
                 * the alert will auto close to show it in the progress bar
                 */
                this.progress = setInterval(() => {
                    if (this.remainingTime !== 0) {
                        this.remainingTime -= 1
                    } else {
                        this.remainingTime = this.duration / 1000
                        clearInterval(this.progress)
                    }
                }, 1000)
            }
        }
    },
    mounted() {
        this.setAutoClose()
    }
}
