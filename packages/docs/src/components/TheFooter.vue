<template>
    <footer
        class="footer"
        role="contentinfo"
        aria-label="Site footer"
    >
        <div class="container">
            <div class="footer-grid">
                <!-- Brand column -->
                <div class="footer-brand">
                    <img
                        src="../assets/buefy.png"
                        alt="Buefy logo"
                        class="footer-logo"
                    >
                    <p class="footer-tagline mt-2">
                        Lightweight UI components for Vue.js based on Bulma.
                    </p>
                    <span class="footer-version tag is-primary">v{{ version }}</span>
                    <div class="footer-ctas mt-3">
                        <a
                            href="https://github.com/buefy/buefy"
                            class="button is-small is-dark"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Star Buefy on GitHub"
                        >
                            <b-icon icon="github" size="is-small" />
                            <span>Star on GitHub</span>
                        </a>
                    </div>
                    <div class="footer-install mt-3">
                        <pre class="footer-npm"><code>npm install buefy</code></pre>
                        <p class="footer-compat is-size-7 mt-2">
                            <span class="has-text-warning">⚠</span>
                            Vue 2 — EOL, no longer receiving updates<br>
                            <span class="has-text-success">✓</span> Vue 3 — fully supported
                        </p>
                    </div>
                </div>

                <!-- Resources -->
                <nav aria-label="Resources navigation">
                    <h5 class="footer-heading">
                        Resources
                    </h5>
                    <ul>
                        <li>
                            <router-link
                                to="/"
                                exact
                                class="footer-link"
                            >
                                Home
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/documentation"
                                class="footer-link"
                            >
                                Documentation
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/changelog"
                                class="footer-link"
                            >
                                Changelog
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/documentation"
                                class="footer-link"
                            >
                                Component gallery
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/documentation/start#stackblitz"
                                class="footer-link"
                            >
                                StackBlitz examples
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/expo"
                                class="footer-link"
                            >
                                Expo
                            </router-link>
                        </li>
                    </ul>
                </nav>

                <!-- Community -->
                <nav aria-label="Community navigation">
                    <h5 class="footer-heading">
                        Community
                    </h5>
                    <ul>
                        <li>
                            <a
                                href="https://opencollective.com/buefy"
                                class="footer-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open Collective
                            </a>
                        </li>
                        <li>
                            <router-link
                                to="/events"
                                class="footer-link"
                            >
                                Events &amp; Meetups
                            </router-link>
                        </li>
                        <li>
                            <a
                                href="https://github.com/buefy/buefy/blob/dev/.github/CONTRIBUTING.md"
                                class="footer-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Contribute
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/buefy/buefy/discussions"
                                class="footer-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub Discussions
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/buefy/buefy/issues/new?template=BUG_REPORT.md"
                                class="footer-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Report a bug
                            </a>
                        </li>
                    </ul>
                </nav>

                <!-- Partners -->
                <nav aria-label="Partners navigation">
                    <h5 class="footer-heading">
                        Partners
                    </h5>
                    <ul>
                        <li>
                            <router-link
                                to="/sponsors"
                                class="footer-link"
                            >
                                Sponsors
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/support"
                                class="footer-link"
                            >
                                Get support
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/enterprise"
                                class="footer-link"
                            >
                                Enterprise
                            </router-link>
                        </li>
                    </ul>
                </nav>

                <!-- Legal -->
                <nav aria-label="Legal navigation">
                    <h5 class="footer-heading">
                        Legal
                    </h5>
                    <ul>
                        <li>
                            <a
                                href="http://opensource.org/licenses/mit-license.php"
                                class="footer-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                MIT License
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                                class="footer-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CC BY-NC-SA 4.0
                            </a>
                        </li>
                        <li>
                            <router-link
                                to="/privacy"
                                class="footer-link"
                            >
                                Privacy Policy
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>

            <!-- Social & Copyright -->
            <div class="level mt-5 is-size-7">
                <!-- Left: Copyright & Hosting -->
                <div class="level-left has-text-centered-mobile">
                    <div class="level-item">
                        <p>
                            Buefy &copy; 2017&ndash;{{ currentYear }}
                            <a
                                href="http://opensource.org/licenses/mit-license.php"
                                class="has-text-primary"
                                target="_blank"
                            >
                                MIT License
                            </a><br>
                        </p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <p>
                        Website content licensed
                        <a
                            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                            class="has-text-primary"
                            target="_blank"
                        >
                            CC BY-NC-SA 4.0
                        </a><br>
                        Powered by
                        <a
                            href="https://www.netlify.com"
                            class="has-text-primary"
                        >
                            Netlify
                        </a>
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
import Package from '../../../../package.json'

const version = Package.version
const currentYear = new Date().getFullYear()
</script>
