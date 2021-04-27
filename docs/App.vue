<template>
    <div id="app">
        <!-- TODO: use vue3-progressbar?
        <vue-progress-bar/>
        -->

        <router-view />
    </div>
</template>

<script>
import Clipboard from 'clipboard'

export default {
    name: 'Buefy',
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
                target: (trigger) => trigger.parentElement.parentElement.querySelector('code')
            })

            this.clipboard.on('success', (e) => {
                this.$buefy.toast.open('Copied to clipboard!')
            })

            this.clipboard.on('error', (e) => {
                this.$buefy.toast.open({
                    message: 'Error while copying to clipboard :(',
                    type: 'is-danger'
                })
            })
        }
    },
    created() {
        // TODO: use vue3-progressbar?
        /*
        this.$Progress.start()
        this.$router.beforeEach((to, from, next) => {
            this.$Progress.start()
            next()
        })
        this.$router.afterEach((to, from) => {
            this.$Progress.finish()
        }) */

        this.setupClipboardControls()
    },
    // TODO: use vue3-progressbar?
    /*
    mounted() {
        this.$Progress.finish()
    }, */
    beforeUnmount() {
        // Destroy clipboard instance if there's any
        this.clipboard && this.clipboard.destroy()
    },
    beforeRouteUpdate(to, from, next) {
        this.setupClipboardControls()

        next()
    }
}
</script>

<style lang="scss">
    @import "./assets/scss/main.scss";
</style>
