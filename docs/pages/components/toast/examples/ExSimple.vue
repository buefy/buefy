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
        <div class="buttons">
            <b-button
                label="Launch toast (indefinite)"
                type="is-success"
                size="is-medium"
                @click="indefinite" />
            <b-button
                v-if="indefinteToast"
                label="close toast (indefinite)"
                type="is-danger"
                size="is-medium"
                @click="closeIndefinite" />
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                indefinteToast: null
            }
        },
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
            },

            indefinite() {
                this.indefinteToast = this.$buefy.toast.open({
                    indefinite: true,
                    message: `I won't close until you explicitly close me!`,
                    type: 'is-warning'
                })
            },
            closeIndefinite() {
                if (this.indefinteToast) {
                    this.indefinteToast.close();
                    this.indefinteToast = null;
                }
            }
        }
    }
</script>
