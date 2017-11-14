<template>
    <header class="navbar header has-shadow" :class="{ 'is-primary is-transparent': light }">
        <div class="container">
            <div class="navbar-brand">
                <router-link
                    to="/"
                    exact
                    class="navbar-item"
                    title="Buefy: lightweight UI components for Vue.js based on Bulma">
                    <img v-if="light" src="../assets/buefy-light.png" alt="Buefy">
                    <img v-else src="../assets/buefy.png" alt="Buefy">
                </router-link>

                <a class="navbar-item" href="https://github.com/rafaelpimpa/buefy" target="_blank" title="Github">
                    <b-icon pack="fa" icon="github"></b-icon>
                </a>

                <a class="navbar-item" href="https://twitter.com/rafaelpimpa" target="_blank" title="Twitter">
                    <b-icon pack="fa" icon="twitter"></b-icon>
                </a>

                <span class="navbar-burger burger"
                    :class="{ 'is-active': isMenuActive }"
                    @click="isMenuActive = !isMenuActive">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
                <div class="navbar-end">
                    <router-link to="/" exact class="navbar-item">Home</router-link>

                    <router-link to="/documentation" class="navbar-item is-hidden-touch">Documentation</router-link>

                    <!-- Mobile documentation menu -->
                    <div class="navbar-item has-dropdown is-hoverable is-hidden-desktop">
                        <div class="navbar-item">Documentation</div>

                        <div class="navbar-dropdown is-boxed">
                            <template v-for="items in menuDocumentation">
                                <div
                                    :key="items.category"
                                    class="navbar-item has-text-weight-semibold is-uppercase has-text-grey">
                                    {{ items.category }}
                                </div>

                                <router-link
                                    v-for="page in items.pages"
                                    :key="page.name"
                                    :to="`/documentation/${$options.filters.slugify(page.name)}`"
                                    class="navbar-item">
                                    {{ page.name }}
                                </router-link>

                                <hr :key="items.category"
                                    class="navbar-divider"
                                    style="display: block;">
                            </template>
                        </div>
                    </div>

                    <router-link to="/extensions" class="navbar-item is-hidden-touch">Extensions</router-link>

                    <!-- Mobile extensions menu -->
                    <div class="navbar-item has-dropdown is-hoverable is-hidden-desktop">
                        <!-- <div class="navbar-item">Extensions</div> -->

                        <div class="navbar-dropdown is-boxed">
                            <template v-for="items in menuExtensions">
                                <div
                                    :key="items.category"
                                    class="navbar-item has-text-weight-semibold is-uppercase has-text-grey">
                                    {{ items.category }}
                                </div>

                                <router-link
                                    v-for="page in items.pages"
                                    :key="page.name"
                                    :to="`/extensions/${$options.filters.slugify(page.name)}`"
                                    class="navbar-item">
                                    {{ page.name }}
                                </router-link>

                                <hr :key="items.category"
                                    class="navbar-divider"
                                    style="display: block;">
                            </template>
                        </div>
                    </div>

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
                            <a class="navbar-item"
                                href="https://github.com/rafaelpimpa/buefy/releases"
                                target="_blank">
                                Changelogs
                            </a>
                        </div>
                    </div>

                    <div class="navbar-item">
                        <a class="button is-outlined"
                            :class="light ? 'is-light' : 'is-twitter'"
                            @click="tweet">
                            <b-icon pack="fa" icon="twitter"></b-icon>
                            <span>Tweet</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import Package from '../../package.json'

    export default {
        props: {
            light: Boolean
        },
        data() {
            return {
                isMenuActive: false,
                version: Package.version,
                bulmaVersion: Package.dependencies.bulma.substr(1),
                menuDocumentation: [
                    {
                        category: 'Installation',
                        pages: [
                            {
                                name: 'Start'
                            },
                            {
                                name: 'Customization'
                            },
                            {
                                name: 'Constructor options'
                            }
                        ]
                    },
                    {
                        category: 'General',
                        pages: [
                            {
                                name: 'Layout'
                            },
                            {
                                name: 'Icon'
                            },
                            {
                                name: 'Dropdown'
                            },
                            {
                                name: 'Modal'
                            },
                            {
                                name: 'Collapse'
                            },
                            {
                                name: 'Tabs'
                            },
                            {
                                name: 'Tag'
                            },
                            {
                                name: 'Tooltip'
                            }
                        ]
                    },
                    {
                        category: 'Notices',
                        pages: [
                            {
                                name: 'Dialog'
                            },
                            {
                                name: 'Toast'
                            },
                            {
                                name: 'Snackbar'
                            },
                            {
                                name: 'Notification'
                            },
                            {
                                name: 'Message'
                            },
                            {
                                name: 'Loading'
                            }
                        ]
                    },
                    {
                        category: 'Form',
                        pages: [
                            {
                                name: 'Field'
                            },
                            {
                                name: 'Input'
                            },
                            {
                                name: 'Select'
                            },
                            {
                                name: 'Autocomplete'
                            },
                            {
                                name: 'Checkbox'
                            },
                            {
                                name: 'Radio'
                            },
                            {
                                name: 'Switch'
                            },
                            {
                                name: 'Upload'
                            },
                            {
                                name: 'Datepicker'
                            },
                            {
                                name: 'Timepicker',
                                isNew: true
                            }
                        ]
                    },
                    {
                        category: 'Data',
                        pages: [
                            {
                                name: 'Table'
                            },
                            {
                                name: 'Pagination'
                            }
                        ]
                    }
                ],
                menuExtensions: [
                    {
                        category: 'Extensions',
                        pages: [
                            {
                                name: 'Cleavejs'
                            }
                        ]
                    }
                ]
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
        }
    }
</script>
