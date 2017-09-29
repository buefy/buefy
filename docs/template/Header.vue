<template>
    <header class="navbar is-transparent">
        <div class="container">
            <div class="navbar-brand">
                <router-link to="/" exact class="navbar-item" title="Buefy: lightweight UI components for Vue.js based on Bulma">
                    <img v-if="light" src="../assets/buefy-light.png" alt="Buefy">
                    <img v-else src="../assets/buefy.png" alt="Buefy">
                </router-link>

                <a class="navbar-item" href="https://github.com/rafaelpimpa/buefy" target="_blank" title="Github">
                    <b-icon pack="fa" icon="github"></b-icon>
                </a>

                <a class="navbar-item" href="https://twitter.com/rafaelpimpa" target="_blank" title="Twitter">
                    <b-icon pack="fa" icon="twitter"></b-icon>
                </a>

                <span class="navbar-burger burger"
                    :class="{ 'is-active': isMenuActive }"
                    @click="isMenuActive = !isMenuActive">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
                <div class="navbar-end">
                    <router-link to="/" exact class="navbar-item">Home</router-link>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <router-link to="/documentation" class="navbar-link">Documentation</router-link>

                        <div class="navbar-dropdown is-boxed">
                            <router-link to="/documentation/start" class="navbar-item">Installation</router-link>
                            <router-link to="/documentation/layout" class="navbar-item">General</router-link>
                            <router-link to="/documentation/dialog" class="navbar-item">Notices</router-link>
                            <router-link to="/documentation/field" class="navbar-item">Form</router-link>
                            <router-link to="/documentation/table" class="navbar-item">Data</router-link>
                            <hr class="navbar-divider">
                            <strong class="navbar-item version">
                                <span class="has-text-primary">Buefy version</span>
                                <span class="has-text-grey">{{ version }}</span>
                            </strong>
                            <strong class="navbar-item version">
                                <span class="has-text-bulma">Bulma version</span>
                                <span class="has-text-grey">{{ bulmaVersion }}</span>
                            </strong>
                            <hr class="navbar-divider">
                            <a class="navbar-item"
                                href="https://github.com/rafaelpimpa/buefy/releases"
                                target="_blank">
                                Changelogs
                            </a>
                        </div>
                    </div>

                    <div class="navbar-item">
                        <a class="button is-outlined"
                            :class="light ? 'is-light' : 'is-twitter'"
                            @click="tweet">
                            <b-icon pack="fa" icon="twitter"></b-icon> <span>Tweet</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import Package from '../../package.json'

    export default {
        props: {
            light: Boolean
        },
        data() {
            return {
                isMenuActive: false,
                version: Package.version,
                bulmaVersion: Package.dependencies.bulma.substr(1)
            }
        },
        methods: {
            tweet() {
                const width = 575
                const height = 400
                const left = (window.screen.width - width) / 2
                const top = (window.screen.height - height) / 2
                const url = `https://twitter.com/share?url=${encodeURIComponent(document.location.protocol + '//' + document.location.host)}&text=Buefy: lightweight UI components for Vue.js based on Bulma&hashtags=buefy&via=rafaelpimpa`
                const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`

                window.open(url, '', opts)
            }
        }
    }
</script>
