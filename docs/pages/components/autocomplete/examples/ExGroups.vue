<template>
    <section>
        <p class="content"><b>Selected:</b> {{ selected }}</p>
        <b-field label="Find a food">
            <b-autocomplete
                v-model="name"
                group-field="type"
                group-options="items"
                open-on-focus
                :data="filteredDataObj"
                @select="option => (selected = option)"
            />
        </b-field>
    </section>
</template>

<script>

export default {
    data() {
        return {
            data: [
                {
                    type: 'Fruit',
                    items: ['Apple', 'Banana', 'Watermelon']
                },
                {
                    type: 'Vegetables',
                    items: ['Carrot', 'Broccoli', 'Cucumber', 'Onion']
                }
            ],
            name: '',
            selected: null
        }
    },
    computed: {
        filteredDataObj() {
            const newData = []
            this.data.forEach((element) => {
                const items = element.items.filter((item) =>
                    item.toLowerCase().indexOf(this.name.toLowerCase()) >= 0)
                if (items.length) {
                    newData.push({ type: element.type, items })
                }
            })
            return newData
        }
    }
}
</script>
