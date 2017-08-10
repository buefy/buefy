<template>
    <div class="container">
        <h1 class="title is-spaced">Switch</h1>
        <h2 class="subtitle">Switch between two opposing states</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <div class="block">
                    <div class="field">
                        <b-switch>Default</b-switch>
                    </div>
                    <div class="field">
                        <b-switch v-model="isSwitched">
                            {{ isSwitched }}
                        </b-switch>
                    </div>
                    <div class="field">
                        <b-switch v-model="isSwitchedCustom"
                            true-value="Yes"
                            false-value="No">
                            {{ isSwitchedCustom }}
                        </b-switch>
                    </div>
                    <div class="field">
                        <b-switch disabled>Disabled</b-switch>
                    </div>
                </div>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code1 | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h2 class="title">Types</h2>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <b-switch :value="true">Default</b-switch>
                </div>
                <div class="field">
                    <b-switch :value="true" type="is-info">Info</b-switch>
                </div>
                <div class="field">
                    <b-switch :value="true" type="is-success">Success</b-switch>
                </div>
                <div class="field">
                    <b-switch :value="true" type="is-danger">Danger</b-switch>
                </div>
                <div class="field">
                    <b-switch :value="true" type="is-warning">Warning</b-switch>
                </div>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h2 class="title">Sizes</h2>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <b-switch size="is-small">Small</b-switch>
                </div>
                <div class="field">
                    <b-switch>Default</b-switch>
                </div>
                <div class="field">
                    <b-switch size="is-medium">Medium</b-switch>
                </div>
                <div class="field">
                    <b-switch size="is-large">Large</b-switch>
                </div>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
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
                isSwitched: false,
                isSwitchedCustom: 'Yes',
                props: [
                    {
                        name: '<code>type</code>',
                        description: 'Type (color) of the switch, optional',
                        type: 'String',
                        values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                            <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                            <code>is-warning</code>, <code>is-danger</code>,
                            and any other colors you've set in the <code>$colors</code> list on Sass`,
                        default: '—'
                    },
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
                    },
                    {
                        name: '<code>size</code>',
                        description: 'Size  of the control, optional',
                        type: 'String',
                        values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                        default: '—'
                    }
                ],
                events: [
                    {
                        name: '<code>input</code>',
                        description: 'Triggers when the value of the switch is changed',
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
                    <b-switch>Default</b-switch>
                </div>
                <div class="field">
                    <b-switch v-model="isSwitched">
                        {{ isSwitched }}
                    </b-switch>
                </div>
                <div class="field">
                    <b-switch v-model="isSwitchedCustom"
                        true-value="Yes"
                        false-value="No">
                        {{ isSwitchedCustom }}
                    </b-switch>
                </div>
                <div class="field">
                    <b-switch disabled>Disabled</b-switch>
                </div>`,
                code1: `
                export default {
                    data() {
                        return {
                            isSwitched: false,
                            isSwitchedCustom: 'Yes'
                        }
                    }
                }`,
                template2: `
                <div class="field">
                    <b-switch size="is-small">Small</b-switch>
                </div>
                <div class="field">
                    <b-switch>Default</b-switch>
                </div>
                <div class="field">
                    <b-switch size="is-medium">Medium</b-switch>
                </div>
                <div class="field">
                    <b-switch size="is-large">Large</b-switch>
                </div>`
            }
        }
    }
</script>
