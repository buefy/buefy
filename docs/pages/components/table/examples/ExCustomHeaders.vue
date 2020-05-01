<template>
    <b-table :data="data">
        <template slot-scope="props">
            <b-table-column field="id" label="ID" width="40" numeric>
                <template slot="header" slot-scope="{ column }">
                    <b-tooltip :label="column.label" dashed>
                        {{ column.label }}
                    </b-tooltip>
                </template> 
                {{ props.row.id }}
            </b-table-column>

            <b-table-column field="user.first_name" label="First Name">
                <template slot="header" slot-scope="{ column }">
                    <b-tooltip :label="column.label" dashed>
                        {{ column.label }}
                    </b-tooltip>
                </template>
                {{ props.row.first_name }}
            </b-table-column>

            <b-table-column field="user.last_name" label="Last Name">
                <template slot="header" slot-scope="{ column }">
                    <b-tooltip :label="column.label" dashed>
                        {{ column.label }}
                    </b-tooltip>
                </template>
                {{ props.row.last_name }}
            </b-table-column>

            <b-table-column field="date" label="Date" centered>
                <span class="tag is-success">
                    {{ new Date(props.row.date).toLocaleDateString() }}
                </span>
            </b-table-column>

            <b-table-column label="Gender">
                <span>
                    <b-icon pack="fas"
                        :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                    </b-icon>
                    {{ props.row.gender }}
                </span>
            </b-table-column>
        </template>
    </b-table>
</template>

<script>
    export default {
        data() {
            return {
                data: [
                    { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                    { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                    { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                    { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
                    { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
                ]
            }
        }
    }
</script>
