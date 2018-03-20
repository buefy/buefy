<template>
    <header class="navbar header has-shadow" :class="{ 'is-primary is-transparent': light }">
        <div class="container">
            <div class="navbar-brand">
                <router-link
                    to="/"
                    class="navbar-item"
                    title="Buefy: lightweight UI components for Vue.js based on Bulma"
                    active-class="">
                    <img
                        v-if="light"
                        src="../assets/buefy-light.png"
                        alt="Buefy">
                    <img
                        v-else
                        src="../assets/buefy.png"
                        alt="Buefy">
                </router-link>

                <a
                    class="navbar-item"
                    href="https://github.com/buefy/buefy"
                    target="_blank"
                    title="Github">
                    <b-icon icon="github-circle"/>
                </a>

                <a
                    class="navbar-item"
                    href="https://twitter.com/rafaelpimpa"
                    target="_blank"
                    title="Twitter">
                    <b-icon icon="twitter"/>
                </a>

                <a
                    class="navbar-item"
                    href="https://discordapp.com/invite/ZkdFJMr"
                    target="_blank"
                    title="Discord">
                    <b-icon icon="discord"/>
                </a>

                <span
                    class="navbar-burger burger"
                    :class="{ 'is-active': isMenuActive }"
                    @click="isMenuActive = !isMenuActive">
                    <span/>
                    <span/>
                    <span/>
                </span>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
                <div class="navbar-end">
                    <router-link
                        to="/"
                        exact
                        class="navbar-item">
                        Home
                    </router-link>

                    <hr class="navbar-divider" style="display: block;">

                    <router-link
                        to="/documentation"
                        class="navbar-item is-hidden-touch">
                        Documentation
                    </router-link>

                    <!-- Mobile documentation menu -->
                    <div class="navbar-item has-dropdown is-hoverable is-hidden-desktop">
                        <div class="navbar-item">Documentation</div>

                        <div class="navbar-dropdown is-boxed">
                            <template v-for="items in menu['documentation']">
                                <div
                                    :key="items.category"
                                    class="navbar-item is-subitem">
                                    {{ items.category }}
                                </div>

                                <template v-for="page in items.pages">
                                    <router-link
                                        v-if="page.name"
                                        :key="page.name"
                                        :to="page.path"
                                        class="navbar-item">
                                        <span class="navbar-item-text">{{ page.name }}</span>
                                        <b-tag v-if="page.isNew" type="is-success">New!</b-tag>
                                        <b-tag v-if="page.isUpdated" type="is-info">Updated</b-tag>
                                    </router-link>

                                    <!-- submenu -->
                                    <template v-else>
                                        <div class="navbar-item" :key="page.name">
                                            {{ page.category }}
                                        </div>
                                        <router-link
                                            v-for="page in page.pages"
                                            :key="page.name"
                                            :to="page.path"
                                            class="navbar-item"
                                            style="margin-left: 1rem;">
                                            <span class="navbar-item-text">{{ page.name }}</span>
                                            <b-tag v-if="page.isNew" type="is-success">
                                                New!
                                            </b-tag>
                                            <b-tag v-if="page.isUpdated" type="is-info">
                                                Updated
                                            </b-tag>
                                        </router-link>
                                    </template>
                                </template>

                            </template>
                        </div>
                    </div>
                    <hr class="navbar-divider" style="display: block;">

                    <router-link to="/extensions" class="navbar-item is-hidden-touch">
                        Extensions
                    </router-link>

                    <!-- Mobile extensions menu -->
                    <div class="navbar-item has-dropdown is-hoverable is-hidden-desktop">
                        <div class="navbar-item">Extensions</div>

                        <div class="navbar-dropdown is-boxed">
                            <template v-for="items in menu['extensions']">
                                <router-link
                                    v-for="page in items.pages"
                                    :key="page.name"
                                    :to="page.path"
                                    class="navbar-item">
                                    <span class="navbar-item-text">{{ page.name }}</span>
                                    <b-tag v-if="page.isNew" type="is-success">New!</b-tag>
                                </router-link>
                            </template>
                        </div>
                    </div>

                    <hr class="navbar-divider" style="display: block;">

                    <div class="navbar-item has-dropdown is-hoverable">
                        <div class="navbar-link">Info</div>

                        <div class="navbar-dropdown is-boxed">
                            <strong class="navbar-item version">
                                <span class="has-text-primary">Buefy version</span>
                                <span class="has-text-grey">{{ version }}</span>
                            </strong>
                            <strong class="navbar-item version">
                                <span class="has-text-bulma">Bulma version</span>
                                <span class="has-text-grey">{{ bulmaVersion }}</span>
                            </strong>

                            <hr class="navbar-divider">
                            <a
                                class="navbar-item"
                                href="https://github.com/buefy/buefy/releases"
                                target="_blank">
                                Changelogs
                            </a>
                        </div>
                    </div>

                    <div class="navbar-item">
                        <a
                            class="button is-outlined"
                            :class="light ? 'is-light' : 'is-twitter'"
                            @click="tweet">
                            <b-icon icon="twitter"/>
                            <span>Tweet</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import buefyPackage from '../../package'
    import bulmaPackage from 'bulma/package'
    import menu from '../menu'

    export default {
        props: {
            light: Boolean
        },
        data() {
            return {
                menu,
                isMenuActive: false,
                version: buefyPackage.version,
                bulmaVersion: bulmaPackage.version
            }
        },
        methods: {
            tweet() {
                const width = 575
                const height = 400
                const left = (window.screen.width - width) / 2
                const top = (window.screen.height - height) / 2
                const url = `https://twitter.com/share?url=${encodeURIComponent(document.location.protocol + '//' + document.location.host)}&text=Buefy: lightweight UI components for Vue.js based on Bulma&hashtags=buefy&via=rafaelpimpa`
                const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`

                window.open(url, '', opts)
            },
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
        created() {
            this.$eventHub.$on('close-menu', this.closeMenu)
        },
        beforeDestroy() {
            this.$eventHub.$off('close-menu')
        }
    }
</script>
