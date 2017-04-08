<template>
    <div>
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

                <h3 class="subtitle">On / Off style</h3>
                <div class="field">
                    <b-switch on-off>On / Off</b-switch>
                </div>
                <div class="field">
                    <b-switch on-off disabled>On / Off Disabled</b-switch>
                </div>
                <div class="field">
                    <b-switch on-off disabled checked>On / Off Disabled Checked</b-switch>
                </div>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template | pre }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h2 class="subtitle">Properties</h2>
        <b-table
            :data="props"
            default-sort="name"
            html>
            <b-table-column
                field="name"
                label="Name">
            </b-table-column>
            <b-table-column
                field="description"
                label="Description"
                width="620">
            </b-table-column>
            <b-table-column
                field="type"
                label="Type">
            </b-table-column>
            <b-table-column
                field="values"
                label="Values">
            </b-table-column>
            <b-table-column
                field="default"
                label="Default">
            </b-table-column>
        </b-table>

        <h2 class="subtitle">Events</h2>
        <b-table
            :data="events"
            default-sort="name"
            html>
            <b-table-column
                field="name"
                label="Name">
            </b-table-column>
            <b-table-column
                field="description"
                label="Description"
                width="620">
            </b-table-column>
            <b-table-column
                field="parameters"
                label="Parameters">
            </b-table-column>
        </b-table>

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
                        name: '<code>onOff</code>',
                        description: 'Styles the switch as on/off',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
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
                    </div>

                    <h3 class="subtitle">On / Off style</h3>
                    <div class="field">
                        <b-switch on-off>On / Off</b-switch>
                    </div>
                    <div class="field">
                        <b-switch on-off disabled>On / Off Disabled</b-switch>
                    </div>
                    <div class="field">
                        <b-switch on-off disabled checked>On / Off Disabled Checked</b-switch>
                    </div>`,
                code: `
                export default {
                    data() {
                        return {
                            isSwitched: true
                        }
                    }
                }`
            }
        }
    }
</script>
