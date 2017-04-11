/*
 * Used on both Toast and Snackbar
 */

import config from './config'

export default {
    props: {
        type: String,
        message: String,
        duration: Number,
        position: String,
        container: String
    },
    data() {
        return {
            isActive: false,
            parent: null,
            newContainer: this.container || config.defaultContentElement,
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
            this.isActive = false

            // Timeout for the animation complete before destroying
            setTimeout(() => {
                this.$destroy()
                this.$el.remove()
            }, 150)
        },
        show() {
            if (this.hasChild(this.parent)) {
                // Add to "queue" (recursive) if already has a notice
                setTimeout(() => this.show(), 250)
                return
            }
            this.insertEl()
            this.isActive = true
            this.timer = setTimeout(() => this.close(), this.duration)
        }
    },
    beforeMount() {
        let parent
        parent = document.querySelector('.notices')

        const container = document.querySelector(this.newContainer) !== null ? document.querySelector(this.newContainer) : document.body
        if (!parent) {
            parent = document.createElement('div')
        }
        this.parent = parent
        if (this.newContainer) {
            parent.style.position = 'absolute'
        }
        container.appendChild(parent)
    },
    mounted() {
        this.show()
    }
}
