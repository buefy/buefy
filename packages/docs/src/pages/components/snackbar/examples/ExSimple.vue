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
            <b-button
                label="Launch snackbar (with cancel)"
                size="is-medium"
                @click="hasCancel" />
            <b-button
                label="Launch snackbar (pause on hover)"
                type="is-link"
                size="is-medium"
                @click="pause" />
        </div>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BButton } from '@ntohq/buefy-next'

    export default defineComponent({
        components: { BButton },
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
            },
            hasCancel() {
                this.$buefy.snackbar.open({
                    indefinite: true,
                    message: 'Snackbar with a cancel button.',
                    cancelText: 'Cancel',
                })
            },
            pause() {
                this.$buefy.snackbar.open({
                    message: 'I can be paused if you hover over me',
                    pauseOnHover: true,
                    type: 'is-link',
                })
            },
        }
    })
</script>
