<template>
    <section>
        <b-field label="Name" horizontal>
            <b-input v-model="name"></b-input>
        </b-field>

        <b-field label="Email"
            type="is-danger"
            message="This email is invalid"
            horizontal>
            <b-input type="email"
                model-value="john@"
                maxlength="30">
            </b-input>
        </b-field>

        <b-field label="Username"
            type="is-success"
            message="This username is available"
            horizontal>
            <b-input model-value="johnsilver" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password" horizontal>
            <b-input type="password"
                model-value="iwantmytreasure"
                password-reveal>
            </b-input>
        </b-field>

        <b-field label="Message" horizontal>
            <b-input maxlength="200" type="textarea"></b-input>
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
