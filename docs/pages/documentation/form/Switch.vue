<template>
    <div class="container">
        <h1 class="title is-spaced">Switch</h1>
        <h2 class="subtitle">Switch between two opposing states</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <div class="block">
                    <b-switch>Default</b-switch>
                    <b-switch v-model="isSwitched">{{ isSwitched }}</b-switch>
                    <b-switch disabled>Disabled</b-switch>
                    <b-switch disabled checked>Disabled Checked</b-switch>
                </div>

                <h3 class="subtitle">Vertical example</h3>
                <div class="block">
                    <div class="field">
                        <b-switch>Default</b-switch>
                    </div>
                    <div class="field">
                        <b-switch v-model="isSwitched">{{ isSwitched }}</b-switch>
                    </div>
                    <div class="field">
                        <b-switch disabled>Disabled</b-switch>
                    </div>
                    <div class="field">
                        <b-switch disabled checked>Disabled Checked</b-switch>
                    </div>
                </div>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template | pre }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code | pre }}</code></pre>
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
                <pre class="content" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
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
                isSwitched: true,
                props: [
                    {
                        name: '<code>v-model</code>',
                        description: 'Binding value',
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
                    },
                    {
                        name: '<code>checked</code>',
                        description: 'Same as native <code>checked</code>',
                        type: 'Boolean',
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
                        name: '<code>size</code>',
                        description: 'Optional, size  of the control',
                        type: 'String',
                        values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                        default: '—'
                    }
                ],
                events: [
                    {
                        name: '<code>change</code>',
                        description: 'Triggers when the value of switch changes',
                        parameters: '<code>value: Boolean</code>, <code>event: $event</code>'
                    }
                ],
                template: `
                <div class="block">
                    <b-switch>Default</b-switch>
                    <b-switch v-model="isSwitched">{{ isSwitched }}</b-switch>
                    <b-switch disabled>Disabled</b-switch>
                    <b-switch disabled checked>Disabled Checked</b-switch>
                </div>

                <h3 class="subtitle">Vertical example</h3>
                <div class="block">
                    <div class="field">
                        <b-switch>Default</b-switch>
                    </div>
                    <div class="field">
                        <b-switch v-model="isSwitched">{{ isSwitched }}</b-switch>
                    </div>
                    <div class="field">
                        <b-switch disabled>Disabled</b-switch>
                    </div>
                    <div class="field">
                        <b-switch disabled checked>Disabled Checked</b-switch>
                    </div>
                </div>`,
                code: `
                export default {
                    data() {
                        return {
                            isSwitched: true
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
