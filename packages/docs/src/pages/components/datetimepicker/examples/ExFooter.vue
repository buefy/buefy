<template>
    <b-field label="Select datetime">
        <b-datetimepicker v-model="datetime"
            placeholder="Click to select...">

            <template #left>
                <b-button
                    label="Now"
                    type="is-primary"
                    icon-left="clock"
                    @click="datetime = new Date()" />
            </template>

            <template #right>
                <b-button
                    label="Clear"
                    type="is-danger"
                    icon-left="close"
                    outlined
                    @click="datetime = null" />
            </template>
        </b-datetimepicker>
    </b-field>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BButton, BDatetimepicker, BField } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BButton,
            BDatetimepicker,
            BField
        },
        data() {
            return {
                datetime: new Date() as Date | null
            }
        }
    })
</script>
