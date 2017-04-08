<template>
    <section class="home">
        <div class="hero is-fullheight is-primary">
            <div class="hero-head">
                <app-header home></app-header>
            </div>

            <div class="hero-body">
                <div class="container has-text-centered">
                    <!--<transition-group
                        appear
                        appear-active-class="zoomIn home-animation"
                        enter-active-class="zoomIn home-animation"
                        leave-active-class="zoomOut home-animation"
                        move-class="move">-->

                        <div key="img" class="logo-rounded home-hero">
                            <img src="../assets/buefy.png" alt="Buefy">
                        </div>
                        <h2 key="subtitle" class="subtitle home-hero"><strong>Lightweight</strong> UI components for <strong>Vue.js</strong> based on <strong>Bulma</strong></h2>
                        <pre key="npm" class="npm home-hero"><code>npm install buefy</code></pre>
                        <div key="buttons" class="buttons">
                            <router-link class="button is-medium is-primary is-inverted home-hero" to="/documentation/quick-start">
                                <span>Quick Start</span>
                            </router-link>
                            <a class="button is-medium is-primary is-outlined is-inverted home-hero" href="https://github.com/rafaelpimpa/buefy" target="_blank">
                                <b-icon pack="fa" icon="github"></b-icon> <span>GitHub</span>
                            </a>
                        </div>

                    <!--</transition-group>-->
                </div>
            </div>
        </div>

        <section class="hero">
            <div class="hero-body">
                <div class="container">
                    <nav class="columns">
                        <div class="column has-text-centered features">
                            <b-icon pack="fa" icon="github" size="is-large"></b-icon>
                            <p class="title is-4"><strong>Free</strong></p>
                            <p class="subtitle">Open source on <strong><a href="https://github.com/rafaelpimpa/buefy" target="_blank">GitHub</a></strong></p>
                        </div>
                        <div class="column has-text-centered features">
                            <b-icon icon="devices" size="is-large"></b-icon>
                            <p class="title is-4"><strong>Responsive</strong></p>
                            <p class="subtitle"><strong>Every</strong> component is responsive</p>
                        </div>
                        <div class="column has-text-centered features">
                            <b-icon icon="new_releases" size="is-large"></b-icon>
                            <p class="title is-4"><strong>Modern</strong></p>
                            <p class="subtitle">
                                Built with <strong><a href="https://vuejs.org/" target="_blank">Vue.js</a></strong>
                                and <strong><a href="http://bulma.io/" target="_blank">Bulma</a></strong>
                            </p>
                        </div>
                        <div class="column has-text-centered features">
                            <b-icon pack="fa" icon="paper-plane-o" size="is-large"></b-icon>
                            <p class="title is-4"><strong>Lightweight</strong></p>
                            <p class="subtitle">No other internal dependencies</p>
                        </div>
                    </nav>
                </div>
            </div>
        </section>

        <app-footer></app-footer>
    </section>
</template>

<script>
    import AppHeader from '../template/Header'
    import AppFooter from '../template/Footer'
    import ScrollReveal from 'scrollreveal'

    export default {
        name: 'app',
        components: {
            AppHeader,
            AppFooter
        },
        mounted() {
            const sr = ScrollReveal({
                duration: 600,
                delay: 200
            })
            sr.reveal('.home-hero', { delay: 0, origin: 'top' }, 200)
            sr.reveal('.features', 200)
        }
    }
</script>

<style lang="scss">
    .home-animation {
        animation-duration: 750ms;
    }
    .move {
        transition: transform 1s;
    }
</style>
