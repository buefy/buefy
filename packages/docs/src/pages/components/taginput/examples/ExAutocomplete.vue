<template>
    <section>
        <div class="block">
            <b-switch v-model="allowNew">
                Allow new tags
            </b-switch>
            <b-switch v-model="openOnFocus">
                Open on focus
            </b-switch>
        </div>
        <b-field label="Enter some tags">
            <b-taginput
                v-model="tags"
                :data="filteredTags"
                autocomplete
                :allow-new="allowNew"
                :open-on-focus="openOnFocus"
                field="user.first_name"
                icon="label"
                placeholder="Add a tag"
                @typing="getFilteredTags">
            </b-taginput>
        </b-field>
        <pre style="max-height: 400px"><b>Tags:</b>{{ tags }}</pre>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import data from '@/data/sample.json'
    import { BField, BSwitch, BTaginput } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BField,
            BSwitch,
            BTaginput
        },
        data() {
            return {
                filteredTags: data,
                isSelectOnly: false,
                tags: [],
                allowNew: false,
                openOnFocus: false
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

