<template>
    <div id="app">
        <div class="container">
            <nav class="nav">
                <div class="nav-left">
                    <router-link to="/" exact class="nav-item title is-4 is-brand"><strong>Buefy</strong></router-link>
                </div>
                <div class="nav-center">
                    <a href="https://github.com/rafaelpimpa/buefy" class="nav-item" target="_blank">
                        <b-icon pack="fa" icon="github"></b-icon>
                    </a>
                    <a href="https://twitter.com/rafaelpimpa" class="nav-item" target="_blank">
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
                        <a class="button is-twitter is-outlined" @click="tweet">
                            <b-icon pack="fa" icon="twitter" class="mr-4"></b-icon> Tweet
                        </a>
                    </div>
                </div>
            </nav>
        </div>

        <router-view></router-view>
        <vue-progress-bar></vue-progress-bar>

        <footer class="footer">
            <div class="container">
                <div class="content">
                    <p>Made with <b-icon icon="favorite" class="is-danger"></b-icon> by <a href="https://twitter.com/rafaelpimpa" target="_blank">Rafael Beraldo</a>.</p>
                    <p class="mb-0"><small>The source code is licensed under <a href="http://opensource.org/licenses/mit-license.php" target="_blank">MIT</a>.</small></p>
                    <p><small>The website content is licensed under <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC ANS 4.0</a>.</small></p>
                    <div class="field has-addons">
                        <p class="control">
                            <a class="button" href="https://github.com/rafaelpimpa/buefy" target="_blank">
                                <b-icon class="mr-4" pack="fa" icon="github"></b-icon> GitHub
                            </a>
                        </p>
                        <p class="control">
                            <a class="button is-twitter" href="https://twitter.com/rafaelpimpa" target="_blank">
                                <b-icon class="mr-4" pack="fa" icon="twitter"></b-icon> Twitter
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'app',
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
                const url = `https://twitter.com/share?url=${window.location.href}&text=Buefy: lightweight Bulma UI components for Vue.js&hashtags=buefy&via=rafaelpimpa`
                const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`

                window.open(url, '', opts)
            }
        },
        mounted() {
            this.$Progress.finish()
        },
        created() {
            this.$Progress.start()
            this.$router.beforeEach((to, from, next) => {
                this.$Progress.start()
                next()
            })
            this.$router.afterEach((to, from) => {
                this.$Progress.finish()
            })
        }
    }
</script>

<style lang="scss">
    @import "~highlight.js/styles/atelier-cave-light.css";
    @import "./assets/main.scss";
    @import "../src/scss/buefy-theme";

    .is-brand {
        color: $primary !important;
    }

    pre {
        white-space: pre-wrap;
    }
    .hljs {
        background: inherit;
        color: inherit;
        padding: 1.25rem 1.5rem;
    }

    .example {
        border: 1px solid #ffdd57;
        border-top-right-radius: 3px;
        color: rgba(0, 0, 0, 0.7);
        padding: 1.5rem;
        position: relative;

        &:before {
            background: #ffdd57;
            border-radius: 3px 3px 0 0;
            bottom: 100%;
            content: "Example";
            display: inline-block;
            font-size: 7px;
            font-weight: bold;
            left: -1px;
            letter-spacing: 1px;
            padding: 3px 5px;
            position: absolute;
            text-transform: uppercase;
            vertical-align: top;
        }
    }
</style>
