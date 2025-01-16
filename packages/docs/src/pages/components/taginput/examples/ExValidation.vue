<template>
    <section>
        <b-field label="Tags with 3 characters">
            <b-taginput
                v-model="tags" 
                :before-adding="beforeAdding">
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
                    '123',
                    '456',
                    '789'
                ]
            }
        },
        methods: {
            beforeAdding(tag: string) {
                return tag.length === 3
            }
        },
    })
</script>
