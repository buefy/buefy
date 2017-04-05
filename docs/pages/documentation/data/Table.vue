<template>
    <div>
        <h1 class="title is-spaced">Table</h1>
        <h2 class="subtitle">Tabulated data are sometimes needed</h2>
        <hr>

        <div class="columns is-marginless">
            <div class="column example is-8">
                <div class="content">
                    <b-switch v-model="isBordered">Bordered</b-switch>
                    <b-switch v-model="isStriped">Striped</b-switch>
                    <b-switch v-model="isNarrowed">Narrowed</b-switch>
                    <b-switch v-model="isSelectable">Selectable</b-switch>
                    <b-switch v-model="isCheckable">Checkable</b-switch>
                    <b-switch v-model="isPaginationSimple">Simple pagination</b-switch>
                </div>
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
                </div>

                <b-table
                    :data="tableData"
                    :bordered="isBordered"
                    :striped="isStriped"
                    :narrowed="isNarrowed"
                    :selectable="isSelectable"
                    :checkable="isCheckable"
                    paginated
                    :per-page="perPage"
                    :pagination-simple="isPaginationSimple"
                    @check="checked"
                    @select="selected">

                    <b-table-column field="id" label="ID" width="40" sortable numeric></b-table-column>
                    <b-table-column field="first_name" label="First Name" sortable></b-table-column>
                    <b-table-column field="last_name" label="Last Name" sortable></b-table-column>
                    <b-table-column field="gender" label="Gender" sortable></b-table-column>

                </b-table>
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

    </div>
</template>

<script>
    import tableData from '../../../assets/data_test.json'

    export default {
        data() {
            return {
                tableData,
                checkItems: [],
                selItem: {},
                isBordered: false,
                isStriped: false,
                isNarrowed: false,
                isSelectable: false,
                isCheckable: false,
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
                        description: 'Table rows will be selectable (single)',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>checkable</code>',
                        description: 'Table rows can be checked (multiple)',
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
                        name: '<code>per-page</code>',
                        description: 'How many items per page (if <code>paginated</code>)',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>20</code>'
                    },
                    {
                        name: '<code>pagination-simple</code>',
                        description: 'Simpler pagination (if <code>paginated</code>)',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>html</code>',
                        description: 'Table cells prints HTML',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    }
                ],
                tableEvents: [
                    {
                        name: '<code>click</code>',
                        description: 'Triggers when a row is clicked',
                        parameters: '<code>row</code>'
                    },
                    {
                        name: '<code>dblclick</code>',
                        description: 'Triggers when a row is double clicked',
                        parameters: '<code>row</code>'
                    },
                    {
                        name: '<code>select</code>',
                        description: 'Triggers when a row is selected',
                        parameters: '<code>row</code>, <code>oldRow</code>'
                    },
                    {
                        name: '<code>check</code>',
                        description: 'Triggers when the checkbox in a row is clicked <strong>OR</strong> when the header checkbox is clicked',
                        parameters: '<code>checkedRows</code>, <code>row</code>'
                    },
                    {
                        name: '<code>check-all</code>',
                        description: 'Triggers when the header checkbox is clicked',
                        parameters: '<code>checkedRows</code>'
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
                        name: '<code>sortable</code>',
                        description: 'Whether column can be sorted',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>numeric</code>',
                        description: `Makes column's cell's text right aligned`,
                        type: 'Boolean',
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
                        paginated
                        :per-page="perPage"
                        :pagination-simple="isPaginationSimple"
                        @check="checked"
                        @select="selected">

                        <b-table-column field="id" label="ID" sortable width="40" numeric></b-table-column>
                        <b-table-column field="first_name" label="First Name" sortable></b-table-column>
                        <b-table-column field="last_name" label="Last Name"></b-table-column>
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
                                ]
                                checkItems: [],
                                selItem: {},
                                isBordered: false,
                                isStriped: false,
                                isNarrowed: false,
                                isSelectable: false,
                                isCheckable: false,
                                isPaginationSimple: false,
                                perPage: 10,
                            }
                        },
                        methods: {
                            checked(items, item) {
                                this.checkItems = items
                            },
                            selected(item) {
                                this.selItem = item
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
            }
        }
    }
</script>
