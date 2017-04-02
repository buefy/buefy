/*
 * Used on both Toast and Snackbar
 */

export default {
    props: {
        type: String,
        message: String,
        duration: Number,
        position: {
            type: String,
            default: 'bottom-right'
        },
        container: String
    },
    data() {
        return {
            isShow: false,
            positions: {
                'top-right': {
                    enter: 'Down',
                    leave: 'Up'
                },
                'top': {
                    enter: 'Down',
                    leave: 'Up'
                },
                'top-left': {
                    enter: 'Down',
                    leave: 'Up'
                },
                'bottom-right': {
                    enter: 'Up',
                    leave: 'Down'
                },
                'bottom': {
                    enter: 'Up',
                    leave: 'Down'
                },
                'bottom-left': {
                    enter: 'Up',
                    leave: 'Down'
                }
            }
        }
    },
    computed: {
        transition() {
            switch (this.position) {
                case 'top-right':
                case 'top':
                case 'top-left':
                    return {
                        enter: 'fadeInDown',
                        leave: 'fadeOutUp'
                    }
                case 'bottom-right':
                case 'bottom':
                case 'bottom-left':
                    return {
                        enter: 'fadeInUp',
                        leave: 'fadeOutDown'
                    }
            }
        }
    },
    methods: {
        close() {
            clearTimeout(this.timer)
            this.isShow = false
            setTimeout(() => {
                this.$destroy()
                this.$el.remove()
            }, 350)
        },
        show() {
            if (this.hasChild(this.parent)) {
                // Add to "queue" (recursive) if already has a toast
                setTimeout(() => this.show(), 500)
                return
            }
            this.insertEl()
            this.isShow = true
            this.timer = setTimeout(() => this.close(), this.duration)
        }
    },
    mounted() {
        this.show()
    }
}
