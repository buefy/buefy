<template>
    <section>
        <div class="buttons">
            <b-button
                label="Launch notification (default)"
                size="is-medium"
                @click="simple" />
            <b-button
                label="Launch notification (custom)"
                type="is-success"
                size="is-medium"
                @click="success" />
            <b-button
                label="Launch notification (custom)"
                type="is-danger"
                size="is-medium"
                @click="danger" />
            <b-button
                label="Launch notification (pause on hover)"
                type="is-link"
                size="is-medium"
                @click="pause" />
            <b-button
                label="Launch notification (shows remaining time in progress)"
                type="is-primary"
                size="is-medium"
                @click="progress" />
        </div>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BButton } from '@ntohq/buefy-next'

    export default defineComponent({
        components: { BButton },
        methods: {
            simple() {
                this.$buefy.notification.open('Something happened')
            },
            success() {
                this.$buefy.notification.open({
                    message: 'Something happened correctly!',
                    type: 'is-success'
                })
            },
            danger() {
                const notif = this.$buefy.notification.open({
                    duration: 5000,
                    message: `Something's not good, also I'm on <b>bottom</b>`,
                    position: 'is-bottom-right',
                    type: 'is-danger',
                    hasIcon: true,
                    onClose: () => {
                        this.$buefy.notification.open('Custom notification closed!')
                    }
                })
            },
            pause() {
                this.$buefy.notification.open({
                    message: `I can be paused if you hover over me`,
                    type: 'is-link',
                    pauseOnHover: true,
                })
            },
            progress() {
                this.$buefy.notification.open({
                    message: `I can show you a little progress bar displaying the remaining time!`,
                    duration: 5000,
                    progressBar: true,
                    type: 'is-primary',
                    pauseOnHover: true
                })
            },
        }
    })
</script>
