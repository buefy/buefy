<template>
    <div class="container">
        <h1 class="title is-spaced">Datepicker</h1>
        <h2 class="subtitle">An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <b-field label="Select a date">
                    <b-datepicker
                        placeholder="Click to select..."
                        icon="today">
                    </b-datepicker>
                </b-field>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Range</h2>
        <p class="content">You can limit the date range with <code>min-date</code> and <code>max-date</code> props.</p>

        <div class="columns">
            <div class="column">
                <b-field label="Select a date">
                    <b-datepicker
                        placeholder="Click to select..."
                        :min-date="minDate"
                        :max-date="maxDate">
                    </b-datepicker>
                </b-field>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code2 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Footer</h2>
        <p class="content">Any slots are added to the footer of the datepicker.</p>

        <div class="columns">
            <div class="column">
                <b-field label="Select a date">
                    <b-datepicker v-model="date"
                        placeholder="Click to select...">

                        <button class="button is-primary"
                            @click="date = new Date()">
                            <b-icon icon="today"></b-icon>
                            <span>Today</span>
                        </button>

                        <button class="button is-danger"
                            @click="date = null">
                            <b-icon icon="clear"></b-icon>
                            <span>Clear</span>
                        </button>
                    </b-datepicker>
                </b-field>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template3 | pre }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code3 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Inline</h2>
        <p class="content">Datepicker can also be shown inline with the <code>inline</code> prop, input is removed, set a <code>v-model</code> to get the date.</p>
        <div class="columns">
            <div class="column">
                <b-datepicker v-model="date" inline></b-datepicker>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template4 | pre }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code3 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">API</h2>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="selectProps" default-sort="name">
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
    export default {
        data() {
            const today = new Date()

            return {
                date: today,
                minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5),
                maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
                selectProps: [
                    {
                        name: '<code>v-model</code>',
                        description: 'Binding value',
                        type: 'Date, String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>date-formatter</code>',
                        description: 'Function to parse date to a string for display in the input/to be emitted if a string is passed in as component value. Will be passed a Date object as argument.',
                        type: 'Function',
                        values: '—',
                        default: '<code>(date) => date.toLocaleDateString()</code>'
                    },
                    {
                        name: '<code>min-date</code>',
                        description: 'Earliest date available for selection',
                        type: 'Date',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>max-date</code>',
                        description: 'Latest date available for selection',
                        type: 'Date',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>focused-date</code>',
                        description: 'Date that should be initially focused upon',
                        type: 'Date',
                        values: '—',
                        default: '<code>new Date()</code>'
                    },
                    {
                        name: '<code>size</code>',
                        description: 'Vertical size of input and picker, optional',
                        type: 'String',
                        values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                        default: '—'
                    },
                    {
                        name: '<code>inline</code>',
                        description: 'Datepicker is shown inline, input is removed',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>loading</code>',
                        description: 'Add the loading state to the input',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>icon</code>',
                        description: 'Icon name to be added',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>icon-pack</code>',
                        description: 'Icon pack to use',
                        type: 'String',
                        values: '<code>mdi</code>, <code>fa</code>',
                        default: '<code>mdi</code>'
                    },
                    {
                        name: '<code>day-names</code>',
                        description: 'Names of months to display in table header',
                        type: 'Array',
                        values: '—',
                        default: '<code>["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]</code>'
                    },
                    {
                        name: '<code>month-names</code>',
                        description: 'Names of days to display in table header',
                        type: 'Array',
                        values: '—',
                        default: '<code>["Su", "M", "Tu", "W", "Th", "F", "S"]</code>'
                    },
                    {
                        name: 'Any native attribute',
                        description: '—',
                        type: '—',
                        values: '—',
                        default: '—'
                    }
                ],
                template1: `
                <b-field label="Select a date">
                    <b-datepicker
                        placeholder="Click to select..."
                        icon="today">
                    </b-datepicker>
                </b-field>`,
                template2: `
                <b-field label="Select a date">
                    <b-datepicker
                        placeholder="Click to select..."
                        :min-date="minDate"
                        :max-date="maxDate">
                    </b-datepicker>
                </b-field>`,
                code2: `
                export default {
                    const today = new Date()

                    data() {
                        return {
                            date: new Date(),
                            minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5),
                            maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5)
                        }
                    }
                }`,
                template3: `
                <b-field label="Select a date">
                    <b-datepicker v-model="date"
                        placeholder="Click to select...">

                        <button class="button is-primary"
                            @click="date = new Date()">
                            <b-icon icon="today"></b-icon>
                            <span>Today</span>
                        </button>

                        <button class="button is-danger"
                            @click="date = null">
                            <b-icon icon="clear"></b-icon>
                            <span>Clear</span>
                        </button>
                    </b-datepicker>
                </b-field>`,
                code3: `
                export default {
                    data() {
                        return {
                            date: new Date()
                        }
                    }
                }`,
                template4: `<b-datepicker v-model="date" inline></b-datepicker>`
            }
        }
    }
</script>
