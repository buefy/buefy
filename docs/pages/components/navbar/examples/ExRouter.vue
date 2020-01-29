<template>
    <b-navbar ref="navbar">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }" :parent="navbar">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#" :parent="navbar">
                Home
            </b-navbar-item>
            <b-navbar-item href="#" :parent="navbar">
                Documentation
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <b-navbar-item href="#" :parent="navbar">
                    About
                </b-navbar-item>
                <b-navbar-item href="#" :parent="navbar">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="end">
            <b-navbar-item tag="div" :parent="navbar">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>


<script>
export default {
    data() {
        return {
            navbar: null
        }
    },
    mounted() {
        this.navbar = this.$refs.navbar
    }
}
</script>