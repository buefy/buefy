<template>
<div class="container">
    <h1 class="title is-spaced">Datepicker</h1>
    <h2 class="subtitle">Select a date from a simple modal</h2>
    <hr>

    <div class="columns">
        <div class="column">
            <p>
                The datepicker is a simple modal that allows a user to select a date from a calendar. When a date is selected, the component emits the event <code>input</code> with a date object as the payload. This can be paired with <code>v-model</code> or used standalone. Today's date is outlined in the picker.
                <br />
                <br />
                <button class="button is-primary" @click="firstDatepickerActive = true">Pick Date</button>
            </p>

            <b-datepicker :active.sync="firstDatepickerActive" v-model="firstDate"></b-datepicker>
        </div>
        <div class="column">
            <pre class="content" v-highlight><code class="html">{{ firstTemplate | pre }}</code></pre>
            <pre v-highlight><code class="javascript">{{ firstCode | pre }}</code></pre>
        </div>
    </div>

    <hr>
    <h1 class="title">Footer Buttons</h1>

    <div class="columns">
        <div class="column">
            <p>
                The datepicker can be configured to have three different footer buttons for better control. <code>:footer-today</code> will display a button that when clicked selects today's date and closes the modal. <code>:footer-clear</code> will set the value of the date picker to <code>null</code> and close the modal. <code>:footer-close</code>, which defaults to <code>true</code>, will display a button that when clicked closes the modal without selecting a date.
                <br />
                <br />
                <button class="button is-primary" @click="secondDatepickerActive = true">Pick Date</button>
            </p>

            <b-datepicker
              :active.sync="secondDatepickerActive"
              v-model="secondDate"
              :footer-today="true"
              :footer-clear="true"
              :footer-close="true">
            </b-datepicker>
        </div>
        <div class="column">
            <pre class="content" v-highlight><code class="html">{{ secondTemplate | pre }}</code></pre>
            <pre v-highlight><code class="javascript">{{ secondCode | pre }}</code></pre>
        </div>
    </div>

    <hr>
    <h1 class="title">Selectable Range</h1>

    <div class="columns">
        <div class="column">
            <p>
                The datepicker can also have earliest and latest dates selectable set. Additionally, through the <code>:focused-date</code> prop, you can set the date picker to display a month and year other than today's month and year. However, once a date is selected, the picker will focus on that date when reopened, rather than the <code>:focused-date</code>.
                <br />
                <br />
                <button class="button is-primary" @click="thirdDatepickerActive = true">Pick Date</button>
            </p>

            <b-datepicker
              :active.sync="thirdDatepickerActive"
              v-model="thirdDate"
              :earliest-date="thirdEarliestDate"
              :latest-date="thirdLatestDate">
            </b-datepicker>
        </div>
        <div class="column">
            <pre class="content" v-highlight><code class="html">{{ thirdTemplate | pre }}</code></pre>
            <pre v-highlight><code class="javascript">{{ thirdCode | pre }}</code></pre>
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
            firstDatepickerActive: false,
            firstDate: null,
            secondDatepickerActive: false,
            secondDate: null,
            thirdDatepickerActive: false,
            thirdDate: null,
            thirdEarliestDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5),
            thirdLatestDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
            selectProps: [
                {
                    name: '<code>v-model</code>',
                    description: 'Binding value',
                    type: 'Date',
                    values: '—',
                    default: 'null'
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
                    name: '<code>:active.sync</code>',
                    description: 'Visibility of Datepicker',
                    type: 'Boolean',
                    values: '<code>true</code>, <code>false</code>',
                    default: '<code>false</code>'
                },
                {
                    name: '<code>:footer-today</code>',
                    description: 'Whether to display a button that focuses on today\'s date',
                    type: 'Boolean',
                    values: '<code>true</code>, <code>false</code>',
                    default: '<code>false</code>'
                },
                {
                    name: '<code>:footer-clear</code>',
                    description: 'Whether to display a button that clears the selected date',
                    type: 'Boolean',
                    values: '<code>true</code>, <code>false</code>',
                    default: '<code>false</code>'
                },
                {
                    name: '<code>:footer-close</code>',
                    description: 'Whether to display a button that closes the datepicker',
                    type: 'Boolean',
                    values: '<code>true</code>, <code>false</code>',
                    default: '<code>true</code>'
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
                    name: '<code>footer-today-label</code>',
                    description: 'Text to display in footer-today button',
                    type: 'String',
                    values: 'Any string',
                    default: 'Select Today'
                },
                {
                    name: '<code>footer-clear-label</code>',
                    description: 'Text to display in footer-clear button',
                    type: 'String',
                    values: 'Any string',
                    default: 'Clear Selection'
                },
                {
                    name: '<code>footer-close-label</code>',
                    description: 'Text to display in footer-close button',
                    type: 'String',
                    values: 'Any string',
                    default: 'Close'
                }
            ],
            firstTemplate: `
                <button class="button is-primary" @click="datepickerActive = true">Pick Date</button>
                <b-datepicker :active.sync="datepickerActive" v-model="date"></b-datepicker>`,
            firstCode: `
                export default {
                    data() {
                        return {
                            datepickerActive: false,
                            date: new Date(),
                        }
                    }
                }`,
            secondTemplate: `
                <button class="button is-primary" @click="datepickerActive = true">Pick Date</button>
                <b-datepicker
                  :active.sync="datepickerActive"
                  v-model="date"
                  :footer-today="true"
                  :footer-clear="true"
                  :footer-close="true">
                </b-datepicker>`,
            secondCode: `
                export default {
                    data() {
                        return {
                            datepickerActive: false,
                            date: new Date(),
                        }
                    }
                }`,
            thirdTemplate: `
                <button class="button is-primary" @click="datepickerActive = true">Pick Date</button>
                <b-datepicker
                  :active.sync="datepickerActive"
                  v-model="date"
                  :earliest-date="earliestDate"
                  :latest-date="latestDate">
                </b-datepicker>`,
            thirdCode: `
                export default {
                    const today = new Date();
                    data() {
                        return {
                            datepickerActive: false,
                            date: new Date(),
                            earliestDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5),
                            latestDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
                        }
                    }
                }`
        }
    }
}
</script>
