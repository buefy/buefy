<template>
    <section>
        <button class="button is-medium" @click="snackbar">
            Launch snackbar (default)
        </button>

        <button class="button is-medium is-warning" @click="warning">
            Launch snackbar (custom)
        </button>

        <button class="button is-medium is-danger" @click="danger">
            Launch snackbar (custom)
        </button>
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
