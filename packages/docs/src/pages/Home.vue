<template>
    <section class="home">
        <TheNavbar />
        <HomeHero :version="version" />
        <HomeStats />
        <HomeFeatures />
        <HomeCompat />
        <HomeInstall />
        <HomeComponentBrowser />
        <HomeCommunity />
        <TheFooter />
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TheNavbar from '../components/TheNavbar.vue'
import TheFooter from '../components/TheFooter.vue'
import HomeHero from '../components/home/HomeHero.vue'
import HomeStats from '../components/home/HomeStats.vue'
import HomeFeatures from '../components/home/HomeFeatures.vue'
import HomeCompat from '../components/home/HomeCompat.vue'
import HomeInstall from '../components/home/HomeInstall.vue'
import HomeComponentBrowser from '../components/home/HomeComponentBrowser.vue'
import HomeCommunity from '../components/home/HomeCommunity.vue'
import Package from '../../../../package.json'

export default defineComponent({
    name: 'HomePage',
    components: {
        TheNavbar,
        TheFooter,
        HomeHero,
        HomeStats,
        HomeFeatures,
        HomeCompat,
        HomeInstall,
        HomeComponentBrowser,
        HomeCommunity,
    },
    data() {
        return {
            version: Package.version,
        }
    },
})
</script>
