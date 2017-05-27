import Icon from '../components/icon'

export default {
    components: {
        [Icon.name]: Icon
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
        type: String,
        hasIcon: Boolean
    },
    data() {
        return {
            isActive: this.active
        }
    },
    watch: {
        active(value) {
            this.isActive = value
        }
    },
    computed: {
        /**
         * Icon name (MDI) based on type.
         */
        icon() {
            switch (this.type) {
                case 'is-info':
                    return 'info'
                case 'is-success':
                    return 'check_circle'
                case 'is-warning':
                    return 'warning'
                case 'is-danger':
                    return 'error'
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
        }
    }
}
