<template>
    <section>
        <b-field grouped group-multiline>
            <div class="control">
                <b-switch v-model="openOnFocus">
                    Open dropdown on focus
                </b-switch>
            </div>
            <div class="control">
                <b-switch v-model="keepFirst">
                    Keep-first
                    <small>(will always have first option pre-selected)</small>
                </b-switch>
            </div>
            <div class="control">
                <b-switch v-model="clearable">
                    Clearable
                </b-switch>
            </div>
        </b-field>
        <p class="content"><b>Selected:</b> {{ selected }}</p>
        <b-field label="Find a name">
            <b-autocomplete
                v-model="name"
                placeholder="e.g. Anne"
                :keep-first="keepFirst"
                :open-on-focus="openOnFocus"
                :data="filteredDataObj"
                field="user.first_name"
                @select="option => (selected = option)"
                :clearable="clearable"
            >
            </b-autocomplete>
        </b-field>
    </section>
</template>

<script>
import data from '@/data/sample.json'

export default {
    data() {
        return {
            data,
            keepFirst: false,
            openOnFocus: false,
            name: '',
            selected: null,
            clearable: false
        }
    },
    computed: {
        filteredDataObj() {
            return this.data.filter(option => {
                return (
                    option.user.first_name
                        .toString()
                        .toLowerCase()
                        .indexOf(this.name.toLowerCase()) >= 0
                )
            })
        }
    }
}
</script>
