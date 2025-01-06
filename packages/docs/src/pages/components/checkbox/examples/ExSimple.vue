<template>
    <section>
        <b-field>
            <b-checkbox>Basic</b-checkbox>
        </b-field>
        <b-field>
            <b-checkbox v-model="checkbox">
                {{ checkbox }}
            </b-checkbox>
        </b-field>
        <b-field>
            <b-checkbox v-model="checkboxCustom"
                true-value="Yes"
                false-value="No">
                {{ checkboxCustom }}
            </b-checkbox>
        </b-field>
        <b-field>
            <b-checkbox :indeterminate="true">
                Indeterminate
            </b-checkbox>
        </b-field>
        <b-field>
            <b-checkbox disabled>Disabled</b-checkbox>
        </b-field>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BCheckbox, BField } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BCheckbox,
            BField
        },
        data() {
            return {
                checkbox: false,
                checkboxCustom: 'Yes'
            }
        }
    })
</script>
