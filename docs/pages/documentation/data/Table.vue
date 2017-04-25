<template>
    <div>
        <h1 class="title is-spaced">Table</h1>
        <h2 class="subtitle">Tabulated data are sometimes needed, it's even better when it's <strong>responsive</strong></h2>
        <hr>

        <div class="columns is-marginless">
            <div class="column is-8">

                <div class="block">
                    <b-switch v-model="isBordered">Bordered</b-switch>
                    <b-switch v-model="isStriped">Striped</b-switch>
                    <b-switch v-model="isNarrowed">Narrowed</b-switch>
                    <b-switch v-model="isSelectable">Selectable</b-switch>
                    <b-switch v-model="isCheckable">Checkable</b-switch>
                    <b-switch v-model="isPaginated">Paginated</b-switch>
                    <b-switch v-model="isPaginationSimple">Simple pagination</b-switch>
                    <b-switch v-model="hasMobileCards">Rows as cards on mobile</b-switch>
                </div>
                <div class="block">
                    <b-field label="Items per page">
                        <b-select v-model="perPage">
                            <b-option value="5">5</b-option>
                            <b-option value="10">10</b-option>
                            <b-option value="15">15</b-option>
                            <b-option value="20">20</b-option>
                        </b-select>
                    </b-field>
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
                        :default-sort="['first_name', 'desc']"
                        render-html
                        @check="checked"
                        @select="selected">

                        <b-table-column field="id" label="ID" width="40" sortable numeric></b-table-column>
                        <b-table-column field="first_name" label="First Name" sortable></b-table-column>
                        <b-table-column field="last_name" label="Last Name" sortable></b-table-column>
                        <b-table-column field="date" label="Date" sortable :format="formatDate"></b-table-column>
                        <b-table-column field="gender" label="Gender" component="gender-icon"></b-table-column>
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
        <pre class="content" v-highlight><code class="javascript">{{ code | pre }}</code></pre>
        <h2 class="subtitle">GenderIcon.vue</h2>
        <pre v-highlight><code class="vue">{{ componentCode | pre }}</code></pre>

        <hr>

        <h2 class="subtitle">Table properties</h2>
        <b-table
            :data="tableProps"
            default-sort="name"
            render-html>
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
            render-html>
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
            render-html>
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

    import Vue from 'vue'
    import GenderIcon from '../../../components/GenderIcon.vue'
    Vue.component('GenderIcon', GenderIcon)

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
                        name: '<code>render-html</code>',
                        description: 'Cells now renders HTML, <b>do not use it with user-generated content</b>, read more about <a href="https://vuejs.org/v2/guide/syntax.html#Raw-HTML" target="_blank">here</a>',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
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
                    },
                    {
                        name: '<code>component</code>',
                        description: `Injects a Vue component in the cell, useful to format cells with <b>user-generated content</b>.
                            The component will receive a <code>data</code> prop with the cell value and a <code>row</code> prop with the row object`,
                        type: 'String',
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
                        render-html
                        @check="checked"
                        @select="selected">

                        <b-table-column field="id" label="ID" width="40" sortable numeric></b-table-column>
                        <b-table-column field="first_name" label="First Name" sortable></b-table-column>
                        <b-table-column field="last_name" label="Last Name" sortable></b-table-column>
                        <b-table-column field="date" label="Date" sortable :format="formatDate"></b-table-column>
                        <b-table-column field="gender" label="Gender" component="gender-icon"></b-table-column>

                    </b-table>`,
                code: `
                    import Vue from 'vue'
                    import GenderIcon from 'components/GenderIcon.vue' // This is a custom component
                    Vue.component('GenderIcon', GenderIcon)

                    export default {
                        data() {
                            return {
                                tableData: [
                                    {"id":1,"first_name":"Jesse","last_name":"Simmons","date":"2016-10-15 13:43:27","gender":"Male"},
                                    {"id":2,"first_name":"John","last_name":"Jacobs","date":"2016-12-15 06:00:53","gender":"Male"},
                                    {"id":3,"first_name":"Tina","last_name":"Gilbert","date":"2016-04-26 06:26:28","gender":"Female"},
                                    {"id":4,"first_name":"Clarence","last_name":"Flores","date":"2016-04-10 10:28:46","gender":"Male"},
                                    {"id":5,"first_name":"Anne","last_name":"Lee","date":"2016-12-06 14:38:38","gender":"Female"},
                                    ...
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
                                return \`<span class="tag is-primary">
                                    \${new Date(value).toLocaleDateString()}
                                </span>\`
                            }
                        }
                    }`,
                componentCode: `
                    <template>
                        <span>
                            <b-icon :icon="icon" pack="fa"></b-icon>
                            {{ data }}
                        </span>
                    </template>

                    <script>
                        export default {
                            props: {
                                data: String
                            },
                            computed: {
                                icon() {
                                    switch (this.data) {
                                        case 'Male': return 'mars'
                                        case 'female': return 'venus'
                                        default: return 'question'
                                    }
                                }
                            }
                        }
                    <\/script>
                `
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
                return `<span class="tag is-primary">
                    ${new Date(value).toLocaleDateString()}
                </span>`
            }
        }
    }
</script>
