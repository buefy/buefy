<template>
    <section>
        <div class="buttons">
            <b-button
                label="Launch snackbar (default)"
                size="is-medium"
                @click="snackbar" />
            <b-button
                label="Launch snackbar (custom)"
                type="is-warning"
                size="is-medium"
                @click="warning" />
            <b-button
                label="Launch snackbar (custom)"
                type="is-danger"
                size="is-medium"
                @click="danger" />
        </div>
    </section>
</template>

<script>
    export default {
        methods: {
            snackbar() {
                this.$buefy.snackbar.open(`Default, positioned bottom-right with a green 'OK' button`)
            },
            warning() {
                this.$buefy.snackbar.open({
                    message: 'Yellow button and positioned on top, click to close',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Retry',
                    indefinite: true,
                    onAction: () => {
                        this.$buefy.toast.open({
                            message: 'Action pressed',
                            queue: false
                        })
                    }
                })
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
