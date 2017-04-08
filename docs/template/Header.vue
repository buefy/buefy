<template>
    <header class="nav">
        <div class="container">
            <div class="nav-left">
                <router-link to="/" exact class="nav-item is-brand">
                    <img v-if="home" src="../assets/buefy-light.png" alt="Buefy">
                    <img v-else src="../assets/buefy.png" alt="Buefy">
                </router-link>
            </div>
            <div class="nav-center">
                <a class="nav-item" href="https://github.com/rafaelpimpa/buefy" target="_blank">
                    <b-icon pack="fa" icon="github"></b-icon>
                </a>
                <a class="nav-item" href="https://twitter.com/rafaelpimpa" target="_blank">
                    <b-icon pack="fa" icon="twitter"></b-icon>
                </a>
            </div>

            <span class="nav-toggle" :class="{ 'is-active': isMenuActive }" @click="isMenuActive = !isMenuActive">
                <span></span>
                <span></span>
                <span></span>
            </span>

            <div class="nav-right nav-menu" :class="{ 'is-active': isMenuActive }">
                <router-link to="/" exact class="nav-item">Home</router-link>
                <router-link to="/documentation" class="nav-item">Documentation</router-link>

                <div class="nav-item">
                    <a class="button is-outlined" :class="home ? 'is-light' : 'is-twitter'" @click="tweet">
                        <b-icon pack="fa" icon="twitter" class="mr-4"></b-icon> Tweet
                    </a>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import { EventBus } from '../main'

    export default {
        props: {
            home: Boolean
        },
        data() {
            return {
                isMenuActive: false
            }
        },
        methods: {
            tweet() {
                const width = 575
                const height = 400
                const left = (window.screen.width - width) / 2
                const top = (window.screen.height - height) / 2
                const url = `https://twitter.com/share?url=${encodeURI(window.location.href)}&text=Buefy: lightweight UI components for Vue.js based on Bulma&hashtags=buefy&via=rafaelpimpa`
                const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`

                window.open(url, '', opts)
            }
        },
        created() {
            EventBus.$on('routeBeforeEach', (to, from) => {
                this.isMenuActive = false
            })
        }
    }
</script>
