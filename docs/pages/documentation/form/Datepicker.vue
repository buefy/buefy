<template>
    <div class="container">
        <h1 class="title is-spaced">Datepicker</h1>
        <h2 class="subtitle">An input with a simple dropdown/modal for selecting a date</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <p>
                    The datepicker is an input that opens a dropdown on focus that allows a user to select a date from a calendar.
                    When a date is selected, the component emits the event <code>input</code> with either a date object or formatted string as the payload.
                    If the component is passed a date object through <code>v-model</code> it will emit a date object, and vice-versa with a string.
                    Today's date is outlined in the picker. See the documentation for Input for more details.
                </p>

                <hr>

                <b-field label="Select a date">
                    <b-datepicker
                        placeholder="Click to select...">
                    </b-datepicker>
                </b-field>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h1 class="title">Footer Buttons</h1>

        <div class="columns">
            <div class="column">
                <p>
                    The datepicker has three accessory functions that can be activated by using slots.
                </p>

                <hr>

                <b-field label="Select a date">
                    <b-datepicker v-model="secondDate"
                        placeholder="Click to select...">

                        <button class="button is-primary"
                            @click="secondDate = new Date()">
                            <b-icon icon="today"></b-icon>
                            <span>Today</span>
                        </button>

                        <button class="button is-danger"
                            @click="secondDate = null">
                            <b-icon icon="clear"></b-icon>
                            <span>Clear</span>
                        </button>
                    </b-datepicker>
                </b-field>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code1 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h1 class="title">Selectable Range</h1>

        <div class="columns">
            <div class="column">
                <p>
                    The datepicker can also have earliest and latest dates selectable set. Additionally, through the <code>:focused-date</code> prop, you can set the date picker to display a month and year other than today's month and year. However, once a date is selected, the picker will focus on that date when reopened, rather than the <code>:focused-date</code>.
                </p>

                <hr>

                <b-field label="Select a date">
                    <b-datepicker
                        v-model="thirdDate"
                        placeholder="Click to select..."
                        :earliest-date="thirdEarliestDate"
                        :latest-date="thirdLatestDate">
                    </b-datepicker>
                </b-field>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template3 | pre }}</code></pre>
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
                firstDate: today,
                secondDate: today,
                thirdDate: today,
                thirdEarliestDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5),
                thirdLatestDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
                selectProps: [
                    {
                        name: '<code>v-model</code>',
                        description: 'Binding value',
                        type: 'Date || String',
                        values: '—',
                        default: 'null'
                    },
                    {
                        name: '<code>:date-formatter</code>',
                        description: 'Function to parse date to a string for display in the input/to be emitted if a string is passed in as component value. Will be passed a Date object as argument. If no function is passed in, the default function returns date.toLocaleDateString()',
                        type: 'Function',
                        values: 'Any valid function',
                        default: '(date) => date.toLocaleDateString()'
                    },
                    {
                        name: '<code>:earliest-date</code>',
                        description: 'Earliest date available for selection',
                        type: 'Date',
                        values: '—',
                        default: 'null'
                    },
                    {
                        name: '<code>:latest-date</code>',
                        description: 'Latest date available for selection',
                        type: 'Date',
                        values: '—',
                        default: 'null'
                    },
                    {
                        name: '<code>:focused-date</code>',
                        description: 'Date that should be initially focused upon',
                        type: 'Date',
                        values: '—',
                        default: '<code>new Date()</code> (today)'
                    },
                    {
                        name: '<code>:close-on-blur</code>',
                        description: 'Whether or not to close datepicker on blur. Note, for accessibility reasons, it is better to leave this as false.',
                        type: 'Boolean',
                        values: '<code>true</code>, <code>false</code>',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>type</code>',
                        description: 'Input type, like native',
                        type: 'String',
                        values: 'Any native input type, and <code>textarea</code>',
                        default: '<code>text</code>'
                    },
                    {
                        name: '<code>size</code>',
                        description: 'Vertical size of input, optional',
                        type: 'String',
                        values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                        default: '—'
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
                        name: '<code>:day-names</code>',
                        description: 'Names of months to display in table header',
                        type: 'Array',
                        values: 'Array of names for months',
                        default: '<code>["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]</code>'
                    },
                    {
                        name: '<code>:month-names</code>',
                        description: 'Names of days to display in table header',
                        type: 'Array',
                        values: 'Array of names for days',
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
                        placeholder="Click to select...">
                    </b-datepicker>
                </b-field>`,
                code1: `
                export default {
                    data() {
                        return {
                            date: new Date()
                        }
                    }
                }`,
                template2: `
                <b-field label="Select a date">
                    <b-datepicker v-model="secondDate"
                        placeholder="Click to select...">
                        <button class="button is-primary" slot="today">
                            <b-icon icon="today"></b-icon>
                            <span>Today</span>
                        </button>
                        <button class="button is-danger" slot="clear">
                            <b-icon icon="clear"></b-icon>
                            <span>Clear</span>
                        </button>
                    </b-datepicker>
                </b-field>`,
                template3: `
                <b-field label="Select a date">
                    <b-datepicker
                        v-model="thirdDate"
                        placeholder="Click to select..."
                        :earliest-date="thirdEarliestDate"
                        :latest-date="thirdLatestDate">
                    </b-datepicker>
                </b-field>`,
                code3: `
                export default {
                    const today = new Date();
                    data() {
                        return {
                            date: new Date(),
                            earliestDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5),
                            latestDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5)
                        }
                    }
                }`
            }
        }
    }
</script>
