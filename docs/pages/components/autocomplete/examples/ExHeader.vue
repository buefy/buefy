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
                <b-switch v-model="selectable">
                    Selectable
                </b-switch>
            </div>
        </b-field>
        <p class="content"><b>Selected:</b> {{ selected }}</p>
        <b-field label="Find or add a Fruit">
            <b-autocomplete
                v-model="name"
                ref="autocomplete"
                :data="filteredDataArray"
                :keep-first="keepFirst"
                :open-on-focus="openOnFocus"
                placeholder="e.g. Orange"
                @select="option => selected = option"
                @select-header="showAddFruit"
                :selectable-header="selectable">
                <template #header>
                    <a><span> Add new... </span></a>
                </template>
                <template #empty>No results for {{name}}</template>
            </b-autocomplete>
        </b-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                data: [
                    'Orange',
                    'Apple',
                    'Banana',
                    'Pear',
                    'Lemon',
                    'Strawberry',
                    'Kiwi'
                ],
                name: '',
                selected: null,
                keepFirst: false,
                openOnFocus: false,
                selectable: false
            }
        },
        computed: {
            filteredDataArray() {
                return this.data.filter((option) => {
                    return option
                        .toString()
                        .toLowerCase()
                        .indexOf(this.name.toLowerCase()) >= 0
                })
            }
        },
        methods: {
            showAddFruit() {
                this.$buefy.dialog.prompt({
                    message: `Fruit`,
                    inputAttrs: {
                        placeholder: 'e.g. Watermelon',
                        maxlength: 20,
                        value: this.name
                    },
                    confirmText: 'Add',
                    onConfirm: (value) => {
                        this.data.push(value)
                        this.$refs.autocomplete.setSelected(value)
                    }
                })
            }
        }
    }
</script>
