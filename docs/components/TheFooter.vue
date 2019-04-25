<template>
    <footer class="footer">
        <div class="container">
            <div class="content">
                <div class="columns">
                    <div class="column">
                        <p>
                            Made with
                            <b-icon
                                icon="heart"
                                type="is-danger"
                                style="vertical-align: middle;"
                            />
                            by
                            <a href="https://twitter.com/rafaelpimpa" target="_blank">Rafael Beraldo</a>
                            with great support by
                            <a href="https://twitter.com/walter_tommasi" target="_blank">Walter Tommasi</a>.
                        </p>
                        <p>
                            <small>
                                Buefy's source code is licensed under
                                <a href="http://opensource.org/licenses/mit-license.php" target="_blank">MIT</a>.
                            </small>
                        </p>

                        <b-field>
                            <p class="control">
                                <a
                                    class="button"
                                    href="https://github.com/buefy/buefy"
                                    target="_blank">
                                    <b-icon icon="github-circle"/>
                                    <span>GitHub</span>
                                </a>
                            </p>
                            <p class="control">
                                <a
                                    class="button is-twitter"
                                    href="https://twitter.com/rafaelpimpa"
                                    target="_blank">
                                    <b-icon icon="twitter"/>
                                    <span>Twitter</span>
                                </a>
                            </p>
                            <p class="control">
                                <a
                                    class="button is-patreon"
                                    href="https://www.patreon.com/jtommy"
                                    target="_blank">
                                    <b-icon icon="patreon"/>
                                    <span>Patreon</span>
                                </a>
                            </p>
                        </b-field>
                    </div>

                    <div class="column">
                        <router-link
                            to="/"
                            exact
                            class="navbar-item has-text-weight-semibold">
                            Home
                        </router-link>

                        <router-link
                            to="/documentation"
                            class="navbar-item has-text-weight-semibold">
                            Documentation
                        </router-link>

                        <router-link
                            to="/extensions"
                            class="navbar-item has-text-weight-semibold">
                            Extensions
                        </router-link>

                        <router-link
                            to="/expo"
                            class="navbar-item has-text-weight-semibold">
                            Expo
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
