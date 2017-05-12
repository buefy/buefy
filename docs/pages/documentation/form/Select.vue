<template>
    <div class="container">
        <h1 class="title is-spaced">Select</h1>
        <h2 class="subtitle">
            Select an item in a dropdown list. Wrap it on a Field to use all the functionalities
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
                <pre class="content" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code1 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title is-spaced">Addons</h2>
        <h3 class="subtitle">Selects, Inputs, Dropdowns and <code>.control</code> elements are automatically unified when inside a Field</h3>
        <div class="example">
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
                <p class="control">
                    <button
                        class="button is-danger"
                        @click="select = ''">
                        <b-icon icon="clear"></b-icon>
                    </button>
                </p>
                <p class="control">
                    <button
                        class="button"
                        @click="select = 'flint'">
                        Set Flint
                    </button>
                </p>
            </b-field>

            <b-field position="centered">
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
                <p class="control">
                    <button
                        class="button is-dark"
                        @click="select = ''">
                        <b-icon icon="clear"></b-icon>
                    </button>
                </p>
                <p class="control">
                    <button
                        class="button"
                        @click="select = 'flint'">
                        Set Flint
                    </button>
                </p>
            </b-field>

            <b-field position="right">
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
                <p class="control">
                    <button
                        class="button is-primary"
                        @click="select = ''">
                        <b-icon icon="clear"></b-icon>
                    </button>
                </p>
                <p class="control">
                    <button
                        class="button"
                        @click="select = 'flint'">
                        Set Flint
                    </button>
                </p>
            </b-field>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
        <pre v-highlight><code class="javascript">{{ code2 | pre }}</code></pre>

        <hr>
        <h2 class="title is-spaced">Grouped</h2>
        <h3 class="subtitle">Or grouped horizontally with the <code>grouped</code> property</h3>
        <p class="content">Note that you have to specify which one will be <code>expanded</code>.</p>
        <div class="example">
            <b-field grouped>
                <b-select
                    v-model="select"
                    placeholder="Select..."
                    expanded>
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
                <p class="control">
                    <button
                        class="button"
                        @click="select = ''">
                        <b-icon icon="clear"></b-icon>
                    </button>
                </p>
                <p class="control">
                    <button
                        class="button"
                        @click="select = 'flint'">
                        Set Flint
                    </button>
                </p>
            </b-field>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template3 | pre }}</code></pre>
        <pre class="content" v-highlight><code class="javascript">{{ code2 | pre }}</code></pre>

        <span class="tag is-success">New!</span> <span class="tag is-info">v0.3.1</span>
        <h3 class="subtitle is-inline-flex">Nested Fields can be grouped as well</h3>
        <div class="example">
            <b-field grouped>
                <b-field label="Character" expanded>
                    <b-select placeholder="Select..." expanded>
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                    </b-select>
                </b-field>
                <b-field label="Name" expanded>
                    <b-select placeholder="Select..." expanded>
                        <option value="john">John</option>
                        <option value="brok">Brok</option>
                    </b-select>
                </b-field>
                <b-field label="Email">
                    <b-input></b-input>
                </b-field>
            </b-field>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template4 | pre }}</code></pre>

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
                <pre class="content" v-highlight><code class="html">{{ template5 | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h2 class="subtitle">Select properties</h2>
        <b-table :data="selectProps" default-sort="name">
            <template scope="props">
                <b-table-column field="name" label="Name"
                    v-html="props.row.name">
                </b-table-column>
                <b-table-column field="description" label="Description" width="620"
                    v-html="props.row.description">
                </b-table-column>
                <b-table-column field="type" label="Type"
                    v-html="props.row.type">
                </b-table-column>
                <b-table-column field="values" label="Values"
                    v-html="props.row.values">
                </b-table-column>
                <b-table-column field="default" label="Default"
                    v-html="props.row.default">
                </b-table-column>
            </template>
        </b-table>

        <h2 class="subtitle">Select events</h2>
        <b-table :data="selectEvents" default-sort="name">
            <template scope="props">
                <b-table-column field="name" label="Name"
                    v-html="props.row.name">
                </b-table-column>
                <b-table-column field="description" label="Description" width="620"
                    v-html="props.row.description">
                </b-table-column>
                <b-table-column field="parameters" label="Parameters"
                    v-html="props.row.parameters">
                </b-table-column>
            </template>
        </b-table>

    </div>
</template>

<script>
    import options from '../../../assets/data_test.json'

    export default {
        data() {
            return {
                options: options,
                select: 'vane',
                selectProps: [
                    {
                        name: '<code>v-model</code>',
                        description: 'Binding value',
                        type: 'String',
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
                    }
                ],
                selectEvents: [
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
                                ...
                            ]
                        }
                    }
                }`,
                template2: `
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
                    <p class="control">
                        <button
                            class="button is-danger"
                            @click="select = ''">
                            <b-icon icon="clear"></b-icon>
                        </button>
                    </p>
                    <p class="control">
                        <button
                            class="button"
                            @click="select = 'flint'">
                            Set Flint
                        </button>
                    </p>
                </b-field>

                <b-field position="centered">
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
                    <p class="control">
                        <button
                            class="button is-dark"
                            @click="select = ''">
                            <b-icon icon="clear"></b-icon>
                        </button>
                    </p>
                    <p class="control">
                        <button
                            class="button"
                            @click="select = 'flint'">
                            Set Flint
                        </button>
                    </p>
                </b-field>

                <b-field position="right">
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
                    <p class="control">
                        <button
                            class="button is-primary"
                            @click="select = ''">
                            <b-icon icon="clear"></b-icon>
                        </button>
                    </p>
                    <p class="control">
                        <button
                            class="button"
                            @click="select = 'flint'">
                            Set Flint
                        </button>
                    </p>
                </b-field>`,
                code2: `
                export default {
                    data() {
                        return {
                            select: ''
                        }
                    }
                }`,
                template3: `
                <b-field grouped>
                    <b-select
                        v-model="select"
                        placeholder="Select..."
                        expanded>
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
                    <p class="control">
                        <button
                            class="button"
                            @click="select = ''">
                            <b-icon icon="clear"></b-icon>
                        </button>
                    </p>
                    <p class="control">
                        <button
                            class="button"
                            @click="select = 'flint'">
                            Set Flint
                        </button>
                    </p>
                </b-field>`,
                template4: `
                <b-field grouped>
                    <b-field label="Character" expanded>
                        <b-select placeholder="Select..." expanded>
                            <option value="flint">Flint</option>
                            <option value="silver">Silver</option>
                        </b-select>
                    </b-field>
                    <b-field label="Name" expanded>
                        <b-select placeholder="Select..." expanded>
                            <option value="john">John</option>
                            <option value="brok">Brok</option>
                        </b-select>
                    </b-field>
                    <b-field label="Email">
                        <b-input></b-input>
                    </b-field>
                </b-field>`,
                template5: `
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
