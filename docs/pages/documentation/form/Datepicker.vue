<template>
<div class="container">
    <h1 class="title is-spaced">Datepicker</h1>
    <h2 class="subtitle">Select a date from a simple modal</h2>
    <hr>

    <div class="columns">
      <div class="column">
        <button class="button is-primary" @click="datepickerActive = true">Pick Date</button>
        <b-datepicker :active.sync="datepickerActive" v-model="date"></b-datepicker>
      </div>
      <div class="column">
        <pre class="content" v-highlight><code class="html">{{ template | pre }}</code></pre>
        <pre v-highlight><code class="javascript">{{ code | pre }}</code></pre>
      </div>
    </div>

    <hr>
    <h2 class="title is-spaced">API</h2>
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
      return {
        datepickerActive: false,
        date: null,
        selectProps: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'Date',
                values: '—',
                default: 'new Date()'
            },
            {
                name: '<code>:active.sync</code>',
                description: 'Visibility of Datepicker',
                type: 'Boolean',
                values: '<code>true</code>, <code>false</code>',
                default: '<code>false</code>'
            },
            {
                name: '<code>icon-pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>',
                default: '<code>mdi</code>'
            }
        ],
        template: `
        <button class="button is-primary" @click="datepickerActive = true">Pick Date</button>
        <b-datepicker :active.sync="datepickerActive" v-model="date"></b-datepicker>`,
        code: `
        export default {
            data() {
                return {
                    datepickerActive: false,
                    date: new Date(),
                }
            }
        }`,
      }
    }
}
</script>
