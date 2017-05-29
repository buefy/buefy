<template>
    <div class="container">
        <h1 class="title is-spaced">Autocomplete</h1>
        <h2 class="subtitle"></h2>
        <hr>

        <div class="example">
            <p class="content"><b>Selected:</b> {{ sync.selected }}</p>

            <b-autocomplete
                :data="testData">
            </b-autocomplete>

        </div>
        <pre class="content" v-highlight><code class="html">{{  }}</code></pre>
        <pre class="content" v-highlight><code class="javascript">{{  }}</code></pre>

        <div class="example">
            <p class="content"><b>Selected:</b> {{ sync.selected }}</p>

            <b-autocomplete
                v-model="sync.name"
                :data="filteredData"
                field="user.first_name"
                @select="option => sync.selected = option">
            </b-autocomplete>

        </div>
        <pre class="content" v-highlight><code class="html">{{  }}</code></pre>
        <pre class="content" v-highlight><code class="javascript">{{  }}</code></pre>

        <h2 class="title">Async</h2>
        <p class="block"><small>API from <a href="https://www.themoviedb.org" target="_blank">TMDb</a></small></p>
        <div class="example">
            <p class="content"><b>Selected:</b> {{ async.selected }}</p>

            <b-field label="Find a movie">
                <b-autocomplete
                    v-model="async.name"
                    :data="async.data"
                    field="title"
                    custom-template
                    :loading="async.isFetching"
                    @change="getAsyncData"
                    @select="option => async.selected = option">

                    <template scope="props">
                        <div class="is-flex">
                            <div style="height: 0; width: 32px; margin-right: 0.5em;">
                                <img :src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + props.option.poster_path">
                            </div>
                            <div>
                                {{ props.option.title }}
                                <br>
                                <small>
                                    Released at {{ props.option.release_date }},
                                    rated <b>{{ props.option.vote_average }}</b>
                                </small>
                            </div>
                        </div>
                    </template>

                </b-autocomplete>
            </b-field>
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
    import data from '../../../assets/data_test.json'
    import debounce from 'lodash/debounce'

    export default {
        data() {
            return {
                testData: ['Angular', 'React', 'Vue'],
                sync: {
                    data,
                    name: '',
                    selected: null
                },
                async: {
                    data: [],
                    name: '',
                    selected: null,
                    isFetching: false
                },
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
                template: ``,
                code: ``
            }
        },
        computed: {
            filteredData() {
                return this.sync.data.filter((option) => {
                    return option.user.first_name
                        .toString()
                        .toLowerCase()
                        .indexOf(this.sync.name.toLowerCase()) >= 0
                })
            }
        },
        methods: {
            getAsyncData: debounce(function () {
                this.async.data = []
                this.async.isFetching = true
                this.$http.get('https://api.themoviedb.org/3/search/movie?api_key=bb6f51bef07465653c3e553d6ab161a8&query=' + this.async.name)
                    .then(({ data }) => {
                        data.results.forEach((item) => this.async.data.push(item))
                        this.async.isFetching = false
                    }, response => {
                        this.async.isFetching = false
                    })
            }, 500)
        }
    }
</script>
