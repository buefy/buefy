<template>
    <section>
        <b-field grouped group-multiline>
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
                placeholder="e.g. Orange"
                @select="option => selected = option"
                @select-footer="showAddFruit"
                :selectable-footer="selectable">
                <template #footer>
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
