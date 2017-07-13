<template>
    <div class="container">
        <h1 class="title is-spaced">Pagination</h1>
        <h2 class="subtitle">A responsive and flexible pagination</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <b-field label="Total">
                    <b-input type="number" v-model="total"></b-input>
                </b-field>
            </div>
            <div class="column">
                <b-field label="Items per page">
                    <b-input type="number" v-model="perPage"></b-input>
                </b-field>
            </div>
            <div class="column">
                <p class="control">
                    <label class="label">Order</label>
                    <span class="select is-fullwidth">
                        <select v-model="order">
                            <option value="">default</option>
                            <option value="is-centered">is-centered</option>
                            <option value="is-right">is-right</option>
                        </select>
                    </span>
                </p>
            </div>
            <div class="column">
                <p class="control">
                    <label class="label">Size</label>
                    <span class="select is-fullwidth">
                        <select v-model="size">
                            <option value="">default</option>
                            <option value="is-small">is-small</option>
                            <option value="is-medium">is-medium</option>
                            <option value="is-large">is-large</option>
                        </select>
                    </span>
                </p>
            </div>
        </div>
        <div class="block">
            <b-switch v-model="isSimple">Simple</b-switch>
        </div>

        <div class="example">
            <b-pagination
                :total="total"
                :current.sync="current"
                :order="order"
                :size="size"
                :simple="isSimple"
                :per-page="perPage">
            </b-pagination>
        </div>
        <pre class="block" v-highlight><code class="html">{{ template | pre }}</code></pre>
        <pre v-highlight><code class="javascript">{{ code | pre }}</code></pre>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="props" default-sort="name">
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

            <b-tab-item label="Events">
                <b-table :data="events" default-sort="name">
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                total: 200,
                current: 1,
                perPage: 20,
                order: '',
                size: '',
                isSimple: false,
                props: [
                    {
                        name: '<code>total</code>',
                        description: `Total count of items`,
                        type: 'Number',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>per-page</code>',
                        description: 'Items count for each page',
                        type: 'Number',
                        values: '—',
                        default: '<code>20</code>'
                    },
                    {
                        name: '<code>current</code>',
                        description: 'Current page number, use the <code>.sync</code> modifier to make it two-way binding',
                        type: 'Number',
                        values: '—',
                        default: '<code>1</code>'
                    },
                    {
                        name: '<code>order</code>',
                        description: 'Buttons order, optional',
                        type: 'String',
                        values: '<code>is-centered</code>, <code>is-right</code>',
                        default: '—'
                    },
                    {
                        name: '<code>size</code>',
                        description: 'Pagination size, optional',
                        type: 'String',
                        values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                        default: '—'
                    },
                    {
                        name: '<code>simple</code>',
                        description: 'Simpler style',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    }
                ],
                events: [
                    {
                        name: '<code>change</code>',
                        description: 'Triggers when the current page is changed',
                        parameters: '<code>value: Number</code>'
                    }
                ],
                template: `
                <b-pagination
                    :total="total"
                    :current.sync="current"
                    :order="order"
                    :size="size"
                    :simple="isSimple"
                    :per-page="perPage">
                </b-pagination>`,
                code: `
                export default {
                    data() {
                        return {
                            total: 200,
                            current: 1,
                            perPage: 20,
                            order: '',
                            size: '',
                            isSimple: false
                        }
                    }
                }`
            }
        }
    }
</script>
