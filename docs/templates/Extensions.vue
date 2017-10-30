<template>
    <section class="extensions">
        <the-header ref="header"></the-header>

        <div class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Extensions</h1>
                    <h2 class="subtitle">See how can you improve Buefy with other packages!</h2>
                </div>
            </div>
        </div>

        <nav class="navbar has-shadow">
            <div class="container">
                <nav class="navbar-tabs">
                    <router-link to="cleavejs" class="navbar-item is-tab">Cleave.js</router-link>
                </nav>
            </div>
        </nav>

        <section class="section">
            <router-view></router-view>
        </section>

        <the-footer></the-footer>
    </section>
</template>

<script>
    import TheHeader from '@/components/TheHeader'
    import TheFooter from '@/components/TheFooter'

    export default {
        components: {
            TheHeader,
            TheFooter
        }
    }
</script>
