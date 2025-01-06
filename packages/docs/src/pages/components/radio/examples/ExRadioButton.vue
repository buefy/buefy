<template>
    <section>
        <b-field>
            <b-radio-button v-model="radioButton"
                native-value="Nope"
                type="is-danger is-light is-outlined">
                <b-icon icon="close"></b-icon>
                <span>Nope</span>
            </b-radio-button>

            <b-radio-button v-model="radioButton"
                native-value="Yep"
                type="is-success is-light is-outlined">
                <b-icon icon="check"></b-icon>
                <span>Yep</span>
            </b-radio-button>

            <b-radio-button v-model="radioButton"
                native-value="Default"
                type="is-primary is-light is-outlined">
                Default
            </b-radio-button>

            <b-radio-button v-model="radioButton"
                native-value="Disabled"
                disabled>
                Disabled
            </b-radio-button>
        </b-field>
        <p class="content">
            <b>Selection:</b>
            {{ radioButton }}
        </p>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BField, BIcon, BRadioButton } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BField,
            BIcon,
            BRadioButton
        },
        data() {
            return {
                radioButton: ''
            }
        }
    })
</script>
