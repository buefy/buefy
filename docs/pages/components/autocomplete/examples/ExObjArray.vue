<template>
    <section>
        <div class="field">
            <b-switch v-model="keepFirst">
                Keep-first <small>(will always have first option pre-selected)</small>
            </b-switch>
        </div>
        <p class="content"><b>Selected:</b> {{ selected }}</p>
        <b-field label="Find a name">
            <b-autocomplete
                v-model="name"
                placeholder="e.g. Anne"
                :keep-first="keepFirst"
                :data="filteredDataObj"
                field="user.first_name"
                @select="option => selected = option">
            </b-autocomplete>
        </b-field>
    </section>
</template>

<script>
    const data = require('@/assets/data_test.json')

    export default {
        data() {
            return {
                data,
                keepFirst: false,
                name: '',
                selected: null
            }
        },
        computed: {
            filteredDataObj() {
                return this.data.filter((option) => {
                    return option.user.first_name
                        .toString()
                        .toLowerCase()
                        .indexOf(this.name.toLowerCase()) >= 0
                })
            }
        }
    }
</script>
