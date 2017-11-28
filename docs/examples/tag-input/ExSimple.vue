<template>
    <section>
        <b-field label="Add some tags">
            <b-tag-input
                v-model="tags"
                icon="label"
                placeholder="Add a tag">
            </b-tag-input>
        </b-field>
        <p class="content"><b>Tags:</b> {{ tags }}</p>
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

