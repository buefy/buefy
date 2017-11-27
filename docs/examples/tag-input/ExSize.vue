<template>
    <section>
        <b-field label="Small">
            <b-tag-input
                v-model="tags"
                size="is-small">
            </b-tag-input>
        </b-field>

        <b-field label="Medium (default)">
            <b-tag-input
                v-model="tags"
                size="is-medium">
            </b-tag-input>
        </b-field>

        <b-field label="Large">
            <b-tag-input
                v-model="tags"
                size="is-large">
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
