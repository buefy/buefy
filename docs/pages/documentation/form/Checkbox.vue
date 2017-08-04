<template>
    <div class="container">
        <h1 class="title is-spaced">Checkbox</h1>
        <h2 class="subtitle">Select a single or grouped options</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <div class="field">
                    <b-checkbox>Basic</b-checkbox>
                </div>
                <div class="field">
                    <b-checkbox v-model="checkbox">
                        {{ checkbox }}
                    </b-checkbox>
                </div>
                <div class="field">
                    <b-checkbox v-model="checkboxCustom"
                        true-value="Yes"
                        false-value="No">
                        {{ checkboxCustom }}
                    </b-checkbox>
                </div>
                <div class="field">
                    <b-checkbox disabled>Disabled</b-checkbox>
                </div>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code1 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Grouped (Array)</h2>
        <p class="content">Just add the same <code>v-model</code> to multiple Checkboxes, and set a <code>native-value</code>.</p>
        <div class="columns">
            <div class="column">
                <div class="block">
                    <b-checkbox v-model="checkboxGroup"
                        native-value="Silver">
                        Silver
                    </b-checkbox>
                    <b-checkbox v-model="checkboxGroup"
                        native-value="Flint">
                        Flint
                    </b-checkbox>
                    <b-checkbox v-model="checkboxGroup"
                        native-value="Vane">
                        Vane
                    </b-checkbox>
                    <b-checkbox v-model="checkboxGroup"
                        native-value="Billy" disabled>
                        Billy
                    </b-checkbox>
                </div>
                <p class="content"><b>Selection:</b> {{ checkboxGroup }}</p>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code2 | pre }}</code></pre>
            </div>
        </div>

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
                checkbox: false,
                checkboxCustom: 'Yes',
                checkboxGroup: ['Flint'],
                props: [
                    {
                        name: '<code>v-model</code>',
                        description: 'Binding value',
                        type: 'Any',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>native-value</code>',
                        description: 'Same as native <code>value</code>',
                        type: 'Any',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>true-value</code>',
                        description: `Overrides the returned value when it's checked`,
                        type: 'Any',
                        values: '—',
                        default: '<code>true</code>'
                    },
                    {
                        name: '<code>false-value</code>',
                        description: `Overrides the returned value when it's not checked`,
                        type: 'Any',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>disabled</code>',
                        description: 'Same as native <code>disabled</code>',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>name</code>',
                        description: 'Same as native <code>name</code>',
                        type: 'String',
                        values: '—',
                        default: '—'
                    }
                ],
                events: [
                    {
                        name: '<code>input</code>',
                        description: 'Triggers when the value of checkbox is changed',
                        parameters: '<code>value: Boolean</code>'
                    },
                    {
                        name: '<code>[any].native</code>',
                        description: 'Listen to any event using this syntax, e.g <code>click.native</code>',
                        parameters: '<code>event: $event</code>'
                    }
                ],
                template1: `
                <div class="field">
                    <b-checkbox>Basic</b-checkbox>
                </div>
                <div class="field">
                    <b-checkbox v-model="checkbox">
                        {{ checkbox }}
                    </b-checkbox>
                </div>
                <div class="field">
                    <b-checkbox v-model="checkboxCustom"
                        true-value="Yes"
                        false-value="No">
                        {{ checkboxCustom }}
                    </b-checkbox>
                </div>
                <div class="field">
                    <b-checkbox disabled>Disabled</b-checkbox>
                </div>`,
                code1: `
                export default {
                    data() {
                        return {
                            checkbox: true,
                            checkboxCustom: 'Yes'
                        }
                    }
                }`,
                template2: `
                <b-checkbox v-model="checkboxGroup"
                    native-value="Silver">
                    Silver
                </b-checkbox>
                <b-checkbox v-model="checkboxGroup"
                    native-value="Flint">
                    Flint
                </b-checkbox>
                <b-checkbox v-model="checkboxGroup"
                    native-value="Vane">
                    Vane
                </b-checkbox>
                <b-checkbox v-model="checkboxGroup"
                    native-value="Billy" disabled>
                    Billy
                </b-checkbox>`,
                code2: `
                export default {
                    data() {
                        return {
                            checkboxGroup: ['Flint']
                        }
                    }
                }`
            }
        }
    }
</script>
