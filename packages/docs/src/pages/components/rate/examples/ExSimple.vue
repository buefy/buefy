<template>
    <section>
        <b-rate custom-text="With MDI"></b-rate>
        <b-rate
            icon-pack="fas"
            @change="success"
            custom-text="With Font Awesome"></b-rate>
    </section>
</template>
<script lang="ts">
    import { defineComponent } from 'vue'
    import { BRate } from '@ntohq/buefy-next'

    export default {
        components: {
            BRate
        },
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
