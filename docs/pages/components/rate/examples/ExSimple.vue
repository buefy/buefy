<template>
    <section>
        <b-rate @change="success"></b-rate>
    </section>
</template>
<script>
    export default {
        methods: {
            success() {
                this.$buefy.toast.open({
                    message: 'Thanks for you Rate!',
                    type: 'is-success'
                })
            }
        }
    }
</script>