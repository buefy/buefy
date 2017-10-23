import Clipboard from 'clipboard'

export default {
    data() {
        return {
            clipboard: null
        }
    },
    methods: {
        setupClipboardControls() {
            // Destroy clipboard instance if there's any
            this.clipboard && this.clipboard.destroy()

            this.clipboard = new Clipboard('.copy-code', {
                target: (trigger) => trigger.nextElementSibling.children[0]
            })

            this.clipboard.on('success', (e) => {
                this.$toast.open('Copied to clipboard!')
            })

            this.clipboard.on('error', (e) => {
                this.$toast.open({
                    message: 'Error while copying to clipboard :(',
                    type: 'is-danger'
                })
            })
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.setupClipboardControls()

        next()
    },
    created() {
        this.setupClipboardControls()
    },
    beforeDestroy() {
        // Destroy clipboard instance if there's any
        this.clipboard && this.clipboard.destroy()
    }
}
