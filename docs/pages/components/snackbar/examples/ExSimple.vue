<template>
    <section>
        <b-button text="Launch snackbar (default)" size="is-medium" @click="snackbar" />

        <b-button text="Launch snackbar (custom)" size="is-medium" btn="is-warning" @click="warning" />

        <b-button text="Launch snackbar (custom)" size="is-medium" btn="is-danger" @click="danger" />
    </section>
</template>

<script>
    export default {
        methods: {
            snackbar() {
                this.$snackbar.open(`Default, positioned bottom-right with a green 'OK' button`)
            },
            warning() {
                this.$snackbar.open({
                    message: 'Yellow button and positioned on top, click to close',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Retry',
                    indefinite: true,
                    onAction: () => {
                        this.$toast.open({
                            message: 'Action pressed',
                            queue: false
                        })
                    }
                })
            },
            danger() {
                this.$snackbar.open({
                    duration: 5000,
                    message: 'Snackbar with red action, positioned on bottom-left and a callback',
                    type: 'is-danger',
                    position: 'is-bottom-left',
                    actionText: 'Undo',
                    queue: false,
                    onAction: () => {
                        this.$toast.open({
                            message: 'Action pressed',
                            queue: false
                        })
                    }
                })
            }
        }
    }
</script>
