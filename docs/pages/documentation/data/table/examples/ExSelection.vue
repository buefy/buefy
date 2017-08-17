<template>
    <section>
        <button class="button field is-danger" @click="selected = {}"
            :disabled="!Object.keys(selected).length">
            <b-icon icon="clear"></b-icon>
            <span>Clear selected</span>
        </button>

        <b-tabs>
            <b-tab-item label="Table">
                <b-table
                    :data="tableDataSimple"
                    :selected.sync="selected">

                    <template scope="props">
                        <b-table-column label="ID" width="40" numeric>
                            {{ props.row.id }}
                        </b-table-column>

                        <b-table-column label="First Name">
                            {{ props.row.first_name }}
                        </b-table-column>

                        <b-table-column label="Last Name">
                            {{ props.row.last_name }}
                        </b-table-column>

                        <b-table-column label="Date" centered>
                            {{ new Date(props.row.date).toLocaleDateString() }}
                        </b-table-column>

                        <b-table-column label="Gender">
                            {{ props.row.gender }}
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>

            <b-tab-item label="Selected">
                <pre>{{ selected }}</pre>
            </b-tab-item>
        </b-tabs>
    </section>
</template>

<script>
    export default {
        data() {
            const tableDataSimple = [
                { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-1513:43:27', 'gender': 'Male' },
                { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-1506:00:53', 'gender': 'Male' },
                { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-2606:26:28', 'gender': 'Female' },
                { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-1010:28:46', 'gender': 'Male' },
                { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-0614:38:38', 'gender': 'Female' }
            ]

            return {
                tableDataSimple,
                selected: tableDataSimple[1]
            }
        }
    }
</script>
