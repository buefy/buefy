<template>
    <section>
        <b-checkbox v-model="hasError">Show errors</b-checkbox>

        <b-field label="Username"
            :type="{ 'is-danger': hasError }"
            :message="{ 'Username is not available': hasError }">
            <b-input model-value="johnsilver" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password"
            :type="{ 'is-danger': hasError }"
            :message="[
                { 'Password is too short': hasError },
                { 'Password must have at least 8 characters': hasError }
            ]">
            <b-input model-value="123" type="password" maxlength="30"></b-input>
        </b-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                hasError: true
            }
        }
    }
</script>
