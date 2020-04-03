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
                readonly
                v-model="tags"
                :data="filteredTags"
                autocomplete
                ref="taginput"
                :allow-new="allowNew"
                :open-on-focus="openOnFocus"
                field="user.first_name"
                :icon-right="$refs.taginput && $refs.taginput.$refs.autocomplete.$data.isActive ? 'menu-up' : 'menu-down'"
                placeholder="Add a tag"
                @typing="getFilteredTags">
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
                tags: [],
                allowNew: false,
                openOnFocus: true
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

