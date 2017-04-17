<template>
    <div>
        <h1 class="title is-spaced">Table</h1>
        <h2 class="subtitle">Tabulated data are sometimes needed, it's even better when it's <strong>responsive</strong></h2>
        <hr>

        <div class="columns is-marginless">
            <div class="column is-8">

                <div class="content">
                    <b-switch v-model="isBordered">Bordered</b-switch>
                    <b-switch v-model="isStriped">Striped</b-switch>
                    <b-switch v-model="isNarrowed">Narrowed</b-switch>
                    <b-switch v-model="isSelectable">Selectable</b-switch>
                    <b-switch v-model="isCheckable">Checkable</b-switch>
                    <b-switch v-model="isPaginated">Paginated</b-switch>
                    <b-switch v-model="isPaginationSimple">Simpler pagination</b-switch>
                    <b-switch v-model="hasMobileCards">Rows as cards on mobile</b-switch>
                </div>
                <div class="content">
                    <div class="field">
                        <p class="control">
                            <label class="label">Items per page</label>
                            <span class="select">
                                <select v-model="perPage">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                </select>
                            </span>
                        </p>
                        <a class="button" @click="changeData">Change data</a>
                        <a class="button" @click="uncheckAll">Uncheck all</a>
                    </div>
                </div>

                <div class="example">
                    <b-table
                        :data="tableData"
                        :bordered="isBordered"
                        :striped="isStriped"
                        :narrowed="isNarrowed"
                        :selectable="isSelectable"
                        :checkable="isCheckable"
                        :mobile-cards="hasMobileCards"
                        :paginated="isPaginated"
                        :per-page="perPage"
                        :pagination-simple="isPaginationSimple"
                        :checked-rows="checkedRows"
                        default-sort="first_name"
                        @check="checked"
                        @select="selected">

                        <b-table-column field="id" label="ID" width="40" sortable numeric></b-table-column>
                        <b-table-column field="first_name" label="First Name" sortable></b-table-column>
                        <b-table-column field="last_name" label="Last Name" sortable></b-table-column>
                        <b-table-column field="date" label="Date" sortable :format="formatDate"></b-table-column>
                        <b-table-column field="gender" label="Gender"></b-table-column>

                    </b-table>
                </div>
            </div>
            <div class="column">
                <h3 class="subtitle">Selected item</h3>
                <pre class="content">
{{ selItem }}
                </pre>

                <h3 class="subtitle">Checked items</h3>
                <pre>
{{ checkItems }}
                </pre>
            </div>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template | pre }}</code></pre>
        <pre v-highlight><code class="javascript">{{ code | pre }}</code></pre>


        <hr>

        <h2 class="subtitle">Table properties</h2>
        <b-table
            :data="tableProps"
            default-sort="name"
            html>
            <b-table-column
                field="name"
                label="Name">
            </b-table-column>
            <b-table-column
                field="description"
                label="Description"
                width="620">
            </b-table-column>
            <b-table-column
                field="type"
                label="Type">
            </b-table-column>
            <b-table-column
                field="values"
                label="Values">
            </b-table-column>
            <b-table-column
                field="default"
                label="Default">
            </b-table-column>
        </b-table>

        <h2 class="subtitle">Table events</h2>
        <b-table
            :data="tableEvents"
            default-sort="name"
            html>
            <b-table-column
                field="name"
                label="Name">
            </b-table-column>
            <b-table-column
                field="description"
                label="Description"
                width="620">
            </b-table-column>
            <b-table-column
                field="parameters"
                label="Parameters">
            </b-table-column>
        </b-table>

        <hr>
        <h2 class="subtitle">Table Column properties</h2>
        <b-table
            :data="columnProps"
            default-sort="name"
            html>
            <b-table-column
                field="name"
                label="Name">
            </b-table-column>
            <b-table-column
                field="description"
                label="Description"
                width="620">
            </b-table-column>
            <b-table-column
                field="type"
                label="Type">
            </b-table-column>
            <b-table-column
                field="values"
                label="Values">
            </b-table-column>
            <b-table-column
                field="default"
                label="Default">
            </b-table-column>
        </b-table>

    </div>
</template>

<script>
    import tableData from '../../../assets/data_test.json'
    import tableData2 from '../../../assets/data_test_2.json'

    export default {
        data() {
            return {
                tableData,
                checkItems: [],
                checkedRows: [],
                selItem: {},
                isBordered: false,
                isStriped: false,
                isNarrowed: false,
                isSelectable: false,
                isCheckable: false,
                hasMobileCards: true,
                isPaginated: true,
                isPaginationSimple: false,
                perPage: 10,
                tableProps: [
                    {
                        name: '<code>data</code>',
                        description: 'Table data',
                        type: 'Array',
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
                        name: '<code>selectable</code>',
                        description: 'Clicks on rows will select (single)',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>checkable</code>',
                        description: 'Rows can be checked (multiple)',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>mobile-cards</code>',
                        description: 'Rows now appears as cards on mobile',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>true</code>'
                    },
                    {
                        name: '<code>html</code>',
                        description: 'Cells now renders HTML',
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
                        description: 'Simpler pagination (if <code>paginated</code>)',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>per-page</code>',
                        description: 'How many items per page (if <code>paginated</code>)',
                        type: 'Number',
                        values: '—',
                        default: '<code>20</code>'
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
                    }
                ],
                columnProps: [
                    {
                        name: '<code>label</code>',
                        description: 'Column header text',
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
                        name: '<code>field</code>',
                        description: 'Key of the object the column is attributed',
                        type: 'String',
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
                    },
                    {
                        name: '<code>format</code>',
                        description: 'Format cell content',
                        type: 'Function (value: Any, row: Object)',
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
                        :selectable="isSelectable"
                        :checkable="isCheckable"
                        :mobile-cards="hasMobileCards"
                        :paginated="isPaginated"
                        :per-page="perPage"
                        :pagination-simple="isPaginationSimple"
                        default-sort="first_name"
                        @check="checked"
                        @select="selected">

                        <b-table-column field="id" label="ID" width="40" sortable numeric></b-table-column>
                        <b-table-column field="first_name" label="First Name" sortable></b-table-column>
                        <b-table-column field="last_name" label="Last Name" sortable></b-table-column>
                        <b-table-column field="date" label="Date" sortable :format="formatDate"></b-table-column>
                        <b-table-column field="gender" label="Gender"></b-table-column>

                    </b-table>`,
                code: `
                    export default {
                        data() {
                            return {
                                tableData: [
                                    {"id":1,"first_name":"Ryan","last_name":"Hill","gender":"Male"},
                                    {"id":2,"first_name":"Kathryn","last_name":"Ward","gender":"Female"},
                                    {"id":3,"first_name":"Sharon","last_name":"Welch","gender":"Female"},
                                    {"id":4,"first_name":"Beverly","last_name":"Gutierrez","gender":"Female"},
                                    {"id":5,"first_name":"Gloria","last_name":"Boyd","gender":"Female"},
                                    [...]
                                ],
                                checkItems: [],
                                selItem: {},
                                isBordered: false,
                                isStriped: false,
                                isNarrowed: false,
                                isSelectable: false,
                                isCheckable: false,
                                hasMobileCards: true,
                                isPaginated: true,
                                isPaginationSimple: false,
                                perPage: 10
                            }
                        },
                        methods: {
                            checked(items, item) {
                                this.checkItems = items
                            },
                            selected(item) {
                                this.selItem = item
                            },
                            formatDate(value, row) {
                                return new Date(value).toLocaleDateString()
                            }
                        }
                    }`
            }
        },
        methods: {
            checked(items, item) {
                this.checkItems = items
            },
            selected(item) {
                this.selItem = item
            },
            formatDate(value, row) {
                return new Date(value).toLocaleDateString()
            },
            changeData() {
                this.tableData = tableData2
            },
            uncheckAll() {
                this.checkedRows = []
            }
        }
    }
</script>
