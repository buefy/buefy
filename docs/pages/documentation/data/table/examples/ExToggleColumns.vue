<template>
    <section>
        <b-field grouped group-multiline>
            <div v-for="column in columnsTemplate" class="control">
                <b-checkbox v-model="column.visible">
                    {{ column.title }}
                </b-checkbox>
            </div>
        </b-field>

        <b-table :data="tableDataSimple">
            <template scope="props">
                <b-table-column v-for="(column, index) in columnsTemplate"
                    :key="index"
                    :label="column.title"
                    :visible="column.visible">
                    {{ props.row[column.field] }}
                </b-table-column>
            </template>
        </b-table>
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
                columnsTemplate: [
                    { title: 'ID', field: 'id', visible: true },
                    { title: 'First Name', field: 'first_name', visible: true },
                    { title: 'Last Name', field: 'last_name', visible: true },
                    { title: 'Date', field: 'date', visible: true },
                    { title: 'Gender', field: 'gender', visible: true }
                ]
            }
        }
    }
</script>
