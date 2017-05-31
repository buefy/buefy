<template>
    <div class="container">
        <h1 class="title is-spaced">Autocomplete</h1>
        <h2 class="subtitle">Extended input that provide suggestions while the user types</h2>
        <hr>

        <div class="example">
            <p class="content"><b>Selected:</b> {{ arrayExample.selected }}</p>
            <b-field label="Find a JS framework">
                <b-autocomplete
                    v-model="arrayExample.name"
                    :data="filteredDataArray"
                    placeholder="e.g. jQuery"
                    @select="option => arrayExample.selected = option">
                </b-autocomplete>
            </b-field>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
        <pre class="content" v-highlight><code class="javascript">{{ code1 | pre }}</code></pre>

        <h2 class="title">Object array</h2>
        <div class="example">
            <div class="field">
                <b-switch v-model="syncExample.keepFirst">
                    Keep-first <small>(will always have first option pre-selected)</small>
                </b-switch>
            </div>
            <p class="content"><b>Selected:</b> {{ syncExample.selected }}</p>
            <b-field label="Find a name">
                <b-autocomplete
                    v-model="syncExample.name"
                    placeholder="e.g. Anne"
                    :keep-first="syncExample.keepFirst"
                    :data="filteredDataObj"
                    field="user.first_name"
                    @select="option => syncExample.selected = option">
                </b-autocomplete>
            </b-field>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
        <pre class="content" v-highlight><code class="javascript">{{ code2 | pre }}</code></pre>

        <h2 class="title">Async with custom template</h2>
        <p class="block"><small>API from <a href="https://www.themoviedb.org" target="_blank">TMDb</a></small></p>
        <div class="example">
            <p class="content"><b>Selected:</b> {{ asyncExample.selected }}</p>
            <b-field label="Find a movie">
                <b-autocomplete
                    v-model="asyncExample.name"
                    :data="asyncExample.data"
                    placeholder="e.g. Fight Club"
                    field="title"
                    has-custom-template
                    :loading="asyncExample.isFetching"
                    @change="getAsyncData"
                    @select="option => asyncExample.selected = option">

                    <template scope="props">
                        <div class="media">
                            <div class="media-left">
                                <img width="32" :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`">
                            </div>
                            <div class="media-content">
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
        <pre class="content" v-highlight><code class="html">{{ template3 | pre }}</code></pre>
        <pre class="content" v-highlight><code class="javascript">{{ code3 | pre }}</code></pre>

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

            <b-tab-item label="Scoped slots">
                <b-table :data="scopedSlots" default-sort="name">
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
    import data from '../../../assets/data_test.json'
    import debounce from 'lodash/debounce'

    export default {
        data() {
            return {
                arrayExample: {
                    data: [
                        'Angular',
                        'Angular 2',
                        'Aurelia',
                        'Backbone',
                        'Ember',
                        'jQuery',
                        'Meteor',
                        'Node.js',
                        'Polymer',
                        'React',
                        'RxJS',
                        'Vue.js'
                    ],
                    name: '',
                    selected: null
                },
                syncExample: {
                    data,
                    keepFirst: true,
                    name: '',
                    selected: null
                },
                asyncExample: {
                    data: [],
                    name: '',
                    selected: null,
                    isFetching: false
                },
                props: [
                    {
                        name: '<code>v-model</code>',
                        description: 'Bindig value',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>data</code>',
                        description: 'Options / suggestions',
                        type: 'Array<String>, Array<Object>',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>field</code>',
                        description: 'Property of the object (if <code>data</code> is array of objects) to use as display text, and to keep track of selected option',
                        type: 'String',
                        values: '—',
                        default: '<code>value</code>'
                    },
                    {
                        name: '<code>max-results</code>',
                        description: 'Total of results/options to show',
                        type: 'Number',
                        values: '—',
                        default: '<code>6</code>'
                    },
                    {
                        name: '<code>keep-first</code>',
                        description: 'The first option will always be pre-selected (easier to just hit enter)',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>has-custom-template</code>',
                        description: 'Enable creating a custom template for the option with scoped slot',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>size</code>',
                        description: 'Optional, size of control',
                        type: 'String',
                        values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                        default: '—'
                    },
                    {
                        name: '<code>loading</code>',
                        description: 'Has loading state',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>expanded</code>',
                        description: 'Full width when inside a grouped or addon field',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>placeholder</code>',
                        description: 'Same as native <code>placeholder</code>',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>name</code>',
                        description: 'Same as native <code>name</code>',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>required</code>',
                        description: 'Same as native <code>required</code>',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>disabled</code>',
                        description: 'Same as native <code>disabled</code>',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    }
                ],
                scopedSlots: [
                    {
                        name: 'default',
                        props: '<code>option: String|Object</code>'
                    }
                ],
                events: [
                    {
                        name: '<code>change</code>',
                        description: 'Triggers when input text is changed',
                        parameters: '<code>value: String</code>'
                    },
                    {
                        name: '<code>select</code>',
                        description: 'Triggers when an option is selected or unset',
                        parameters: '<code>option: String|Object</code>'
                    },
                    {
                        name: '<code>focus</code>',
                        description: 'Triggers when input is focused',
                        parameters: '<code>event: $event</code>'
                    },
                    {
                        name: '<code>blur</code>',
                        description: 'Triggers when input loses focus',
                        parameters: '<code>event: $event</code>'
                    }
                ],
                template1: `
                <p class="content"><b>Selected:</b> {{ arrayExample.selected }}</p>
                <b-field label="Find a JS framework">
                    <b-autocomplete
                        v-model="arrayExample.name"
                        :data="filteredDataArray"
                        placeholder="e.g. jQuery"
                        @select="option => arrayExample.selected = option">
                    </b-autocomplete>
                </b-field>`,
                code1: `
                export default {
                    data() {
                        return {
                            arrayExample: {
                                data: [
                                    'Angular',
                                    'Angular 2',
                                    'Aurelia',
                                    'Backbone',
                                    'Ember',
                                    'jQuery',
                                    'Meteor',
                                    'Node.js',
                                    'Polymer',
                                    'React',
                                    'RxJS',
                                    'Vue.js'
                                ],
                                name: '',
                                selected: null
                            }
                        }
                    },
                    computed: {
                        filteredDataArray() {
                            return this.arrayExample.data.filter((option) => {
                                return option
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(this.arrayExample.name.toLowerCase()) >= 0
                            })
                        }
                    }
                }`,
                template2: `
                <div class="field">
                    <b-switch v-model="syncExample.keepFirst">
                        Keep-first <small>(will always have first option pre-selected)</small>
                    </b-switch>
                </div>
                <p class="content"><b>Selected:</b> {{ syncExample.selected }}</p>
                <b-field label="Find a name">
                    <b-autocomplete
                        v-model="syncExample.name"
                        placeholder="e.g. Anne"
                        :keep-first="syncExample.keepFirst"
                        :data="filteredDataObj"
                        field="user.first_name"
                        @select="option => syncExample.selected = option">
                    </b-autocomplete>
                </b-field>`,
                code2: `
                export default {
                    data() {
                        return {
                            syncExample: {
                                data: [
                                    {"id":1,"user":{"first_name":"Jesse","last_name":"Simmons"},"date":"2016-10-15 13:43:27","gender":"Male"},
                                    {"id":2,"user":{"first_name":"John","last_name":"Jacobs"},"date":"2016-12-15 06:00:53","gender":"Male"},
                                    {"id":3,"user":{"first_name":"Tina","last_name":"Gilbert"},"date":"2016-04-26 06:26:28","gender":"Female"},
                                    {"id":4,"user":{"first_name":"Clarence","last_name":"Flores"},"date":"2016-04-10 10:28:46","gender":"Male"},
                                    {"id":5,"user":{"first_name":"Anne","last_name":"Lee"},"date":"2016-12-06 14:38:38","gender":"Female"},
                                    ...
                                ],
                                keepFirst: false,
                                name: '',
                                selected: null
                            }
                        }
                    },
                    computed: {
                        filteredDataArray() {
                            return this.arrayExample.data.filter((option) => {
                                return option
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(this.arrayExample.name.toLowerCase()) >= 0
                            })
                        }
                    }
                }`,
                template3: `
                <p class="content"><b>Selected:</b> {{ asyncExample.selected }}</p>
                <b-field label="Find a movie">
                    <b-autocomplete
                        v-model="asyncExample.name"
                        :data="asyncExample.data"
                        field="title"
                        has-custom-template
                        :loading="asyncExample.isFetching"
                        @change="getAsyncData"
                        @select="option => asyncExample.selected = option">

                        <template scope="props">
                            <div class="media">
                                <div class="media-left">
                                    <img width="32" :src="\`https://image.tmdb.org/t/p/w500/\${props.option.poster_path}\`">
                                </div>
                                <div class="media-content">
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
                </b-field>`,
                code3: `
                export default {
                    data() {
                        return {
                            asyncExample: {
                                data: [],
                                name: '',
                                selected: null,
                                isFetching: false
                            }
                        }
                    },
                    methods: {
                        // You have to install and import debounce to use it,
                        // it's not mandatory though.
                        getAsyncData: debounce(function () {
                            this.asyncExample.data = []
                            this.asyncExample.isFetching = true
                            this.$http.get(\`https://api.themoviedb.org/3/search/movie?api_key=####&query=\${this.asyncExample.name}\`)
                                .then(({ data }) => {
                                    data.results.forEach((item) => this.asyncExample.data.push(item))
                                    this.asyncExample.isFetching = false
                                }, response => {
                                    this.asyncExample.isFetching = false
                                })
                        }, 500)
                    }
                }`
            }
        },
        computed: {
            filteredDataArray() {
                return this.arrayExample.data.filter((option) => {
                    return option
                        .toString()
                        .toLowerCase()
                        .indexOf(this.arrayExample.name.toLowerCase()) >= 0
                })
            },
            filteredDataObj() {
                return this.syncExample.data.filter((option) => {
                    return option.user.first_name
                        .toString()
                        .toLowerCase()
                        .indexOf(this.syncExample.name.toLowerCase()) >= 0
                })
            }
        },
        methods: {
            // You have to install and import debounce to use it,
            // it's not mandatory though.
            getAsyncData: debounce(function () {
                this.asyncExample.data = []
                this.asyncExample.isFetching = true
                this.$http.get(`https://api.themoviedb.org/3/search/movie?api_key=bb6f51bef07465653c3e553d6ab161a8&query=${this.asyncExample.name}`)
                    .then(({ data }) => {
                        data.results.forEach((item) => this.asyncExample.data.push(item))
                        this.asyncExample.isFetching = false
                    }, response => {
                        this.asyncExample.isFetching = false
                    })
            }, 500)
        }
    }
</script>
