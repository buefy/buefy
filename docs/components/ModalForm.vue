<template>
    <div class="modal-card">
        <form action="">
            <header class="modal-card-head">
                <p class="modal-card-title">Login</p>
            </header>
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
                <button class="button" type="button" @click="$emit('close')">Close</button>
                <button class="button is-primary">Login</button>
            </footer>
        </form>
    </div>
</template>

<style scoped>
    .modal-card {
        margin: 0 auto;
        width: auto;
    }
</style>

