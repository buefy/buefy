export default {
    props: {
        type: String,
        message: String,
        duration: {
            type: Number,
            default: 6500
        },
        position: {
            type: String,
            default: 'top-right'
        },
        container: String
    },
    data() {
        return {
            isShow: false,
            positionsEnter: {
                'top-right': 'Right',
                'top': 'Down',
                'top-left': 'Left',
                'bottom-right': 'Right',
                'bottom': 'Up',
                'bottom-left': 'Left'
            },
            positionsLeave: {
                'top-right': 'Right',
                'top': 'Up',
                'top-left': 'Left',
                'bottom-right': 'Right',
                'bottom': 'Down',
                'bottom-left': 'Left'
            }
        }
    },
    computed: {
        transitionEnter() {
            if (this.transition) return this.transition
            return 'fadeIn' + this.positionsEnter[this.position]
        },
        transitionLeave() {
            if (this.transition) return this.transition
            return 'fadeOut' + this.positionsLeave[this.position]
        }
    },
    methods: {
        handleClose() {
            setTimeout(() => {
                this.close()
            }, 100)
        },
        close() {
            clearTimeout(this.timer)
            this.isShow = false
            setTimeout(() => {
                this.$destroy()
                this.$el.remove()
            }, 1000)
        }
    },
    mounted() {
        this.isShow = true
        this.timer = setTimeout(() => this.close(), this.duration)
    }
}
