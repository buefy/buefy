<template>
    <section>
        <b-field label="Dark">
            <b-tag-input
                v-model="tags"
                type="is-dark">
            </b-tag-input>
        </b-field>

        <b-field label="Info">
            <b-tag-input
                v-model="tags"
                type="is-info">
            </b-tag-input>
        </b-field>

        <b-field label="Success">
            <b-tag-input
                v-model="tags"
                type="is-success">
            </b-tag-input>
        </b-field>

        <b-field label="Warning">
            <b-tag-input
                v-model="tags"
                type="is-warning">
            </b-tag-input>
        </b-field>

        <b-field label="Danger">
            <b-tag-input
                v-model="tags"
                type="is-danger">
            </b-tag-input>
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
