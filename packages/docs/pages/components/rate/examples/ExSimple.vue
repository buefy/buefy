<template>
    <section>
        <b-rate custom-text="With MDI"></b-rate>
        <b-rate 
            icon-pack="fas" 
            @change="success" 
            custom-text="With Font Awesome"></b-rate>
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
