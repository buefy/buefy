<template>
    <section>
        <div class="hero is-primary is-fullheight">
            <div class="hero-head">
                <app-header twitter-button-class="is-light"></app-header>
            </div>

            <div class="hero-body">
                <div class="container has-text-centered">
                    <transition-group
                        appear
                        mode="out-in"
                        appear-active-class="zoomIn"
                        enter-active-class="zoomIn"
                        leave-active-class="zoomOut">

                        <h1 key="title" class="title is-1 home-animation">Buefy</h1>
                        <h1 key="install" class="title is-1 home-animation">Buefy</h1>
                        <h1 key="logo" class="title is-1 home-animation">Buefy</h1>

                    </transition-group>
                </div>
            </div>
        </div>

        <app-footer></app-footer>
    </section>
</template>

<script>
    import AppHeader from '../template/Header'
    import AppFooter from '../template/Footer'

    export default {
        name: 'app',
        components: {
            AppHeader,
            AppFooter
        },
        data() {
            return {
                toggle: false
            }
        }
    }
</script>

<style>
    .home-animation {
        animation-duration: 750ms;
    }
</style>
