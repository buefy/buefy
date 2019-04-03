<template>
    <section>
        <b-button @click="clickMe">Click Me</b-button>
    </section>
</template>

<script>
    export default {
        methods: {
            clickMe() {
                this.$notification.open('Clicked!!')
            }
        }
    }
</script>
