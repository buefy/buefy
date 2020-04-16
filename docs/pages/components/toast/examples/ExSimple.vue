<template>
    <section>
        <div class="buttons">
            <button class="button is-medium" @click="toast">
                Launch toast (default)
            </button>

            <button class="button is-medium is-success" @click="success">
                Launch toast (custom)
            </button>

            <button class="button is-medium is-danger" @click="danger">
                Launch toast (custom)
            </button>
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
                    message: `Something's not good, also I'm on bottom`,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            }
        }
    }
</script>
