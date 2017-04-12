import Icon from '../components/icon'

export default {
    components: {
        [Icon.name]: Icon
    },
    props: {
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
            isActive: true
        }
    },
    computed: {
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
        close() {
            this.$emit('close')
            this.isActive = false

            // Timeout for the animation complete before destroying
            setTimeout(() => {
                this.$destroy()
                this.$el.remove()
            }, 150)
        }
    }
}
