<template>
    <section>
        <b-field grouped group-multiline>
            <div class="control">
                <b-switch v-model="selectOutside">
                    Select On Clicking Outside
                </b-switch>
            </div>
        </b-field>
        <p class="content"><b>Selected:</b> {{ selected }}</p>
        <b-field label="Find a fruit and press Enter or Tab to select">
            <b-autocomplete
                v-model="name"
                ref="autocomplete"
                :data="filteredDataArray"
                :select-on-click-outside="selectOutside"
                placeholder="e.g. Orange"
                keep-first
                @select="option => selected = option">
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
            selectOutside: false
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
    }
}
</script>
