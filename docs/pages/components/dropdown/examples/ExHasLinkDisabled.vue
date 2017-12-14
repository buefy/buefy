<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <a class="navbar-item">
                <img src="static/img/buefy-logo.png" alt="Buefy">
            </a>
            <a class="navbar-item"><b-icon pack="fa" icon="github"></b-icon></a>
            <a class="navbar-item"><b-icon pack="fa" icon="twitter"></b-icon></a>
        </div>

        <div class="navbar-menu">
            <div class="navbar-end">
                <b-dropdown v-model="navigation" position="is-bottom-left">
                    <a class="navbar-item" slot="trigger">
                        <span>Menu</span>
                        <b-icon icon="menu-down"></b-icon>
                    </a>

                    <b-dropdown-item custom>
                        Logged as <b>Rafael Beraldo</b>
                    </b-dropdown-item>
                    <hr class="dropdown-divider">
                    <b-dropdown-item has-link>
                        <a href="https://google.com" target="_blank">
                            <b-icon icon="link"></b-icon>
                            Google (link)
                        </a>
                    </b-dropdown-item>
                    <b-dropdown-item value="home">
                        <b-icon icon="home"></b-icon>
                        Home
                    </b-dropdown-item>
                    <b-dropdown-item value="products">
                        <b-icon icon="cart"></b-icon>
                        Products
                    </b-dropdown-item>
                    <b-dropdown-item value="blog" disabled>
                        <b-icon icon="book-open"></b-icon>
                        Blog
                    </b-dropdown-item>
                    <hr class="dropdown-divider">
                    <b-dropdown-item value="settings">
                        <b-icon icon="settings"></b-icon>
                        Settings
                    </b-dropdown-item>
                    <b-dropdown-item value="logout">
                        <b-icon icon="logout"></b-icon>
                        Logout
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
                navigation: 'home'
            }
        }
    }
</script>
