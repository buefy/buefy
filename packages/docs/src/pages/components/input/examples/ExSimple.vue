<template>
    <section>
        <b-field label="Name">
            <b-input v-model="name"></b-input>
        </b-field>

        <b-field label="Email"
            type="is-danger"
            message="This email is invalid">
            <b-input type="email"
                model-value="john@"
                maxlength="30">
            </b-input>
        </b-field>

        <b-field label="Username"
            type="is-success"
            message="This username is available">
            <b-input model-value="johnsilver" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password">
            <b-input type="password"
                model-value="iwantmytreasure"
                password-reveal>
            </b-input>
        </b-field>

        <b-field label="Message">
            <b-input maxlength="200" type="textarea"></b-input>
        </b-field>

        <b-field label="Placeholder and Readonly">
            <b-input placeholder="Awesome!" :readonly="true"></b-input>
        </b-field>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BField, BInput } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BField,
            BInput
        },
        data() {
            return {
                name: 'John Silver'
            }
        }
    })
</script>
