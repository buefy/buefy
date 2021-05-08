<template>
    <section>
        <b-field grouped group-multiline>
            <div class="control">
                <b-checkbox v-model="showDetailIcon">Detail column</b-checkbox>
            </div>
            <div v-for="(column, index) in columnsVisible"
                 :key="index"
                 class="control">
                <b-checkbox v-model="column.display">
                    {{ column.title }}
                </b-checkbox>
            </div>
        </b-field>

        <b-table
            :data="data"
            ref="table"
            detailed
            hoverable
            custom-detail-row
            :opened-detailed="['Board Games']"
            :default-sort="['name', 'asc']"
            detail-key="name"
            @details-open="(row, index) => $buefy.toast.open(`Expanded ${row.name}`)"
            :show-detail-icon="showDetailIcon">

            <b-table-column
                field="name"
                :visible="columnsVisible['name'].display"
                :label="columnsVisible['name'].title"
                width="300"
                sortable
                v-slot="props"
            >
                <template v-if="showDetailIcon">
                    {{ props.row.name }}
                </template>
                <template v-else>
                    <a @click="toggle(props.row)">
                        {{ props.row.name }}
                    </a>
                </template>
            </b-table-column>

            <b-table-column
                field="sold"
                :visible="columnsVisible['sold'].display"
                :label="columnsVisible['sold'].title"
                sortable
                centered
                v-slot="props"
            >
                {{ props.row.sold }}
            </b-table-column>

            <b-table-column
                field="available"
                :visible="columnsVisible['available'].display"
                :label="columnsVisible['available'].title"
                sortable
                centered
                v-slot="props"
            >
                {{ props.row.available }}
            </b-table-column>

            <b-table-column
                :visible="columnsVisible['cleared'].display"
                :label="columnsVisible['cleared'].title"
                centered
                v-slot="props"
            >
                <span :class="
                        [
                            'tag',
                            {'is-danger': props.row.sold / props.row.available <= 0.45},
                            {'is-success': props.row.sold / props.row.available > 0.45}
                        ]">
                    {{ Math.round((props.row.sold / props.row.available) * 100) }}%
                </span>
            </b-table-column>

            <template v-slot:detail="props">
                <tr v-for="item in props.row.items" :key="item.name">
                    <td v-if="showDetailIcon"></td>
                    <td v-show="columnsVisible['name'].display" >&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</td>
                    <td v-show="columnsVisible['sold'].display" class="has-text-centered">{{ item.sold }}</td>
                    <td v-show="columnsVisible['available'].display" class="has-text-centered">{{ item.available }}</td>
                    <td v-show="columnsVisible['cleared'].display" class="has-text-centered">
                        <span :class="
                            [
                                'tag',
                                {'is-danger': item.sold / item.available <= 0.45},
                                {'is-success': item.sold / item.available > 0.45}
                            ]">
                            {{ Math.round((item.sold / item.available) * 100) }}%
                        </span>
                    </td>
                </tr>
            </template>
        </b-table>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                data: [
                    {
                        name: 'Board Games',
                        sold: 131,
                        available: 301,
                        items: [
                            {
                                name: 'Monopoly',
                                sold: 57,
                                available: 100
                            },
                            {
                                name: 'Scrabble',
                                sold: 23,
                                available: 84
                            },
                            {
                                name: 'Chess',
                                sold: 37,
                                available: 61
                            },
                            {
                                name: 'Battleships',
                                sold: 14,
                                available: 56
                            }
                        ]
                    },
                    {
                        name: 'Jigsaws & Puzzles',
                        sold: 88,
                        available: 167,
                        items: [
                            {
                                name: 'World Map',
                                sold: 31,
                                available: 38
                            },
                            {
                                name: 'London',
                                sold: 23,
                                available: 29
                            },
                            {
                                name: 'Sharks',
                                sold: 20,
                                available: 44
                            },
                            {
                                name: 'Disney',
                                sold: 14,
                                available: 56
                            }
                        ]
                    },
                    {
                        name: 'Books',
                        sold: 434,
                        available: 721,
                        items: [
                            {
                                name: 'Hamlet',
                                sold: 101,
                                available: 187
                            },
                            {
                                name: 'The Lord Of The Rings',
                                sold: 85,
                                available: 156
                            },
                            {
                                name: 'To Kill a Mockingbird',
                                sold: 78,
                                available: 131
                            },
                            {
                                name: 'Catch-22',
                                sold: 73,
                                available: 98
                            },
                            {
                                name: 'Frankenstein',
                                sold: 51,
                                available: 81
                            },
                            {
                                name: 'Alice\'s Adventures In Wonderland',
                                sold: 46,
                                available: 68
                            }
                        ]
                    }
                ],
                columnsVisible: {
                    name: { title: 'Name', display: true },
                    sold: { title: 'Stock Sold', display: true },
                    available: { title: 'Stock Available', display: true },
                    cleared: { title: 'Stock Cleared', display: true },
                },
                showDetailIcon: true
            }
        },
        methods: {
            toggle(row) {
                this.$refs.table.toggleDetails(row)
            }
        }
    }
</script>
