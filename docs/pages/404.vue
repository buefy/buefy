<template>
    <section>
        <TheNavbar/>

        <section class="hero is-medium is-light">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <b-icon icon="emoticon-sad" size="is-large" type="is-primary"/>
                    <h1 class="title">
                        {{ $route.meta.title }}
                    </h1>
                    <h2 class="subtitle">
                        {{ $route.meta.subtitle }}
                    </h2>
                    <b-button tag="router-link" to="/" type="is-primary">
                        Go to Homepage
                    </b-button>
                </div>
            </div>
        </section>

        <TheFooter/>
    </section>
</template>

<script>
import TheNavbar from '../components/TheNavbar'
import TheFooter from '../components/TheFooter'

export default {
    name: 'App',
    components: {
        TheNavbar,
        TheFooter
    }
}
</script>
