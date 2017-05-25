<template>
    <div class="container">
        <h1 class="title is-spaced">Autocomplete</h1>
        <h2 class="subtitle"></h2>
        <hr>

        <div class="example">
            <b-autocomplete v-model="search" :data="filteredData" field="user.first_name" @select="option => selected = option">
                <template scope="props">
                    {{ props.option.user.first_name }}
                </template>
            </b-autocomplete>
            <br>
            <b>Último selecionado:</b> {{ selected }}
        </div>
        <pre class="content" v-highlight><code class="html">{{  }}</code></pre>
        <pre class="content" v-highlight><code class="javascript">{{  }}</code></pre>

        <h2 class="title">Async</h2>
        <div class="example">
            <b-field label="Find a movie">
                <b-autocomplete v-model="search2" :data="asyncData" field="title" @change="getAsyncData" :loading="isFetching" @select="option => selected2 = option">
                    <template scope="props">
                        {{ props.option.title }}
                    </template>
                </b-autocomplete>
            </b-field>
            <br>
            <b>Último selecionado:</b> {{ selected2 }}
        </div>
        <pre class="content" v-highlight><code class="html">{{  }}</code></pre>
        <pre v-highlight><code class="javascript">{{  }}</code></pre>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <!--<b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="props" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name"
                            :content="props.row.name">
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620"
                            :content="props.row.description">
                        </b-table-column>
                        <b-table-column field="type" label="Type"
                            :content="props.row.type">
                        </b-table-column>
                        <b-table-column field="values" label="Values"
                            :content="props.row.values">
                        </b-table-column>
                        <b-table-column field="default" label="Default"
                            :content="props.row.default">
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>

            <b-tab-item label="Events">
                <b-table :data="events" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name"
                            :content="props.row.name">
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620"
                            :content="props.row.description">
                        </b-table-column>
                        <b-table-column field="parameters" label="Parameters"
                            :content="props.row.parameters">
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>
        </b-tabs>-->
    </div>
</template>

<script>
    import testData from '../../../assets/data_test.json'

    export default {
        data() {
            return {
                testData,
                search: '',
                search2: '',
                selected: null,
                selected2: null,
                asyncData: [],
                isFetching: false,
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
                        description: 'Current page number',
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
                    :current="current"
                    :order="order"
                    :size="size"
                    :simple="isSimple"
                    :per-page="perPage"
                    @change="pageChanged">
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
                    },
                    methods: {
                        pageChanged(value) {
                            this.current = value
                        }
                    }
                }`
            }
        },
        computed: {
            filteredData() {
                return this.testData.filter((option) => {
                    return option.user.first_name
                        .toString()
                        .toLowerCase()
                        .indexOf(this.search.toLowerCase()) >= 0
                })
            }
        },
        methods: {
            getAsyncData() {
                this.asyncData = []
                this.isFetching = true
                this.$http.get('https://api.themoviedb.org/3/search/movie?api_key=342d3061b70d2747a1e159ae9a7e9a36&query=' + this.search2)
                    .then(({ data }) => {
                        data.results.forEach((item) => this.asyncData.push(item))
                        this.isFetching = false
                    }, response => {
                        this.isFetching = false
                    })
            }
        }
    }
</script>
