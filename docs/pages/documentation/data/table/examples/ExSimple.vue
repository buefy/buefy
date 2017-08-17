<template>
    <section>
        <b-field grouped group-multiline>
            <div class="control">
                <b-switch v-model="isBordered">Bordered</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="isStriped">Striped</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="isNarrowed">Narrowed</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="isLoading">Loading state</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="isEmpty">Empty</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="hasMobileCards">Mobile cards <small>(collapsed rows)</small></b-switch>
            </div>
        </b-field>

        <b-table
            :data="isEmpty ? [] : tableDataSimple"
            :bordered="isBordered"
            :striped="isStriped"
            :narrowed="isNarrowed"
            :loading="isLoading"
            :mobile-cards="hasMobileCards">

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

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="sentiment_very_dissatisfied"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Nothing here.</p>
                    </div>
                </section>
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
                isEmpty: false,
                isBordered: false,
                isStriped: false,
                isNarrowed: false,
                isLoading: false,
                hasMobileCards: true
            }
        }
    }
</script>
