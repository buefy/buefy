<template>
    <section>
        <b-table
            :data="data"
            :columns="columns">
        </b-table>
        <hr />
        <p>You can debounce search filter to avoid multiple filtering when typing.</p>
        <b-table
            :data="data"
            :columns="columns"
            :debounce-search="1000">
        </b-table>
        <p>You can also customize the search input using a scoped slot.</p>
        <b-table
            :data="data">
            <template v-for="column in columns" :key="column.id">
                <b-table-column v-bind="column">
                    <template
                        v-if="column.searchable && !column.numeric"
                        #searchable="props">
                        <b-input
                            v-model="props.filters[props.column.field]"
                            placeholder="Search..."
                            icon="magnify"
                            size="is-small" />
                    </template>
                    <template v-slot="props">
                        {{ props.row[column.field] }}
                    </template>
                </b-table-column>
            </template>
        </b-table>
    </section>
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
                        width: '100',
                        numeric: true,
                        searchable: true,
                    },
                    {
                        field: 'first_name',
                        label: 'First Name',
                        searchable: true,
                    },
                    {
                        field: 'last_name',
                        label: 'Last Name',
                        searchable: true,
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
