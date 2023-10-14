<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <a class="navbar-item">
                <img src="/static/img/buefy-logo.png" alt="Buefy">
            </a>
            <a class="navbar-item"><b-icon pack="fab" icon="github"></b-icon></a>
            <a class="navbar-item"><b-icon pack="fab" icon="twitter"></b-icon></a>
        </div>

        <div class="navbar-menu">
            <div class="navbar-end">
                <b-dropdown
                    append-to-body
                    aria-role="menu"
                    scrollable
                    max-height="200"
                    trap-focus
                >
                    <template #trigger>
                        <a
                            class="navbar-item"
                            role="button">
                            <span>Categories</span>
                            <b-icon icon="menu-down"></b-icon>
                        </a>
                    </template>

                    <b-dropdown-item custom aria-role="listitem">
                      <b-input v-model="searchTerm" placeholder="search" expanded />
                  </b-dropdown-item>

                    <b-dropdown-item v-for="item of filteredData" :key="item" aria-role="listitem">{{item}}</b-dropdown-item>
                </b-dropdown>

                <b-dropdown
                    position="is-bottom-left"
                    append-to-body
                    aria-role="menu"
                    trap-focus
                >
                    <template #trigger>
                        <a
                            class="navbar-item"
                            role="button">
                            <span>Login</span>
                            <b-icon icon="menu-down"></b-icon>
                        </a>
                    </template>


                    <b-dropdown-item
                        aria-role="menu-item"
                        :focusable="false"
                        custom
                        paddingless>
                        <form action="">
                            <div class="modal-card" style="width:300px;">
                                <section class="modal-card-body">
                                    <b-field label="Email">
                                        <b-input
                                            type="email"
                                            placeholder="Your email"
                                            required>
                                        </b-input>
                                    </b-field>

                                    <b-field label="Password">
                                        <b-input
                                            type="password"
                                            password-reveal
                                            placeholder="Your password"
                                            required>
                                        </b-input>
                                    </b-field>

                                    <b-checkbox>Remember me</b-checkbox>
                                </section>
                                <footer class="modal-card-foot">
                                    <b-button
                                        label="Login"
                                        type="is-primary" />
                                </footer>
                            </div>
                        </form>
                    </b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                searchTerm: '',
                  data: [
                    'Angular',
                    'Angular 2',
                    'Aurelia',
                    'Backbone',
                    'Ember',
                    'jQuery',
                    'Meteor',
                    'Node.js',
                    'Polymer',
                    'React',
                    'RxJS',
                    'Vue.js'
                ],
            }
        },
        computed: {
            filteredData() {
                return this.data.filter((item) => item.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0);
            }
        }
    }
</script>
