<template>
    <section>
        <p class="content"><b>Selected:</b> {{ selected }}</p>
        <b-field label="Find a documentation">
            <b-autocomplete
                v-model="name"
                placeholder="e.g. customization"
                :keep-first="keepFirst"
                :open-on-focus="openOnFocus"
                :category="category"
                :data="filteredDataObj"
                field="article_title"
                @select="option => selected = option">
            </b-autocomplete>
        </b-field>
    </section>
</template>

<script>
    const data = require('@/data/category.json')

    export default {
        data() {
            return {
                data,
                keepFirst: false,
                openOnFocus: false,
                name: '',
                selected: null,
                category: true
            }
        },
        computed: {
            filteredDataObj() {
                return this.data.filter((option) => {
                    return option.article_title
                        .toString()
                        .toLowerCase()
                        .indexOf(this.name.toLowerCase()) >= 0
                })
            }
        }
    }
</script>
