<template>
    <div class="container">
        <h1 class="title is-spaced">Table</h1>
        <h2 class="subtitle">Tabulated data are sometimes needed, it's even better when it's <strong>responsive</strong></h2>
        <hr>

        <div class="block">
            <b-switch v-model="isBordered">Bordered</b-switch>
            <b-switch v-model="isStriped">Striped</b-switch>
            <b-switch v-model="isNarrowed">Narrowed</b-switch>
            <b-switch v-model="isCheckable">Checkable</b-switch>
            <b-switch v-model="isLoading">Loading state</b-switch>
            <b-switch v-model="isPaginated">Paginated</b-switch>
            <b-switch v-model="isPaginationSimple">Simple pagination</b-switch>
            <b-switch v-model="hasMobileCards">Rows as cards on mobile</b-switch>
        </div>
        <div class="block">
            <b-select v-model="perPage" style="display: inline-block">
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="15">15 per page</option>
                <option value="20">20 per page</option>
            </b-select>
            <button class="button" @click="selected = {}"
                :disabled="Object.keys(selected).length === 0">
                <b-icon icon="clear"></b-icon>
                <span>Clear Selected</span>
            </button>
            <button class="button" @click="checkedRows = []"
                :disabled="checkedRows.length === 0">
                <b-icon icon="clear"></b-icon>
                <span>Clear Checked</span>
            </button>
        </div>

        <div class="example">
            <b-tabs>
                <b-tab-item label="Table">
                    <b-table
                        :data="tableData"
                        :bordered="isBordered"
                        :striped="isStriped"
                        :narrowed="isNarrowed"
                        :checkable="isCheckable"
                        :loading="isLoading"
                        :mobile-cards="hasMobileCards"
                        :paginated="isPaginated"
                        :per-page="perPage"
                        :pagination-simple="isPaginationSimple"
                        default-sort="user.first_name"
                        :selected.sync="selected"
                        :checked-rows.sync="checkedRows">

                        <template scope="props">
                            <b-table-column field="id" label="ID" width="40" sortable numeric>
                                {{ props.row.id }}
                            </b-table-column>

                            <b-table-column field="user.first_name" label="First Name" sortable>
                                {{ props.row.user.first_name }}
                            </b-table-column>

                            <b-table-column field="user.last_name" label="Last Name" sortable>
                                {{ props.row.user.last_name }}
                            </b-table-column>

                            <b-table-column field="date" label="Date" sortable>
                                <span v-html="formatDate(props.row.date)"></span>
                            </b-table-column>

                            <b-table-column field="gender" label="Gender">
                                <b-icon
                                    pack="fa"
                                    :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                                </b-icon>
                                {{ props.row.gender }}
                            </b-table-column>
                        </template>
                    </b-table>
                </b-tab-item>

                <b-tab-item label="Selected">
                    <pre class="content">{{ selected }}</pre>
                </b-tab-item>

                <b-tab-item label="Checked rows">
                    <pre>{{ checkedRows }}</pre>
                </b-tab-item>
            </b-tabs>
        </div>

        <pre class="content" v-highlight><code class="html">{{ template | pre }}</code></pre>
        <pre class="content" v-highlight><code class="javascript">{{ code | pre }}</code></pre>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <h3 class="subtitle">Table</h3>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="tableProps" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
                        </b-table-column>
                        <b-table-column field="type" label="Type">
                            <span>{{ props.row.type }}</span>
                        </b-table-column>
                        <b-table-column field="values" label="Values">
                            <span v-html="props.row.values"></span>
                        </b-table-column>
                        <b-table-column field="default" label="Default">
                            <span v-html="props.row.default"></span>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>

            <b-tab-item label="Scoped slots">
                <b-table :data="tableScopedSlots" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Slot name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="props" label="Props">
                            <span v-html="props.row.props"></span>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>

            <b-tab-item label="Events">
                <b-table :data="tableEvents" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
                        </b-table-column>
                        <b-table-column field="parameters" label="Parameters">
                            <span v-html="props.row.parameters"></span>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>
        </b-tabs>

        <h3 class="subtitle">Table Column</h3>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="columnProps" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
                        </b-table-column>
                        <b-table-column field="type" label="Type">
                            <span>{{ props.row.type }}</span>
                        </b-table-column>
                        <b-table-column field="values" label="Values">
                            <span v-html="props.row.values"></span>
                        </b-table-column>
                        <b-table-column field="default" label="Default">
                            <span v-html="props.row.default"></span>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>
        </b-tabs>
    </div>
</template>

<script>
    import tableData from '../../../assets/data_test.json'

    export default {
        data() {
            return {
                tableData,
                checkedRows: [],
                selected: {},
                isBordered: false,
                isStriped: false,
                isNarrowed: false,
                isLoading: false,
                isCheckable: false,
                hasMobileCards: true,
                isPaginated: true,
                isPaginationSimple: false,
                perPage: 10,
                tableProps: [
                    {
                        name: '<code>data</code>',
                        description: 'Table data',
                        type: 'Array<Object>',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>default-sort</code>',
                        description: `Sets the default sort column and order — e.g. <code>['first_name', 'desc']</code>`,
                        type: 'String, Array',
                        values: '—',
                        default: 'order: <code>asc</code>'
                    },
                    {
                        name: '<code>bordered</code>',
                        description: 'Border to all cells',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>narrowed</code>',
                        description: 'Makes the cells narrower',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>selected</code>',
                        description: 'Set which row is selected, use the <code>.sync</code> modifier to make it two-way binding',
                        type: 'Object',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>checkable</code>',
                        description: 'Rows can be checked (multiple)',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>checked-rows</code>',
                        description: 'Set which rows are checked, use the <code>.sync</code> modifier to make it two-way binding',
                        type: 'Array<Object>',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>mobile-cards</code>',
                        description: 'Rows appears as cards on mobile (collapse rows)',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>true</code>'
                    },
                    {
                        name: '<code>backend-sorting</code>',
                        description: `Columns won't be sorted with Javascript, use with <code>sort</code> event to sort in your backend`,
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>paginated</code>',
                        description: 'Adds pagination to the table',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>pagination-simple</code>',
                        description: 'Simple pagination (if <code>paginated</code>)',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>per-page</code>',
                        description: 'How many rows per page (if <code>paginated</code>)',
                        type: 'Number',
                        values: '—',
                        default: '<code>20</code>'
                    }
                ],
                tableScopedSlots: [
                    {
                        name: 'default',
                        props: '<code>row: Object</code>, <code>index: Number</code>'
                    }
                ],
                tableEvents: [
                    {
                        name: '<code>click</code>',
                        description: 'Triggers when a row is clicked',
                        parameters: '<code>row: Object</code>'
                    },
                    {
                        name: '<code>dblclick</code>',
                        description: 'Triggers when a row is double clicked',
                        parameters: '<code>row: Object</code>'
                    },
                    {
                        name: '<code>sort</code>',
                        description: 'Triggers when a sortable column is clicked',
                        parameters: '<code>field: String</code>, <code>order: String</code>'
                    },
                    {
                        name: '<code>select</code>',
                        description: 'Triggers when a row is selected',
                        parameters: '<code>row: Object</code>, <code>oldRow: Object</code>'
                    },
                    {
                        name: '<code>check</code>',
                        description: 'Triggers when the checkbox in a row is clicked and/or when the header checkbox is clicked',
                        parameters: '<code>checkedList: Array</code>, <code>row: Object</code>'
                    },
                    {
                        name: '<code>check-all</code>',
                        description: 'Triggers when the header checkbox is clicked',
                        parameters: '<code>checkedList: Array</code>'
                    },
                    {
                        name: '<code>page-change</code>',
                        description: 'Triggers when pagination page is changed',
                        parameters: '<code>page: Number</code>'
                    }
                ],
                columnProps: [
                    {
                        name: '<code>label</code>',
                        description: '<b>Required</b>, column header text',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>field</code>',
                        description: 'Property of the object the column is attributed, used for sorting',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>width</code>',
                        description: 'Column fixed width in pixels',
                        type: 'Number',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>numeric</code>',
                        description: 'Align the cell content to the right',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>sortable</code>',
                        description: 'Whether the column can be sorted',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>custom-sort</code>',
                        description: 'Custom sort method, works when is <code>sortable</code>',
                        type: 'Function (a: Object, b: Object)',
                        values: '—',
                        default: '—'
                    }
                ],
                template: `
                <b-table
                    :data="tableData"
                    :bordered="isBordered"
                    :striped="isStriped"
                    :narrowed="isNarrowed"
                    :checkable="isCheckable"
                    :mobile-cards="hasMobileCards"
                    :paginated="isPaginated"
                    :per-page="perPage"
                    :pagination-simple="isPaginationSimple"
                    default-sort="user.first_name"
                    :selected.sync="selected"
                    :checked-rows.sync="checkedRows">

                    <template scope="props">
                        <b-table-column field="id" label="ID" width="40" sortable numeric>
                            {{ props.row.id }}
                        </b-table-column>

                        <b-table-column field="user.first_name" label="First Name" sortable>
                            {{ props.row.user.first_name }}
                        </b-table-column>

                        <b-table-column field="user.last_name" label="Last Name" sortable>
                            {{ props.row.user.last_name }}
                        </b-table-column>

                        <b-table-column field="date" label="Date" sortable
                            <span v-html="formatDate(props.row.date)"></span>
                        </b-table-column>

                        <b-table-column field="gender" label="Gender">
                            <b-icon
                                pack="fa"
                                :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                            </b-icon>
                            {{ props.row.gender }}
                        </b-table-column>
                    </template>
                </b-table>`,
                code: `
                export default {
                    data() {
                        return {
                            tableData: [
                                {"id":1,"user":{"first_name":"Jesse","last_name":"Simmons"},"date":"2016-10-15 13:43:27","gender":"Male"},
                                {"id":2,"user":{"first_name":"John","last_name":"Jacobs"},"date":"2016-12-15 06:00:53","gender":"Male"},
                                {"id":3,"user":{"first_name":"Tina","last_name":"Gilbert"},"date":"2016-04-26 06:26:28","gender":"Female"},
                                {"id":4,"user":{"first_name":"Clarence","last_name":"Flores"},"date":"2016-04-10 10:28:46","gender":"Male"},
                                {"id":5,"user":{"first_name":"Anne","last_name":"Lee"},"date":"2016-12-06 14:38:38","gender":"Female"},
                                ...
                            ],
                            checkedRows: [],
                            selected: {},
                            isBordered: false,
                            isStriped: false,
                            isNarrowed: false,
                            isCheckable: false,
                            hasMobileCards: true,
                            isPaginated: true,
                            isPaginationSimple: false,
                            perPage: 10
                        }
                    },
                    methods: {
                        formatDate(value, row) {
                            return \`<span class="tag is-success">
                                \${new Date(value).toLocaleDateString()}
                            </span>\`
                        },
                        clearSelected() {
                            this.selected = {}
                        },
                        clearCheckedRows() {
                            this.checkedRows = []
                        }
                    },
                }`
            }
        },
        methods: {
            formatDate(value, row) {
                return `<span class="tag is-success">
                    ${new Date(value).toLocaleDateString()}
                </span>`
            }
        }
    }
</script>
