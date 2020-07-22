<template>
    <section>
        <div class="buttons">
            <button class="button is-medium" @click="snackbar">
                Launch snackbar (default)
            </button>

            <button class="button is-medium is-warning" @click="warning">
                {{ snackbarRef ? 'Close' : 'Launch' }} Warning snackbar (custom)
            </button>

            <button class="button is-medium is-danger" @click="danger">
                Launch snackbar (custom)
            </button>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                snackbarRef: null,
            }
        },
        methods: {
            snackbar() {
                this.$buefy.snackbar.open(`Default, positioned bottom-right with a green 'OK' button`)
            },
            warning() {
                if (this.snackbarRef) {
                    this.snackbarRef.close()
                    this.snackbarRef = null
                } else {
                    this.snackbarRef = this.$buefy.snackbar.open({
                        message: 'Yellow button and positioned on top, click to close',
                        type: 'is-warning',
                        position: 'is-top',
                        actionText: 'Retry',
                        indefinite: true,
                        onAction: () => {
                            this.snackbarRef = null
                            this.$buefy.toast.open({
                                message: 'Action pressed',
                                queue: false
                            })
                        }
                    })
                }
            },
            danger() {
                this.$buefy.snackbar.open({
                    duration: 5000,
                    message: 'Snackbar with red action, positioned on bottom-left and a callback.<br>Note: <em>Message can include html</em>.',
                    type: 'is-danger',
                    position: 'is-bottom-left',
                    actionText: 'Undo',
                    queue: false,
                    onAction: () => {
                        this.$buefy.toast.open({
                            message: 'Action pressed',
                            queue: false
                        })
                    }
                })
            }
        }
    }
</script>
