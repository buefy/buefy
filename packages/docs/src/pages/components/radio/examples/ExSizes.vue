<template>
    <section>
        <b-field>
            <b-radio v-model="radio"
                size="is-small"
                native-value="small">
                Small
            </b-radio>
        </b-field>
        <b-field>
            <b-radio v-model="radio"
                native-value="default">
                Default
            </b-radio>
        </b-field>
        <b-field>
            <b-radio v-model="radio"
                size="is-medium"
                native-value="medium">
                Medium
            </b-radio>
        </b-field>
        <b-field>
            <b-radio v-model="radio"
                size="is-large"
                native-value="large">
                Large
            </b-radio>
        </b-field>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BField, BRadio } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BField,
            BRadio
        },
        data() {
            return {
                radio: 'default'
            }
        }
    })
</script>
