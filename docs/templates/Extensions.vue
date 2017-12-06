<template>
    <section class="extensions">
        <TheHeader ref="header" />

        <div class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Extensions</h1>
                    <h2 class="subtitle">See how can you improve Buefy with other packages!</h2>
                </div>
            </div>
        </div>

        <section class="section">
            <div class="container is-fullhd template-horizontal">
                <TheSidebar :data="menuExtensions" />
                <router-view></router-view>
            </div>
        </section>

        <TheFooter />
    </section>
</template>

<script>
    import DefaultMixin from './DefaultMixin'
    import { menuExtensions } from '../menu'

    export default {
        mixins: [DefaultMixin],
        data() {
            return {
                menuExtensions
            }
        }
    }
</script>
