<template>
    <div>
        <h1 class="title is-spaced">Select</h1>
        <h2 class="subtitle">
            Select an item in a dropdown list. Wrap it on a Field to use all the functionalities
        </h2>
        <hr>

        <div class="columns">
            <div class="column">
                <b-field label="Simple">
                    <b-select placeholder="Select a name">
                        <b-option
                            v-for="option in options"
                            :value="option.id"
                            :key="option.id">
                            {{ option.first_name }}
                        </b-option>
                    </b-select>
                </b-field>

                <b-field label="Grouped">
                    <b-select placeholder="Select a character">
                        <b-option group="Black Sails"
                            value="flint">
                            Flint
                        </b-option>
                        <b-option group="Black Sails"
                            value="silver">
                            Silver
                        </b-option>
                        <b-option group="Black Sails"
                            value="vane">
                            Vane
                        </b-option>
                        <b-option group="Black Sails"
                            value="billy">
                            Billy
                        </b-option>
                        <b-option group="Black Sails"
                            value="jack">
                            Jack
                        </b-option>

                        <b-option group="Breaking Bad"
                            value="heisenberg">
                            Heisenberg
                        </b-option>
                        <b-option group="Breaking Bad"
                            value="jesse">
                            Jesse
                        </b-option>
                        <b-option group="Breaking Bad"
                            value="saul">
                            Saul
                        </b-option>
                        <b-option group="Breaking Bad"
                            value="mike">
                            Mike
                        </b-option>

                        <b-option group="Game of Thrones"
                            value="tyrion-lannister">
                            Tyrion Lannister
                        </b-option>
                        <b-option group="Game of Thrones"
                            value="jamie-lannister">
                            Jamie Lannister
                        </b-option>
                        <b-option group="Game of Thrones"
                            value="daenerys-targaryen">
                            Daenerys Targaryen
                        </b-option>
                        <b-option group="Game of Thrones"
                            value="john-snow">
                            John Snow
                        </b-option>
                    </b-select>
                </b-field>

                <b-field
                    label="Error"
                    type="is-danger"
                    message="Something went wrong with this field">
                    <b-select placeholder="Select a character">
                        <b-option value="flint">Flint</b-option>
                        <b-option value="silver">Silver</b-option>
                    </b-select>
                </b-field>

                <b-field label="Required">
                    <b-select placeholder="Select a character" required>
                        <b-option value="flint">Flint</b-option>
                        <b-option value="silver">Silver</b-option>
                    </b-select>
                </b-field>

                <b-field label="Loading">
                    <b-select placeholder="Select a character" loading>
                        <b-option value="flint">Flint</b-option>
                        <b-option value="silver">Silver</b-option>
                    </b-select>
                </b-field>

                <b-field label="Disabled">
                    <b-select placeholder="Select a character" disabled>
                        <b-option value="flint">Flint</b-option>
                        <b-option value="silver">Silver</b-option>
                    </b-select>
                </b-field>

                <b-field label="Disabled option">
                    <b-select placeholder="Select a character">
                        <b-option value="flint">Flint</b-option>
                        <b-option value="silver" disabled>Silver</b-option>
                    </b-select>
                </b-field>

                <b-field
                    label="Expanded">
                    <b-select placeholder="Select a character" expanded>
                        <b-option value="flint">Flint</b-option>
                        <b-option value="silver">Silver</b-option>
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
                    <b-option value="flint">Flint</b-option>
                    <b-option value="silver">Silver</b-option>
                    <b-option value="vane">Vane</b-option>
                    <b-option value="billy">Billy</b-option>
                    <b-option value="jack">Jack</b-option>
                    <b-option value="heisenberg">Heisenberg</b-option>
                    <b-option value="jesse">Jesse</b-option>
                    <b-option value="saul">Saul</b-option>
                    <b-option value="mike">Mike</b-option>
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
            {{ select }}

            <b-field position="centered">
                <b-select
                    v-model="select"
                    placeholder="Select...">
                    <b-option value="flint">Flint</b-option>
                    <b-option value="silver">Silver</b-option>
                    <b-option value="vane">Vane</b-option>
                    <b-option value="billy">Billy</b-option>
                    <b-option value="jack">Jack</b-option>
                    <b-option value="heisenberg">Heisenberg</b-option>
                    <b-option value="jesse">Jesse</b-option>
                    <b-option value="saul">Saul</b-option>
                    <b-option value="mike">Mike</b-option>
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
                    <b-option value="flint">Flint</b-option>
                    <b-option value="silver">Silver</b-option>
                    <b-option value="vane">Vane</b-option>
                    <b-option value="billy">Billy</b-option>
                    <b-option value="jack">Jack</b-option>
                    <b-option value="heisenberg">Heisenberg</b-option>
                    <b-option value="jesse">Jesse</b-option>
                    <b-option value="saul">Saul</b-option>
                    <b-option value="mike">Mike</b-option>
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
                    <b-option value="flint">Flint</b-option>
                    <b-option value="silver">Silver</b-option>
                    <b-option value="vane">Vane</b-option>
                    <b-option value="billy">Billy</b-option>
                    <b-option value="jack">Jack</b-option>
                    <b-option value="heisenberg">Heisenberg</b-option>
                    <b-option value="jesse">Jesse</b-option>
                    <b-option value="saul">Saul</b-option>
                    <b-option value="mike">Mike</b-option>
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
        <pre v-highlight><code class="javascript">{{ code2 | pre }}</code></pre>

        <hr>
        <h2 class="title">Sizes</h2>
        <div class="columns">
            <div class="column">
                <b-field>
                    <b-select
                        placeholder="Small"
                        size="is-small"
                        expanded>
                        <b-option value="flint">Flint</b-option>
                        <b-option value="silver">Silver</b-option>
                    </b-select>
                </b-field>

                <b-field>
                    <b-select
                        placeholder="Default"
                        expanded>
                        <b-option value="flint">Flint</b-option>
                        <b-option value="silver">Silver</b-option>
                    </b-select>
                </b-field>

                <b-field>
                    <b-select
                        placeholder="Medium"
                        size="is-medium"
                        expanded>
                        <b-option value="flint">Flint</b-option>
                        <b-option value="silver">Silver</b-option>
                    </b-select>
                </b-field>

                <b-field>
                    <b-select
                        placeholder="Large"
                        size="is-large"
                        expanded>
                        <b-option value="flint">Flint</b-option>
                        <b-option value="silver">Silver</b-option>
                    </b-select>
                </b-field>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template4 | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h2 class="subtitle">Select properties</h2>
        <b-table
            :data="selectProps"
            default-sort="name"
            render-html>
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

        <h2 class="subtitle">Select events</h2>
        <b-table
            :data="selectEvents"
            default-sort="name"
            render-html>
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

        <h2 class="subtitle">Option properties</h2>
        <b-table
            :data="optionProps"
            default-sort="name"
            render-html>
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
                        name: '<code>lading</code>',
                        description: 'Add the loading state to the Select',
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
                optionProps: [
                    {
                        name: '<code>value</code>',
                        description: 'Same as native option <code>value</code>',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>group</code>',
                        description: 'Group a chunk of options with same group name together',
                        type: 'String',
                        values: '—',
                        default: '—'
                    }
                ],
                template1: `
                    <b-field label="Simple">
                        <b-select placeholder="Select a name">
                            <b-option
                                v-for="option in options"
                                :value="option.id"
                                :key="option.id">
                                {{ option.first_name }}
                            </b-option>
                        </b-select>
                    </b-field>

                    <b-field label="Grouped">
                        <b-select placeholder="Select a character">
                            <b-option group="Black Sails"
                                value="flint">
                                Flint
                            </b-option>
                            <b-option group="Black Sails"
                                value="silver">
                                Silver
                            </b-option>
                            <b-option group="Black Sails"
                                value="vane">
                                Vane
                            </b-option>
                            <b-option group="Black Sails"
                                value="billy">
                                Billy
                            </b-option>
                            <b-option group="Black Sails"
                                value="jack">
                                Jack
                            </b-option>

                            <b-option group="Breaking Bad"
                                value="heisenberg">
                                Heisenberg
                            </b-option>
                            <b-option group="Breaking Bad"
                                value="jesse">
                                Jesse
                            </b-option>
                            <b-option group="Breaking Bad"
                                value="saul">
                                Saul
                            </b-option>
                            <b-option group="Breaking Bad"
                                value="mike">
                                Mike
                            </b-option>

                            <b-option group="Game of Thrones"
                                value="tyrion-lannister">
                                Tyrion Lannister
                            </b-option>
                            <b-option group="Game of Thrones"
                                value="jamie-lannister">
                                Jamie Lannister
                            </b-option>
                            <b-option group="Game of Thrones"
                                value="daenerys-targaryen">
                                Daenerys Targaryen
                            </b-option>
                            <b-option group="Game of Thrones"
                                value="john-snow">
                                John Snow
                            </b-option>
                        </b-select>
                    </b-field>

                    <b-field
                        label="Error"
                        type="is-danger"
                        message="Something went wrong with this field">
                        <b-select placeholder="Select a character">
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
                        </b-select>
                    </b-field>

                    <b-field label="Required">
                        <b-select placeholder="Select a character" required>
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
                        </b-select>
                    </b-field>

                    <b-field label="Loading">
                        <b-select placeholder="Select a character" loading>
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
                        </b-select>
                    </b-field>

                    <b-field label="Disabled">
                        <b-select placeholder="Select a character" disabled>
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
                        </b-select>
                    </b-field>

                    <b-field
                        label="Expanded">
                        <b-select placeholder="Select a character" expanded>
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
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
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
                            <b-option value="vane">Vane</b-option>
                            <b-option value="billy">Billy</b-option>
                            <b-option value="jack">Jack</b-option>
                            <b-option value="heisenberg">Heisenberg</b-option>
                            <b-option value="jesse">Jesse</b-option>
                            <b-option value="saul">Saul</b-option>
                            <b-option value="mike">Mike</b-option>
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
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
                            <b-option value="vane">Vane</b-option>
                            <b-option value="billy">Billy</b-option>
                            <b-option value="jack">Jack</b-option>
                            <b-option value="heisenberg">Heisenberg</b-option>
                            <b-option value="jesse">Jesse</b-option>
                            <b-option value="saul">Saul</b-option>
                            <b-option value="mike">Mike</b-option>
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
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
                            <b-option value="vane">Vane</b-option>
                            <b-option value="billy">Billy</b-option>
                            <b-option value="jack">Jack</b-option>
                            <b-option value="heisenberg">Heisenberg</b-option>
                            <b-option value="jesse">Jesse</b-option>
                            <b-option value="saul">Saul</b-option>
                            <b-option value="mike">Mike</b-option>
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
                                select: null
                            }
                        }
                    }`,
                template3: `
                    <b-field grouped>
                        <b-select
                            v-model="select"
                            placeholder="Select..."
                            expanded>
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
                            <b-option value="vane">Vane</b-option>
                            <b-option value="billy">Billy</b-option>
                            <b-option value="jack">Jack</b-option>
                            <b-option value="heisenberg">Heisenberg</b-option>
                            <b-option value="jesse">Jesse</b-option>
                            <b-option value="saul">Saul</b-option>
                            <b-option value="mike">Mike</b-option>
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
                    <b-field>
                        <b-select
                            placeholder="Small"
                            size="is-small"
                            expanded>
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
                        </b-select>
                    </b-field>

                    <b-field>
                        <b-select
                            placeholder="Default"
                            expanded>
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
                        </b-select>
                    </b-field>

                    <b-field>
                        <b-select
                            placeholder="Medium"
                            size="is-medium"
                            expanded>
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
                        </b-select>
                    </b-field>

                    <b-field>
                        <b-select
                            placeholder="Large"
                            size="is-large"
                            expanded>
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
                        </b-select>
                    </b-field>`
            }
        }
    }
</script>
