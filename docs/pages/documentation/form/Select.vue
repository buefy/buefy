<template>
    <div class="container">
        <h1 class="title is-spaced">Select</h1>
        <h2 class="subtitle">
            Select an item in a dropdown list.
            Use with <strong><router-link to="/documentation/field">Field</router-link></strong> to access all functionalities
        </h2>
        <hr>

        <div class="columns">
            <div class="column">
                <b-field label="Simple">
                    <b-select placeholder="Select a name">
                        <option
                            v-for="option in options"
                            :value="option.id"
                            :key="option.id">
                            {{ option.user.first_name }}
                        </option>
                    </b-select>
                </b-field>

                <b-field label="Grouped">
                    <b-select placeholder="Select a character" icon="person">
                        <optgroup label="Black Sails">
                            <option value="flint">Flint</option>
                            <option value="silver">Silver</option>
                            <option value="vane">Vane</option>
                            <option value="billy">Billy</option>
                            <option value="jack">Jack</option>
                        </optgroup>

                        <optgroup label="Breaking Bad">
                            <option value="heisenberg">Heisenberg</option>
                            <option value="jesse">Jesse</option>
                            <option value="saul">Saul</option>
                            <option value="mike">Mike</option>
                        </optgroup>

                        <optgroup label="Game of Thrones">
                            <option value="tyrion-lannister">Tyrion Lannister</option>
                            <option value="jamie-lannister">Jamie Lannister</option>
                            <option value="daenerys-targaryen">Daenerys Targaryen</option>
                            <option value="john-snow">John Snow</option>
                        </optgroup>
                    </b-select>
                </b-field>

                <b-field
                    label="Error"
                    type="is-danger"
                    message="Something went wrong with this field">
                    <b-select placeholder="Select a character">
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>

                <b-field label="Required">
                    <b-select placeholder="Select a character" required>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>

                <b-field label="Loading">
                    <b-select placeholder="Select a character" loading>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>

                <b-field label="Disabled">
                    <b-select placeholder="Select a character" disabled>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>

                <b-field label="Disabled option">
                    <b-select placeholder="Select a character">
                        <option value="flint">Flint</option>
                        <option value="silver" disabled>Silver</option>
                    </b-select>
                </b-field>

                <b-field
                    label="Expanded">
                    <b-select placeholder="Select a character" expanded>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code1 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <span class="tag is-success field">New!</span> <span class="tag is-info">v0.4.1</span>
        <h2 class="title">Icons</h2>
        <div class="columns">
            <div class="column">
                <h3 class="subtitle">With Material Design Icons</h3>
                <b-field>
                    <b-select placeholder="Country" icon="public">
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </b-select>
                </b-field>

                <b-field>
                    <b-select placeholder="Client" icon="person">
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </b-select>
                </b-field>

                <h3 class="subtitle">With FontAwesome</h3>
                <b-field>
                    <b-select
                        placeholder="Country"
                        icon="globe"
                        icon-pack="fa">
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </b-select>
                </b-field>

                <b-field>
                    <b-select
                        placeholder="Client"
                        icon="user"
                        icon-pack="fa">
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </b-select>
                </b-field>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title is-spaced">Selection</h2>
        <div class="columns">
            <div class="column">
                <b-field>
                    <b-select
                        v-model="select"
                        placeholder="Select...">
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                        <option value="vane">Vane</option>
                        <option value="billy">Billy</option>
                        <option value="jack">Jack</option>
                        <option value="heisenberg">Heisenberg</option>
                        <option value="jesse">Jesse</option>
                        <option value="saul">Saul</option>
                        <option value="mike">Mike</option>
                    </b-select>
                </b-field>

                <button class="button" @click="select = ''">
                    Clear
                </button>

                <button class="button" @click="select = 'flint'">
                    Set Flint
                </button>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template3 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Sizes</h2>
        <div class="columns">
            <div class="column">
                <b-field>
                    <b-select
                        placeholder="Small"
                        size="is-small"
                        expanded>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>

                <b-field>
                    <b-select
                        placeholder="Default"
                        expanded>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>

                <b-field>
                    <b-select
                        placeholder="Medium"
                        size="is-medium"
                        expanded>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>

                <b-field>
                    <b-select
                        placeholder="Large"
                        size="is-large"
                        expanded>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template4 | pre }}</code></pre>
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

            <b-tab-item label="Methods">
                <b-table :data="methods" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
                        </b-table-column>
                        <b-table-column field="return" label="Return">
                            <span v-html="props.row.return"></span>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>
        </b-tabs>
    </div>
</template>

<script>
    import options from '../../../assets/data_test.json'

    export default {
        data() {
            return {
                options: options,
                select: 'vane',
                props: [
                    {
                        name: '<code>v-model</code>',
                        description: 'Binding value',
                        type: 'Any',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>size</code>',
                        description: 'Size of the select, optional',
                        type: 'String',
                        values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                        default: '—'
                    },
                    {
                        name: '<code>placeholder</code>',
                        description: 'Text when nothing is selected',
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
                        name: '<code>disabled</code>',
                        description: 'Same as native <code>disabled</code>',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>required</code>',
                        description: 'Same as native <code>required</code>',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>loading</code>',
                        description: 'Add the loading state to the Select',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>expanded</code>',
                        description: 'Select will be expanded (full-width)',
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
                    }
                ],
                events: [
                    {
                        name: '<code>change</code>',
                        description: 'Triggers when the selection is changed',
                        parameters: '<code>value: String</code>'
                    },
                    {
                        name: '<code>focus</code>',
                        description: 'Triggers when the select is focused',
                        parameters: '<code>event: $event</code>'
                    },
                    {
                        name: '<code>blur</code>',
                        description: 'Triggers when the select has lost focus',
                        parameters: '<code>event: $event</code>'
                    }
                ],
                methods: [
                    {
                        name: '<code>checkHtml5Validity</code>',
                        description: 'Check validation of HTML5 (add the message and type/color), also updates the <code>isValid</code> property',
                        return: '<code>isValid: Boolean</code>'
                    },
                    {
                        name: '<code>focus</code>',
                        description: 'Set focus',
                        return: '—'
                    }
                ],
                template1: `
                <b-field label="Simple">
                    <b-select placeholder="Select a name">
                        <option
                            v-for="option in options"
                            :value="option.id"
                            :key="option.id">
                            {{ option.first_name }}
                        </option>
                    </b-select>
                </b-field>

                <b-field label="Grouped">
                    <b-select placeholder="Select a character">
                        <optgroup label="Black Sails">
                            <option value="flint">Flint</option>
                            <option value="silver">Silver</option>
                            <option value="vane">Vane</option>
                            <option value="billy">Billy</option>
                            <option value="jack">Jack</option>
                        </optgroup>

                        <optgroup label="Breaking Bad">
                            <option value="heisenberg">Heisenberg</option>
                            <option value="jesse">Jesse</option>
                            <option value="saul">Saul</option>
                            <option value="mike">Mike</option>
                        </optgroup>

                        <optgroup label="Game of Thrones">
                            <option value="tyrion-lannister">Tyrion Lannister</option>
                            <option value="jamie-lannister">Jamie Lannister</option>
                            <option value="daenerys-targaryen">Daenerys Targaryen</option>
                            <option value="john-snow">John Snow</option>
                        </optgroup>
                    </b-select>
                </b-field>

                <b-field
                    label="Error"
                    type="is-danger"
                    message="Something went wrong with this field">
                    <b-select placeholder="Select a character">
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>

                <b-field label="Required">
                    <b-select placeholder="Select a character" required>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>

                <b-field label="Loading">
                    <b-select placeholder="Select a character" loading>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>

                <b-field label="Disabled">
                    <b-select placeholder="Select a character" disabled>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>

                <b-field
                    label="Expanded">
                    <b-select placeholder="Select a character" expanded>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>`,
                code1: `
                export default {
                    data() {
                        return {
                            options: [
                                {"id":1,"first_name":"Jesse"},
                                {"id":2,"first_name":"John"},
                                {"id":3,"first_name":"Tina"},
                                {"id":4,"first_name":"Clarence"},
                                {"id":5,"first_name":"Anne"},
                                // ...
                            ]
                        }
                    }
                }`,
                template2: `
                <h3 class="subtitle">With Material Design Icons</h3>
                <b-field>
                    <b-select placeholder="Country" icon="public">
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </b-select>
                </b-field>

                <b-field>
                    <b-select placeholder="Client" icon="person">
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </b-select>
                </b-field>

                <h3 class="subtitle">With FontAwesome</h3>
                <b-field>
                    <b-select
                        placeholder="Country"
                        icon="globe"
                        icon-pack="fa">
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </b-select>
                </b-field>

                <b-field>
                    <b-select
                        placeholder="Client"
                        icon="user"
                        icon-pack="fa">
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </b-select>
                </b-field>`,
                template3: `
                <b-field>
                    <b-select
                        v-model="select"
                        placeholder="Select...">
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                        <option value="vane">Vane</option>
                        <option value="billy">Billy</option>
                        <option value="jack">Jack</option>
                        <option value="heisenberg">Heisenberg</option>
                        <option value="jesse">Jesse</option>
                        <option value="saul">Saul</option>
                        <option value="mike">Mike</option>
                    </b-select>
                </b-field>

                <button class="button" @click="select = ''">
                    Clear
                </button>

                <button class="button" @click="select = 'flint'">
                    Set Flint
                </button>`,
                template4: `
                <b-field>
                    <b-select
                        placeholder="Small"
                        size="is-small"
                        expanded>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>

                <b-field>
                    <b-select
                        placeholder="Default"
                        expanded>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>

                <b-field>
                    <b-select
                        placeholder="Medium"
                        size="is-medium"
                        expanded>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>

                <b-field>
                    <b-select
                        placeholder="Large"
                        size="is-large"
                        expanded>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>`
            }
        }
    }
</script>
