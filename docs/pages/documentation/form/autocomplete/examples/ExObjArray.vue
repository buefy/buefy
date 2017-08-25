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
    import data from '@/assets/data_test.json'
    // Data example
    // [{"id":1,"user":{"first_name":"Jesse","last_name":"Simmons"},"date":"2016-10-15 13:43:27","gender":"Male"},
    // {"id":2,"user":{"first_name":"John","last_name":"Jacobs"},"date":"2016-12-15 06:00:53","gender":"Male"},
    // {"id":3,"user":{"first_name":"Tina","last_name":"Gilbert"},"date":"2016-04-26 06:26:28","gender":"Female"},
    // {"id":4,"user":{"first_name":"Clarence","last_name":"Flores"},"date":"2016-04-10 10:28:46","gender":"Male"},
    // {"id":5,"user":{"first_name":"Anne","last_name":"Lee"},"date":"2016-12-06 14:38:38","gender":"Female"}]

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
