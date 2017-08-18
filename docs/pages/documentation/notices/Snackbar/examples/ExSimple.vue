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
                    message: 'Yellow button and positioned top-left',
                    type: 'is-warning',
                    position: 'is-top-left',
                    actionText: 'Retry',
                    onAction: () => {
                        this.$toast.open('Action pressed')
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
                    onAction: () => {
                        this.$toast.open('Action pressed')
                    }
                })
            }
        }
    }
</script>
