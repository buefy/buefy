<template>
    <div class="container">
        <h1 class="title is-spaced">Table</h1>
        <h2 class="subtitle">Tabulated data are sometimes needed, it's even better when it's <strong>responsive</strong></h2>
        <hr>

        <div class="example">
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
        </div>
        <pre class="example-code" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
        <pre class="example-code" v-highlight><code class="javascript">{{ code1 | pre }}</code></pre>

        <hr>
        <h2 class="title is-spaced">Selection</h2>
        <p class="content">
            You can show a <strong>single selected</strong> row by passing the corresponding object to the <code>selected</code> prop.
            Additionally, adding the <code>.sync</code> modifier will make it two-way binding — selected object will mutate if user clicks on row.
        </p>
        <div class="example">
            <button class="button field is-danger" @click="selected = {}"
                :disabled="!Object.keys(selected).length">
                <b-icon icon="clear"></b-icon>
                <span>Clear selected</span>
            </button>

            <b-tabs>
                <b-tab-item label="Table">
                    <b-table
                        :data="tableDataSimple"
                        :selected.sync="selected">

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
                    </b-table>
                </b-tab-item>

                <b-tab-item label="Selected">
                    <pre>{{ selected }}</pre>
                </b-tab-item>
            </b-tabs>
        </div>
        <pre class="example-code" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
        <pre class="example-code" v-highlight><code class="javascript">{{ code2 | pre }}</code></pre>

        <hr>
        <h2 class="title is-spaced">Checkable</h2>
        <div class="content">
            <p>You can add checkboxes to rows by using the <code>checkable</code> prop.</p>
            <p>
                To show which rows are <strong>checked</strong>, you have to pass the corresponding object array to the <code>checked</code> prop.
                Adding the <code>.sync</code> modifier will make it two-way binding — checked object array will mutate if user clicks on checkboxes.
            </p>
        </div>
        <div class="example">
            <button class="button field is-danger" @click="checkedRows = []"
                :disabled="!checkedRows.length">
                <b-icon icon="clear"></b-icon>
                <span>Clear checked</span>
            </button>

            <b-tabs>
                <b-tab-item label="Table">
                    <b-table
                        :data="tableDataSimple"
                        :checked-rows.sync="checkedRows"
                        checkable>

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
                    </b-table>
                </b-tab-item>

                <b-tab-item label="Checked rows">
                    <pre>{{ checkedRows }}</pre>
                </b-tab-item>
            </b-tabs>
        </div>
        <pre class="example-code" v-highlight><code class="html">{{ template3 | pre }}</code></pre>
        <pre class="example-code" v-highlight><code class="javascript">{{ code3 | pre }}</code></pre>

        <hr>
        <h2 class="title is-spaced">Pagination and sorting</h2>
        <div class="content">
            <p>To make a column sortable, add the <code>sortable</code> prop on it and specify a <code>field</code> name.</p>
            <p>Moreover, use the <code>default-sort</code> prop to determine the default sort column and order. The column must be <code>sortable</code> to work.</p>
        </div>
        <div class="example">
            <b-field grouped group-multiline>
                <b-select v-model="perPage" :disabled="!isPaginated">
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                    <option value="15">15 per page</option>
                    <option value="20">20 per page</option>
                </b-select>
                <div class="control is-flex">
                    <b-switch v-model="isPaginated">Paginated</b-switch>
                </div>
                <div class="control is-flex">
                    <b-switch v-model="isPaginationSimple" :disabled="!isPaginated">Simple pagination</b-switch>
                </div>
            </b-field>

            <b-table
                :data="tableData"
                :paginated="isPaginated"
                :per-page="perPage"
                :pagination-simple="isPaginationSimple"
                default-sort="user.first_name">

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

                    <b-table-column field="date" label="Date" sortable centered>
                        <span class="tag is-success">
                            {{ new Date(props.row.date).toLocaleDateString() }}
                        </span>
                    </b-table-column>

                    <b-table-column label="Gender">
                        <b-icon pack="fa"
                            :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                        </b-icon>
                        {{ props.row.gender }}
                    </b-table-column>
                </template>
            </b-table>
        </div>
        <pre class="example-code" v-highlight><code class="html">{{ template4 | pre }}</code></pre>
        <pre class="example-code" v-highlight><code class="javascript">{{ code4 | pre }}</code></pre>

        <hr>
        <h2 class="title is-spaced">Detailed rows</h2>
        <div class="example">
            <b-table
                :data="tableDataSimple"
                detailed
                @details-open="(row, index) => $toast.open(`Expanded ${row.first_name}`)">

                <template scope="props">
                    <b-table-column label="ID" width="40"  numeric>
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

                <template slot="detail" scope="props">
                    <article class="media">
                        <figure class="media-left">
                            <p class="image is-64x64">
                                <img src="static/img/placeholder-128x128.png">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <strong>{{ props.row.first_name }} {{ props.row.last_name }}</strong>
                                    <small>@{{ props.row.first_name }}</small>
                                    <small>31m</small>
                                    <br>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                                    Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                                </p>
                            </div>
                        </div>
                    </article>
                </template>
            </b-table>
        </div>
        <pre class="example-code" v-highlight><code class="html">{{ template5 | pre }}</code></pre>
        <pre class="example-code" v-highlight><code class="javascript">{{ code5 | pre }}</code></pre>

        <hr>
        <h2 class="title is-spaced">Row status</h2>
        <p class="content">Use the <code>row-class</code> prop to return a class name. Note that <strong>you have to style the class yourself</strong>.</p>
        <div class="example">
            <b-table
                :data="tableDataSimple"
                :row-class="(row, index) => row.id === 1 ? 'is-warning' : ''">

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
            </b-table>
        </div>
        <pre class="example-code" v-highlight><code class="html">{{ template6 | pre }}</code></pre>
        <pre class="example-code" v-highlight><code class="javascript">{{ code5 | pre }}</code></pre>

        <hr>
        <h2 class="title is-spaced">Custom headers</h2>
        <p class="content">
            By adding a scoped slot named <code>header</code> you can customize the headers.
            Use the <code>meta</code> prop on column to pass anything you may need.
        </p>
        <div class="example">
            <b-table :data="tableDataSimple">
                <template scope="props" slot="header">
                    <b-tooltip :active="!!props.column.meta" :label="props.column.meta" dashed>
                        {{ props.column.label }}
                    </b-tooltip>
                </template>

                <template scope="props">
                    <b-table-column field="id" label="ID" meta="Internal ID" width="40" numeric sortable>
                        {{ props.row.id }}
                    </b-table-column>

                    <b-table-column field="first_name" label="FN" meta="First Name" sortable>
                        {{ props.row.first_name }}
                    </b-table-column>

                    <b-table-column field="last_name" label="LN" meta="Last Name" sortable>
                        {{ props.row.last_name }}
                    </b-table-column>

                    <b-table-column field="date" label="Acc. Date" meta="Account created date" centered sortable>
                        {{ new Date(props.row.date).toLocaleDateString() }}
                    </b-table-column>

                    <b-table-column field="gender" label="Gender" sortable>
                        {{ props.row.gender }}
                    </b-table-column>
                </template>
            </b-table>
        </div>
        <pre class="example-code" v-highlight><code class="html">{{ template7 | pre }}</code></pre>
        <pre class="example-code" v-highlight><code class="javascript">{{ code5 | pre }}</code></pre>

        <hr>
        <h2 class="title is-spaced">Toggle columns</h2>
        <b-message type="is-warning">
            Always use the <code>visible</code> prop to hide/show columns, and <strong>NOT</strong> <code>v-if</code> or <code>v-show</code>.
        </b-message>
        <div class="example">
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
        </div>
        <pre class="example-code" v-highlight><code class="html">{{ template8 | pre }}</code></pre>
        <pre class="example-code" v-highlight><code class="javascript">{{ code8 | pre }}</code></pre>

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

            <b-tab-item label="Slots">
                <b-table :data="tableSlots" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Slot name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description">
                            <span v-html="props.row.description"></span>
                        </b-table-column>
                        <b-table-column field="props" label="Props (if scoped)">
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

            <b-tab-item label="Methods">
                <b-table :data="tableMethods" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
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
    import data from '../../../assets/data_test.json'

    export default {
        data() {
            const tableDataSimple = [
                { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
                { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
            ]

            return {
                tableData: data,
                tableDataSimple,
                checkedRows: [tableDataSimple[1], tableDataSimple[3]],
                selected: tableDataSimple[1],
                isBordered: false,
                isStriped: false,
                isNarrowed: false,
                isLoading: false,
                isEmpty: false,
                hasMobileCards: true,
                isPaginated: true,
                isPaginationSimple: false,
                perPage: 5,
                columnsTemplate: [
                    { title: 'ID', field: 'id', visible: true },
                    { title: 'First Name', field: 'first_name', visible: true },
                    { title: 'Last Name', field: 'last_name', visible: true },
                    { title: 'Date', field: 'date', visible: true },
                    { title: 'Gender', field: 'gender', visible: true }
                ],
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
                        description: 'Rows can be checked (multiple), checked rows will have a <code>.is-checked</code> class if you want to style',
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
                        name: '<code>loading</code>',
                        description: 'Loading state',
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
                    },
                    {
                        name: '<code>row-class</code>',
                        description: 'Add a class to row (<code>&lt;tr&gt;</code> element) based on the return',
                        type: 'Function (row: Object, index: Number)',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>detailed</code>',
                        description: 'Allow row details (check scoped slots documentation)',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>custom-is-checked</code>',
                        description: 'Custom method to verify if row is checked, works when is <code>checkable</code>. Useful for backend pagination',
                        type: 'Function (a: Object, b: Object)',
                        values: '—',
                        default: '—'
                    }

                ],
                tableSlots: [
                    {
                        name: 'default',
                        description: '<strong>Required</strong>, table body and header',
                        props: '<code>row: Object</code>, <code>index: Number</code>'
                    },
                    {
                        name: '<code>header</code>',
                        description: 'Table custom header',
                        props: '<code>column: Vue Object</code>, <code>index: Number</code>'
                    },
                    {
                        name: '<code>detail</code>',
                        description: 'Row detail (collapsible)',
                        props: '<code>row: Object</code>, <code>index: Number</code>'
                    },
                    {
                        name: '<code>empty</code>',
                        description: 'Replaces table body when <code>data</code> array prop is empty',
                        props: ''
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
                    },
                    {
                        name: '<code>details-open</code>',
                        description: 'Triggers when details is opened',
                        parameters: '<code>row: Object</code>'
                    },
                    {
                        name: '<code>details-close</code>',
                        description: 'Triggers when details is closed',
                        parameters: '<code>row: Object</code>'
                    }
                ],
                tableMethods: [
                    {
                        name: '<code>initSort</code>',
                        description: 'Sort using <code>default-sort</code> prop parameters'
                    }
                ],
                columnProps: [
                    {
                        name: '<code>label</code>',
                        description: 'Column header text, also used to identify column if <code>custom-key</code> prop is missing',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>custom-key</code>',
                        description: 'Unique identifier, use when <code>label</code> is missing or there are duplicate <code>label</code> names',
                        type: 'String, Number',
                        values: '—',
                        default: '<code>this.label</code>'
                    },
                    {
                        name: '<code>field</code>',
                        description: 'Property of the object the column is attributed, used for sorting',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>meta</code>',
                        description: 'Meta prop to add anything, useful when creating custom headers',
                        type: 'Any',
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
                        description: 'Align the cell content to the right, sort icon on left',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>centered</code>',
                        description: 'Align the cell content to the center',
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
                        name: '<code>visible</code>',
                        description: 'Whether the column is visible',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>true</code>'
                    },
                    {
                        name: '<code>custom-sort</code>',
                        description: 'Custom sort method, works when is <code>sortable</code>',
                        type: 'Function (a: Object, b: Object)',
                        values: '—',
                        default: '—'
                    }
                ],
                template1: `
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
                </b-table>`,
                code1: `
                export default {
                    data() {
                        const tableDataSimple = [
                            {'id':1,'first_name':'Jesse','last_name':'Simmons','date':'2016-10-1513:43:27','gender':'Male'},
                            {'id':2,'first_name':'John','last_name':'Jacobs','date':'2016-12-1506:00:53','gender':'Male'},
                            {'id':3,'first_name':'Tina','last_name':'Gilbert','date':'2016-04-2606:26:28','gender':'Female'},
                            {'id':4,'first_name':'Clarence','last_name':'Flores','date':'2016-04-1010:28:46','gender':'Male'},
                            {'id':5,'first_name':'Anne','last_name':'Lee','date':'2016-12-0614:38:38','gender':'Female'}
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
                }`,
                template2: `
                <button class="button field is-danger" @click="selected = {}"
                    :disabled="!Object.keys(selected).length">
                    <b-icon icon="clear"></b-icon>
                    <span>Clear selected</span>
                </button>

                <b-table
                    :data="tableDataSimple"
                    :selected.sync="selected">

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
                </b-table>`,
                code2: `
                export default {
                    data() {
                        const tableDataSimple = [
                            {'id':1,'first_name':'Jesse','last_name':'Simmons','date':'2016-10-1513:43:27','gender':'Male'},
                            {'id':2,'first_name':'John','last_name':'Jacobs','date':'2016-12-1506:00:53','gender':'Male'},
                            {'id':3,'first_name':'Tina','last_name':'Gilbert','date':'2016-04-2606:26:28','gender':'Female'},
                            {'id':4,'first_name':'Clarence','last_name':'Flores','date':'2016-04-1010:28:46','gender':'Male'},
                            {'id':5,'first_name':'Anne','last_name':'Lee','date':'2016-12-0614:38:38','gender':'Female'}
                        ]

                        return {
                            tableDataSimple,
                            selected: tableDataSimple[1]
                        }
                    }
                }`,
                template3: `
                <button class="button field is-danger" @click="checkedRows = []"
                    :disabled="!checkedRows.length">
                    <b-icon icon="clear"></b-icon>
                    <span>Clear checked</span>
                </button>

                <b-table
                    :data="tableDataSimple"
                    :checked-rows.sync="checkedRows"
                    checkable>

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
                </b-table>`,
                code3: `
                export default {
                    data() {
                        const tableDataSimple = [
                            {'id':1,'first_name':'Jesse','last_name':'Simmons','date':'2016-10-1513:43:27','gender':'Male'},
                            {'id':2,'first_name':'John','last_name':'Jacobs','date':'2016-12-1506:00:53','gender':'Male'},
                            {'id':3,'first_name':'Tina','last_name':'Gilbert','date':'2016-04-2606:26:28','gender':'Female'},
                            {'id':4,'first_name':'Clarence','last_name':'Flores','date':'2016-04-1010:28:46','gender':'Male'},
                            {'id':5,'first_name':'Anne','last_name':'Lee','date':'2016-12-0614:38:38','gender':'Female'}
                        ]

                        return {
                            tableDataSimple,
                            checkedRows: [tableDataSimple[1], tableDataSimple[3]]
                        }
                    }
                }`,
                template4: `
                <b-field grouped group-multiline>
                    <b-select v-model="perPage" :disabled="!isPaginated">
                        <option value="5">5 per page</option>
                        <option value="10">10 per page</option>
                        <option value="15">15 per page</option>
                        <option value="20">20 per page</option>
                    </b-select>
                    <div class="control is-flex">
                        <b-switch v-model="isPaginated">Paginated</b-switch>
                    </div>
                    <div class="control is-flex">
                        <b-switch v-model="isPaginationSimple" :disabled="!isPaginated">Simple pagination</b-switch>
                    </div>
                </b-field>

                <b-table
                    :data="tableData"
                    :paginated="isPaginated"
                    :per-page="perPage"
                    :pagination-simple="isPaginationSimple"
                    default-sort="user.first_name">

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

                        <b-table-column field="date" label="Date" sortable centered>
                            <span class="tag is-success">
                                {{ new Date(props.row.date).toLocaleDateString() }}
                            </span>
                        </b-table-column>

                        <b-table-column label="Gender">
                            <b-icon pack="fa"
                                :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                            </b-icon>
                            {{ props.row.gender }}
                        </b-table-column>
                    </template>
                </b-table>`,
                code4: `
                export default {
                    data() {
                        const tableData = [
                            {"id":1,"user":{"first_name":"Jesse","last_name":"Simmons"},"date":"2016-10-15 13:43:27","gender":"Male"},
                            {"id":2,"user":{"first_name":"John","last_name":"Jacobs"},"date":"2016-12-15 06:00:53","gender":"Male"},
                            {"id":3,"user":{"first_name":"Tina","last_name":"Gilbert"},"date":"2016-04-26 06:26:28","gender":"Female"},
                            {"id":4,"user":{"first_name":"Clarence","last_name":"Flores"},"date":"2016-04-10 10:28:46","gender":"Male"},
                            {"id":5,"user":{"first_name":"Anne","last_name":"Lee"},"date":"2016-12-06 14:38:38","gender":"Female"},
                            // ...
                        ]

                        return {
                            tableData,
                            isPaginated: true,
                            isPaginationSimple: false,
                            perPage: 5
                        }
                    }
                }`,
                template5: `
                <b-table
                    :data="tableDataSimple"
                    detailed
                    @details-open="(row, index) => $toast.open(\`Expanded \${row.first_name}\`)">

                    <template scope="props">
                        <b-table-column label="ID" width="40"  numeric>
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

                    <template slot="detail" scope="props">
                        <article class="media">
                            <figure class="media-left">
                                <p class="image is-64x64">
                                    <img src="static/img/placeholder-128x128.png">
                                </p>
                            </figure>
                            <div class="media-content">
                                <div class="content">
                                    <p>
                                        <strong>{{ props.row.first_name }} {{ props.row.last_name }}</strong>
                                        <small>@{{ props.row.first_name }}</small>
                                        <small>31m</small>
                                        <br>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                                        Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                                    </p>
                                </div>
                            </div>
                        </article>
                    </template>
                </b-table>`,
                code5: `
                export default {
                    data() {
                        const tableDataSimple = [
                            {'id':1,'first_name':'Jesse','last_name':'Simmons','date':'2016-10-1513:43:27','gender':'Male'},
                            {'id':2,'first_name':'John','last_name':'Jacobs','date':'2016-12-1506:00:53','gender':'Male'},
                            {'id':3,'first_name':'Tina','last_name':'Gilbert','date':'2016-04-2606:26:28','gender':'Female'},
                            {'id':4,'first_name':'Clarence','last_name':'Flores','date':'2016-04-1010:28:46','gender':'Male'},
                            {'id':5,'first_name':'Anne','last_name':'Lee','date':'2016-12-0614:38:38','gender':'Female'}
                        ]

                        return {
                            tableDataSimple
                        }
                    }
                }`,
                template6: `
                <b-table
                    :data="tableDataSimple"
                    :row-class="(row, index) => row.id === 1 ? 'is-warning' : ''">

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
                </b-table>`,
                template7: `
                <b-table :data="tableDataSimple">
                    <template scope="props" slot="header">
                        <b-tooltip :active="!!props.column.meta" :label="props.column.meta" dashed>
                            {{ props.column.label }}
                        </b-tooltip>
                    </template>

                    <template scope="props">
                        <b-table-column field="id" label="ID" meta="Internal ID" width="40" numeric sortable>
                            {{ props.row.id }}
                        </b-table-column>

                        <b-table-column field="first_name" label="FN" meta="First Name" sortable>
                            {{ props.row.first_name }}
                        </b-table-column>

                        <b-table-column field="last_name" label="LN" meta="Last Name" sortable>
                            {{ props.row.last_name }}
                        </b-table-column>

                        <b-table-column field="date" label="Acc. Date" meta="Account created date" centered sortable>
                            {{ new Date(props.row.date).toLocaleDateString() }}
                        </b-table-column>

                        <b-table-column field="gender" label="Gender" sortable>
                            {{ props.row.gender }}
                        </b-table-column>
                    </template>
                </b-table>`,
                template8: `
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
                </b-table>`,
                code8: `
                export default {
                    data() {
                        const tableDataSimple = [
                            {'id':1,'first_name':'Jesse','last_name':'Simmons','date':'2016-10-1513:43:27','gender':'Male'},
                            {'id':2,'first_name':'John','last_name':'Jacobs','date':'2016-12-1506:00:53','gender':'Male'},
                            {'id':3,'first_name':'Tina','last_name':'Gilbert','date':'2016-04-2606:26:28','gender':'Female'},
                            {'id':4,'first_name':'Clarence','last_name':'Flores','date':'2016-04-1010:28:46','gender':'Male'},
                            {'id':5,'first_name':'Anne','last_name':'Lee','date':'2016-12-0614:38:38','gender':'Female'}
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
                }`
            }
        }
    }
</script>

<style>
    tr.is-warning {
        background: hsl(48, 100%, 67%) !important;
    }
</style>
