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

<script lang="ts">
import { defineComponent } from 'vue'
import { BButton, BIcon } from '@ntohq/buefy-next'
import TheNavbar from '../components/TheNavbar.vue'
import TheFooter from '../components/TheFooter.vue'

export default defineComponent({
    name: 'App',
    components: {
        BButton,
        BIcon,
        TheNavbar,
        TheFooter
    }
})
</script>
