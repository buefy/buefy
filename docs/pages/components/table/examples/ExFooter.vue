<template>
    <section>
        <b-field grouped group-multiline>
            <div class="control">
                <b-switch v-model="isCustom">Custom</b-switch>
            </div>
        </b-field>
        <b-table :data="tableDataSimple">

            <template slot-scope="props">
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

            <template slot="footer" v-if="!isCustom">
                <div class="has-text-right">
                    Footer
                </div>
            </template>
            <template slot="footer" v-else>
                <th class="is-hidden-mobile" style="width:40px">
                    <div class="th-wrap is-numeric"> ID </div>
                </th>
                <th class="is-hidden-mobile">
                    <div class="th-wrap"> First Name </div>
                </th>
                <th class="is-hidden-mobile">
                    <div class="th-wrap"> Last Name </div>
                </th>
                <th class="is-hidden-mobile">
                    <div class="th-wrap is-centered"> Date </div>
                </th>
                <th class="is-hidden-mobile">
                    <div class="th-wrap"> Gender </div>
                </th>
            </template>

        </b-table>
    </section>
</template>

<script>
    export default {
        data() {
            const tableDataSimple = [
                { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016/10/15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016/12/15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016/04/26 06:26:28', 'gender': 'Female' },
                { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016/04/10 10:28:46', 'gender': 'Male' },
                { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016/12/06 14:38:38', 'gender': 'Female' }
            ]

            return {
                tableDataSimple,
                isCustom: false
            }
        }
    }
</script>
