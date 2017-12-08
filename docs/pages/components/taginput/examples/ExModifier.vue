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
