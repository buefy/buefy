<template>
    <section>
        <button class="button field is-danger" @click="checkedRows = []"
            :disabled="!checkedRows.length">
            <b-icon icon="close"></b-icon>
            <span>Clear checked</span>
        </button>

        <b-tabs>
            <b-tab-item label="Table">
                <b-table
                    :data="data"
                    :columns="columns"
                    :checked-rows.sync="checkedRows"
                    :is-row-checkable="(row) => row.id !== 3"
                    checkable>

                    <template slot="bottom-left">
                        <b>Total checked</b>: {{ checkedRows.length }}
                    </template>
                </b-table>
            </b-tab-item>

            <b-tab-item label="Checked rows">
                <pre>{{ checkedRows }}</pre>
            </b-tab-item>
        </b-tabs>
    </section>
</template>

<script>
    export default {
        data() {
            const data = [
                { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
                { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
            ]

            return {
                data,
                checkedRows: [data[1], data[3]],
                columns: [
                    {
                        field: 'id',
                        label: 'ID',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'first_name',
                        label: 'First Name',
                    },
                    {
                        field: 'last_name',
                        label: 'Last Name',
                    },
                    {
                        field: 'date',
                        label: 'Date',
                        centered: true
                    },
                    {
                        field: 'gender',
                        label: 'Gender',
                    }
                ]
            }
        }
    }
</script>
