<template>
    <section>
        <b-field label="Tags with 3 characters">
            <b-taginput
                v-model="tags" 
                :validation="validation">
            </b-taginput>
        </b-field>
    </section>
</template>

<script>
    export default {
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
        	validation(tag) {
        		return tag.length === 3;
        	},
        },
    }
</script>
