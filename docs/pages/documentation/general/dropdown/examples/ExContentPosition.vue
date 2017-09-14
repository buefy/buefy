<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <a class="navbar-item">
                <img :src="logo" alt="Buefy">
            </a>
            <a class="navbar-item"><b-icon pack="fa" icon="github"></b-icon></a>
            <a class="navbar-item"><b-icon pack="fa" icon="twitter"></b-icon></a>
        </div>

        <div class="navbar-menu">
            <div class="navbar-end">
                <b-dropdown position="is-bottom-left">
                    <a class="navbar-item" slot="trigger">
                        <span>Login</span>
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </a>

                    <b-dropdown-item custom paddingless>
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
                                    <button class="button is-primary">Login</button>
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
    import logo from '@/assets/buefy.png'

    export default {
        data() {
            return { logo }
        }
    }
</script>
