<template>
    <section>
        <b-field label="Enter some tags">
            <b-taginput
                v-model="tags"
                :data="filteredTags"
                autocomplete="on"
                field="user.first_name"
                icon="label"
                placeholder="Add a tag"
                @typing="getFilteredTags">
                <template v-slot="props">
                    <strong>{{props.option.id}}</strong>: {{props.option.user.first_name}}
                </template>
                <template #empty>
                    There are no items
                </template>
            </b-taginput>
        </b-field>
        <pre style="max-height: 400px"><b>Tags:</b>{{ tags }}</pre>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import data from '@/data/sample.json'
    import { BField, BTaginput } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BField,
            BTaginput
        },
        data() {
            return {
                filteredTags: data,
                isSelectOnly: false,
                tags: []
            }
        },
        methods: {
            getFilteredTags(text: number | string | undefined) {
                if (text == null) {
                    return
                }
                this.filteredTags = data.filter((option) => {
                    return option.user.first_name
                        .toString()
                        .toLowerCase()
                        .indexOf(text.toString().toLowerCase()) >= 0
                })
            }
        }
    })
</script>

