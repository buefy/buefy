<template>
    <section>
        <b-field label="Rounded">
            <b-tag-input
                v-model="tags"
                rounded>
            </b-tag-input>
        </b-field>

        <b-field label="Attached">
            <b-tag-input
                v-model="tags"
                attached>
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
