<template>
    <b-navbar
        ref="navbar"
        v-model="isMenuOpen"
        class="docs-navbar"
        :type="isLight ? 'is-primary' : ''"
        :transparent="isLight"
        wrapper-class="container"
        spaced
        shadow
    >
        <template #brand>
            <b-navbar-item
                tag="router-link"
                to="/"
                active-class=""
                title="Buefy: lightweight UI components for Vue.js based on Bulma"
            >
                <img
                    v-if="isLight"
                    src="../assets/buefy-light.png"
                    alt="Buefy"
                >
                <img
                    v-else
                    src="../assets/buefy.png"
                    alt="Buefy"
                >
            </b-navbar-item>

            <b-navbar-item
                tag="a"
                href="https://github.com/buefy/buefy"
                target="_blank"
                title="Github"
            >
                <b-icon icon="github" />
            </b-navbar-item>

            <b-navbar-item
                tag="a"
                href="https://discord.buefy.org/"
                target="_blank"
                title="Discord"
            >
                <b-icon icon="discord" />
            </b-navbar-item>

            <b-navbar-item
                tag="a"
                href="https://x.com/buefycss"
                target="_blank"
                title="Twitter"
            >
                <b-icon
                    pack="fa"
                    custom-class="fa-brands"
                    icon="x-twitter"
                />
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item
                tag="router-link"
                to="/"
                exact
            >
                Home
            </b-navbar-item>

            <b-navbar-item tag="router-link" to="/documentation">
                Documentation
            </b-navbar-item>

            <b-navbar-item tag="router-link" to="/extensions">
                Extensions
            </b-navbar-item>

            <b-navbar-item tag="router-link" to="/expo">
                Expo
            </b-navbar-item>

            <b-navbar-dropdown label="Info" hoverable>
                <strong class="navbar-item is-version">
                    <span class="has-text-primary">Buefy version</span>
                    <span class="has-text-grey">{{ version }}</span>
                </strong>
                <strong class="navbar-item is-version">
                    <span class="has-text-bulma">Bulma version</span>
                    <span class="has-text-grey">{{ bulmaVersion }}</span>
                </strong>
                <hr class="navbar-divider">
                <b-navbar-item
                    tag="a"
                    href="https://github.com/buefy/buefy/releases"
                    target="_blank"
                    rel="noopener"
                >
                    Changelogs
                </b-navbar-item>
            </b-navbar-dropdown>

            <b-navbar-item tag="div">
                <router-link to="/documentation/start" class="navbar-cta">
                    Get Started
                </router-link>
            </b-navbar-item>

            <b-navbar-item tag="div">
                <ThemeToggle />
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BNavbar, BNavbarItem, BNavbarDropdown, BIcon } from 'buefy'

import ThemeToggle from '@/components/ThemeToggle.vue'
import buefyPackage from '../../../../package.json'
import bulmaPackage from 'bulma/package.json'
import { useTheme } from '@/composables/useTheme'

export default defineComponent({
    components: { BNavbar, BNavbarItem, BNavbarDropdown, BIcon, ThemeToggle },
    data() {
        return {
            isMenuOpen: false,
            isLight: useTheme().isLight,
            version: buefyPackage.version,
            bulmaVersion: bulmaPackage.version
        }
    },
    methods: {
        closeMenu() {
            this.isMenuOpen = false
        },
        onScroll() {
            const navEl = (this.$refs.navbar as InstanceType<typeof BNavbar>).$el as HTMLElement
            navEl.classList.toggle('is-scrolled', window.scrollY > 60)
        }
    },
    mounted() {
        this.$eventHub.on('navigate', this.closeMenu)

        // Apply scroll-blur class directly on the underlying <nav> element
        // since BNavbar uses a render function (class fallthrough isn't guaranteed)
        const navEl = (this.$refs.navbar as InstanceType<typeof BNavbar>).$el as HTMLElement
        navEl.classList.add('docs-navbar')
        window.addEventListener('scroll', this.onScroll, { passive: true })

        useTheme().setTheme(useTheme().getTheme())
    },
    beforeUnmount() {
        this.$eventHub.off('navigate', this.closeMenu)
        window.removeEventListener('scroll', this.onScroll)
    }
})
</script>
