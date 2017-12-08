<template>
    <section>
        <b-field label="Dark">
            <b-taginput
                v-model="tags"
                type="is-dark">
            </b-taginput>
        </b-field>

        <b-field label="Info">
            <b-taginput
                v-model="tags"
                type="is-info">
            </b-taginput>
        </b-field>

        <b-field label="Success">
            <b-taginput
                v-model="tags"
                type="is-success">
            </b-taginput>
        </b-field>

        <b-field label="Warning">
            <b-taginput
                v-model="tags"
                type="is-warning">
            </b-taginput>
        </b-field>

        <b-field label="Danger">
            <b-taginput
                v-model="tags"
                type="is-danger">
            </b-taginput>
        </b-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                tags: [
                    'Auckland',
                    'Wellington',
                    'Napier'
                ]
            }
        }
    }
</script>
