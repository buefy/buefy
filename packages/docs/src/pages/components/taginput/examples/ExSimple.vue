<template>
    <section>
        <b-field label="Add some tags">
            <b-taginput
                v-model="tags"
                ellipsis
                icon="label"
                placeholder="Add a tag"
                aria-close-label="Delete this tag">
            </b-taginput>
        </b-field>
        <p class="content"><b>Tags:</b> {{ tags }}</p>
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
                    'Very long string that would overflow'
                ]
            }
        }
    })
</script>

