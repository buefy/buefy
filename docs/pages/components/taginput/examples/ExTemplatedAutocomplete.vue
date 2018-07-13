<template>
    <section>
        <b-field label="Enter some tags">
            <b-taginput
                v-model="tags"
                :data="filteredTags"
                autocomplete
                field="user.first_name"
                icon="label"
                placeholder="Add a tag"
                @typing="getFilteredTags">
                <template slot-scope="props">
                    <strong>{{props.option.id}}</strong>: {{props.option.user.first_name}}
                </template>
                <template slot="empty">
                    There are no items
                </template>
            </b-taginput>
        </b-field>
        <pre style="max-height: 400px"><b>Tags:</b>{{ tags }}</pre>
    </section>
</template>

<script>
    const data = require('@/data/sample.json')

    export default {
        data() {
            return {
                filteredTags: data,
                isSelectOnly: false,
                tags: []
            }
        },
        methods: {
            getFilteredTags(text) {
                this.filteredTags = data.filter((option) => {
                    return option.user.first_name
                        .toString()
                        .toLowerCase()
                        .indexOf(text.toLowerCase()) >= 0
                })
            }
        }
    }
</script>

