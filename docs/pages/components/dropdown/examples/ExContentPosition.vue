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
                <b-dropdown position="is-bottom-left" aria-role="menu">
                    <a  
                        class="navbar-item"
                        slot="trigger"
                        role="button">
                        <span>Login</span>
                        <b-icon icon="menu-down"></b-icon>
                    </a>

                    <b-dropdown-item aria-role="menu-item" custom paddingless>
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
