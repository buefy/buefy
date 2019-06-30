<template>
    <div id="app">
        <vue-progress-bar/>

        <router-view/>
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
        created() {
            this.$Progress.start()
            this.$router.beforeEach((to, from, next) => {
                this.$Progress.start()
                next()
            })
            this.$router.afterEach((to, from) => {
                this.$Progress.finish()
            })

            this.setupClipboardControls()
        },
        mounted() {
            this.$Progress.finish()
        },
        beforeDestroy() {
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
