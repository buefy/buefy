<template>
    <b-table :data="tableDataSimple">
        <template scope="props" slot="header">
            <b-tooltip :active="!!props.column.meta" :label="props.column.meta" dashed>
                {{ props.column.label }}
            </b-tooltip>
        </template>

        <template scope="props">
            <b-table-column field="id" label="ID" meta="Internal ID" width="40" numeric sortable>
                {{ props.row.id }}
            </b-table-column>

            <b-table-column field="first_name" label="FN" meta="First Name" sortable>
                {{ props.row.first_name }}
            </b-table-column>

            <b-table-column field="last_name" label="LN" meta="Last Name" sortable>
                {{ props.row.last_name }}
            </b-table-column>

            <b-table-column field="date" label="Acc. Date" meta="Account created date" centered sortable>
                {{ new Date(props.row.date).toLocaleDateString() }}
            </b-table-column>

            <b-table-column field="gender" label="Gender" sortable>
                {{ props.row.gender }}
            </b-table-column>
        </template>
    </b-table>
</template>

<script>
    export default {
        data() {
            const tableDataSimple = [
                { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
                { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
            ]

            return {
                tableDataSimple
            }
        }
    }
</script>
