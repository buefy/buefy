<template>
    <section>
        <b-field label="Small">
            <b-taginput
                v-model="tags"
                size="is-small">
            </b-taginput>
        </b-field>

        <b-field label="Default">
            <b-taginput
                v-model="tags">
            </b-taginput>
        </b-field>

        <b-field label="Medium">
            <b-taginput
                v-model="tags"
                size="is-medium">
            </b-taginput>
        </b-field>

        <b-field label="Large">
            <b-taginput
                v-model="tags"
                size="is-large">
            </b-taginput>
        </b-field>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BField, BTaginput } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BField,
            BTaginput
        },
        data() {
            return {
                tags: [
                    'Auckland',
                    'Wellington',
                    'Napier'
                ]
            }
        }
    })
</script>
