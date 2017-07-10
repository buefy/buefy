<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Login</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Email">
                    <b-input
                        type="email"
                        v-model="email"
                        placeholder="Your email"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Password">
                    <b-input
                        type="password"
                        v-model="password"
                        password-reveal
                        placeholder="Your password"
                        required>
                    </b-input>
                </b-field>

                <b-checkbox>Remember me</b-checkbox>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button class="button is-primary">Login</button>
            </footer>
        </div>
    </form>
</template>

<script>
    export default {
        props: ['email', 'password']
    }
</script>

<style scoped>
    .modal-card {
        width: auto;
    }
</style>

