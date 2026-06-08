<template>
    <section class="home-hero-section">
        <div class="home-hero-inner container has-text-centered">
            <span class="hero-badge home-hero">
                <span class="badge-dot" />
                Vue 3 · Built on Bulma
            </span>

            <h1 class="hero-headline home-hero">
                Lightweight UI Components<br>
                for <span class="headline-accent">Vue 3</span>
            </h1>

            <p class="hero-sub home-hero">
                40+ accessible, responsive components based on Bulma.
                Drop into any Buefy Vue 3 project in minutes.
            </p>

            <div class="hero-ctas home-hero">
                <router-link to="/documentation/start" class="btn-primary">
                    Get Started
                </router-link>
                <router-link to="/documentation" class="btn-ghost">
                    Browse Components →
                </router-link>
            </div>

            <div class="install-block home-hero">
                <code>npm install buefy</code>
                <button class="copy-btn" @click="copyInstall">
                    <span v-if="copied">✓ Copied</span>
                    <span v-else>Copy</span>
                </button>
            </div>

            <div class="hero-gh-buttons home-hero">
                <iframe
                    src="https://ghbtns.com/github-btn.html?user=buefy&repo=buefy&type=star&count=true&size=large"
                    frameborder="0"
                    scrolling="0"
                    width="160px"
                    height="30px"
                />
                <iframe
                    src="https://ghbtns.com/github-btn.html?user=buefy&repo=buefy&type=fork&count=false&size=large"
                    frameborder="0"
                    scrolling="0"
                    width="80px"
                    height="30px"
                />
            </div>

            <small class="home-hero">v{{ version }}</small>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'HomeHero',
    props: {
        version: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            copied: false
        }
    },
    methods: {
        copyInstall() {
            navigator.clipboard.writeText('npm install buefy').then(() => {
                this.copied = true
                setTimeout(() => { this.copied = false }, 2000)
            })
        }
    },
    mounted() {
        this.$nextTick(() => {
            const homeHeroElements = document.querySelectorAll('.home-hero')
            homeHeroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('reveal-animation')
                }, index * 100)
            })
        })
    }
})
</script>

<style scoped>
.home-hero {
    opacity: 0;
    transform: translateY(20px);
    transition: transform 0.6s ease-out;
}

.home-hero.reveal-animation {
    opacity: 1;
    transform: translateY(0);
}
</style>
