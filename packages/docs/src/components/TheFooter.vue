<template>
    <footer class="footer">
        <div class="container">
            <div class="columns is-multiline is-variable is-6">
                <!-- Community -->
                <div class="column is-one-third">
                    <h5 class="title is-6">
                        Community
                    </h5>
                    <ul>
                        <li>
                            <a href="https://opencollective.com/buefy" class="navbar-item has-text-weight-semibold" target="_blank">
                                Buefy Open Collective
                            </a>
                        </li>
                        <li>
                            <router-link to="/events" class="navbar-item has-text-weight-semibold">
                                Events & Meetups
                            </router-link>
                        </li>
                        <li>
                            <a href="https://github.com/buefy/buefy/blob/dev/.github/CONTRIBUTING.md" class="navbar-item has-text-weight-semibold" target="_blank">
                                Contribute
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Resources -->
                <div class="column is-one-third">
                    <h5 class="title is-6">
                        Resources
                    </h5>
                    <ul>
                        <li>
                            <router-link to="/" exact class="navbar-item has-text-weight-semibold">
                                Home
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/documentation" class="navbar-item has-text-weight-semibold">
                                Documentation
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/documentation/start#stackblitz" class="navbar-item has-text-weight-semibold">
                                StackBlitz Examples
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/expo" class="navbar-item has-text-weight-semibold">
                                Expo
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Partners -->
                <div class="column is-one-third">
                    <h5 class="title is-6">
                        Partners
                    </h5>
                    <ul>
                        <li>
                            <router-link to="/sponsors" class="navbar-item has-text-weight-semibold">
                                Sponsors
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/support" class="navbar-item has-text-weight-semibold">
                                Get Support
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Social & Copyright -->
            <div class="level mt-5 is-size-7">
                <!-- Left: Copyright & Hosting -->
                <div class="level-left has-text-centered-mobile">
                    <div class="level-item">
                        <p>
                            Buefy © 2017–2025
                            <a href="http://opensource.org/licenses/mit-license.php" class="has-text-primary" target="_blank">MIT License</a><br>
                        </p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <p>
                        Website content licensed <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" class="has-text-primary" target="_blank">CC BY-NC-SA 4.0</a><br>
                        Powered by <a href="https://www.netlify.com" class="has-text-primary">Netlify</a>
                    </p>
                </div>

                <!-- Right: Social Icons -->
                <div class="level-right has-text-centered-mobile">
                    <div class="level-item">
                        <a
                            class="button is-small"
                            href="https://github.com/buefy/buefy"
                            target="_blank"
                        >
                            <b-icon icon="github" />
                        </a>
                        <a
                            class="button is-small is-discord ml-1"
                            href="https://discord.buefy.org"
                            target="_blank"
                        >
                            <b-icon icon="discord" />
                        </a>
                        <a
                            class="button is-small is-twitter ml-1"
                            href="https://twitter.com/buefycss"
                            target="_blank"
                        >
                            <b-icon
                                pack="fa"
                                custom-class="fa-brands"
                                icon="x-twitter"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { BIcon } from 'buefy'
</script>
