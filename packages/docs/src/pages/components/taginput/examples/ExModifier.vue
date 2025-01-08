<template>
    <section>
        <b-field label="Rounded">
            <b-taginput
                v-model="tags"
                rounded>
            </b-taginput>
        </b-field>

        <b-field label="Attached">
            <b-taginput
                v-model="tags"
                attached>
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
