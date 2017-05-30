import config from './config'

export default {
    props: {
        type: {
            type: String,
            default: 'is-dark'
        },
        message: String,
        duration: {
            type: Number,
            default: 2000
        },
        position: {
            type: String,
            default: 'is-top',
            validator(value) {
                return [
                    'is-top-right',
                    'is-top',
                    'is-top-left',
                    'is-bottom-right',
                    'is-bottom',
                    'is-bottom-left'
                ].indexOf(value) > -1
            }
        },
        container: String
    },
    data() {
        return {
            isActive: false,
            parent: null,
            newContainer: this.container || config.defaultContentElement
        }
    },
    computed: {
        transition() {
            switch (this.position) {
                case 'is-top-right':
                case 'is-top':
                case 'is-top-left':
                    return {
                        enter: 'fadeInDown',
                        leave: 'fadeOutUp'
                    }
                case 'is-bottom-right':
                case 'is-bottom':
                case 'is-bottom-left':
                    return {
                        enter: 'fadeInUp',
                        leave: 'fadeOutDown'
                    }
            }
        }
    },
    methods: {
        /**
         * Check if has any element inside the container.
         */
        hasChild(parent) {
            return parent !== null && parent.childElementCount > 0
        },

        /**
         * Close the notice.
         *   1. Clear timer.
         *   2. Close notice.
         *   3. Remove element.
         */
        close() {
            clearTimeout(this.timer)
            this.isActive = false

            // Timeout for the animation complete before destroying
            setTimeout(() => {
                this.$destroy()
                this.$el.remove()
            }, 150)
        },

        /**
         * Show notice.
         *   1. Check if already has a notice playing, if has, add a timeout to try again.
         *   2. Insert element.
         *   3. Show notice.
         *   4. Add timer based on the duration prop.
         */
        show() {
            if (this.hasChild(this.parent)) {
                // Add to "queue" (recursive) if already has a notice
                setTimeout(() => this.show(), 250)
                return
            }
            // This is from Toast or Snackbar
            this.insertEl()
            this.isActive = true
            this.timer = setTimeout(() => this.close(), this.duration)
        },

        /**
         * Create container based on the prop or constructor option.
         */
        init() {
            let parent
            parent = document.querySelector('.notices')

            const container = document.querySelector(this.newContainer) !== null
                ? document.querySelector(this.newContainer)
                : document.body

            if (!parent) parent = document.createElement('div')

            this.parent = parent
            if (this.newContainer) parent.style.position = 'absolute'

            container.appendChild(parent)
        }
    },
    beforeMount() {
        this.init()
    },
    mounted() {
        this.show()
    }
}
