<template>
    <section>
        <b-sidebar type="is-light" :open.sync="open">
            <img
                src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                alt="Lightweight UI components for Vue.js based on Bulma"
            >
        </b-sidebar>
        <b-button @click="show">Open</b-button>
    </section>
</template>

<script>
export default {
    data() {
        return {
            open: false
        }
    },
    methods: {
        show() {
            this.open = true
        }
    }
}
</script>