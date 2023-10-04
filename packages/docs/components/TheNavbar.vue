<template>
    <nav
        class="navbar docs-navbar is-spaced has-shadow"
        :class="{ 'is-primary is-transparent': light }"
    >
        <div class="container">
            <div class="navbar-brand">
                <router-link
                    to="/"
                    class="navbar-item"
                    title="Buefy: lightweight UI components for Vue.js based on Bulma"
                    active-class=""
                >
                    <img
                        v-if="light"
                        src="../assets/buefy-light.png"
                        alt="Buefy"
                    >
                    <img
                        v-else
                        src="../assets/buefy.png"
                        alt="Buefy"
                    >
                </router-link>

                <a
                    class="navbar-item"
                    :class="{ 'has-text-dark': !light }"
                    href="https://github.com/buefy/buefy"
                    target="_blank"
                    title="Github"
                >
                    <b-icon icon="github-circle" />
                </a>

                <a
                    class="navbar-item"
                    :class="{ 'has-text-discord': !light }"
                    href="https://discordapp.com/invite/ZkdFJMr"
                    target="_blank"
                    title="Discord"
                >
                    <b-icon icon="discord" />
                </a>

                <a
                    class="navbar-item"
                    :class="{ 'has-text-twitter': !light }"
                    href="https://twitter.com/walter_tommasi"
                    target="_blank"
                    title="Twitter"
                >
                    <b-icon icon="twitter" />
                </a>

                <span
                    class="navbar-burger burger"
                    :class="{ 'is-active': isMenuActive }"
                    @click="isMenuActive = !isMenuActive"
                >
                    <span />
                    <span />
                    <span />
                </span>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
                <div class="navbar-end">
                    <router-link
                        to="/"
                        exact
                        class="navbar-item"
                    >
                        Home
                    </router-link>

                    <router-link to="/documentation" class="navbar-item">
                        Documentation
                    </router-link>

                    <router-link to="/extensions" class="navbar-item">
                        Extensions
                    </router-link>

                    <router-link to="/expo" class="navbar-item">
                        Expo
                    </router-link>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <div class="navbar-link">
                            Info
                        </div>

                        <div class="navbar-dropdown is-boxed">
                            <strong class="navbar-item is-version">
                                <span class="has-text-primary">Buefy version</span>
                                <span class="has-text-grey">{{ version }}</span>
                            </strong>
                            <strong class="navbar-item is-version">
                                <span class="has-text-bulma">Bulma version</span>
                                <span class="has-text-grey">{{ bulmaVersion }}</span>
                            </strong>

                            <hr class="navbar-divider">
                            <a
                                class="navbar-item"
                                href="https://github.com/buefy/buefy/releases"
                                target="_blank"
                            >
                                Changelogs
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import buefyPackage from '../../package'
import bulmaPackage from 'bulma/package'

export default {
    props: {
        light: Boolean
    },
    data() {
        return {
            isMenuActive: false,
            version: buefyPackage.version,
            bulmaVersion: bulmaPackage.version
        }
    },
    methods: {
        closeMenu() {
            this.isMenuActive = false
        },
        toggleHtmlClip() {
            document
                .documentElement
                .classList
                .toggle('is-clipped-touch', this.isMenuActive)
        }
    },
    mounted() {
        this.$eventHub.on('navigate', this.closeMenu)
    }
}
</script>
