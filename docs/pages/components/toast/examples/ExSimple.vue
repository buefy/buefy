<template>
    <section>
        <div class="buttons">
            <b-button
                label="Launch toast (default)"
                size="is-medium"
                @click="toast" />
            <b-button
                label="Launch toast (custom)"
                type="is-success"
                size="is-medium"
                @click="success" />
            <b-button
                label="Launch toast (custom)"
                type="is-danger"
                size="is-medium"
                @click="danger" />
        </div>
    </section>
</template>

<script>
    export default {
        methods: {
            toast() {
                this.$buefy.toast.open('Something happened')
            },
            success() {
                this.$buefy.toast.open({
                    message: 'Something happened correctly!',
                    type: 'is-success'
                })
            },
            danger() {
                this.$buefy.toast.open({
                    duration: 5000,
                    message: `Something's not good, also I'm on <b>bottom</b>`,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            }
        }
    }
</script>
