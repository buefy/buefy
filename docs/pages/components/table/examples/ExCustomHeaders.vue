<template>
    <b-table :data="data" :columns="columns">
        <template slot-scope="props" slot="header">
            <b-tooltip :active="!!props.column.meta" :label="props.column.meta" dashed>
                {{ props.column.label }}
            </b-tooltip>
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
                ],
                columns: [
                    {
                        field: 'id',
                        label: 'ID',
                        width: '40',
                        numeric: true,
                        meta: 'Internal ID'
                    },
                    {
                        field: 'first_name',
                        label: 'FN',
                        meta: 'First Name'
                    },
                    {
                        field: 'last_name',
                        label: 'LN',
                        meta: 'Last Name'
                    },
                    {
                        field: 'date',
                        label: 'Acc. Date',
                        centered: true,
                        meta: 'Account created date'
                    },
                    {
                        field: 'gender',
                        label: 'Gender',
                        meta: ''
                    }
                ]
            }
        }
    }
</script>
