<template>
    <div>
        <h1 class="title is-spaced">Select</h1>
        <h2 class="subtitle">
            Select an item in a dropdown list. Wrap it on a Field to use all the functionalities.
            They also look like a modal when you're on tablet or smartphone
        </h2>
        <hr>

        <div class="columns">
            <div class="column">
                <b-field label="Simple">
                    <b-select placeholder="Select a character">
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
                </b-field>

                <b-field label="Grouped">
                    <b-select placeholder="Select a character">
                        <b-option group="Black Sails" value="flint">
                            Flint
                        </b-option>
                        <b-option group="Black Sails" value="silver">
                            Silver
                        </b-option>
                        <b-option group="Black Sails" value="vane">
                            Vane
                        </b-option>
                        <b-option group="Black Sails" value="billy">
                            Billy
                        </b-option>
                        <b-option group="Black Sails" value="jack">
                            Jack
                        </b-option>

                        <b-option group="Breaking Bad" value="heisenberg">
                            Heisenberg
                        </b-option>
                        <b-option group="Breaking Bad" value="jesse">
                            Jesse
                        </b-option>
                        <b-option group="Breaking Bad" value="saul">
                            Saul
                        </b-option>
                        <b-option group="Breaking Bad" value="mike">
                            Mike
                        </b-option>

                        <b-option group="Game of Thrones" value="tyrion-lannister">
                            Tyrion Lannister
                        </b-option>
                        <b-option group="Game of Thrones" value="jamie-lannister">
                            Jamie Lannister
                        </b-option>
                        <b-option group="Game of Thrones" value="daenerys-targaryen">
                            Daenerys Targaryen
                        </b-option>
                        <b-option group="Game of Thrones" value="john-snow">
                            John Snow
                        </b-option>
                    </b-select>
                </b-field>

                <b-field
                    label="Searchable">
                    <b-select placeholder="Type here" searchable>
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
                </b-field>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Addons</h2>
        <div class="columns">
            <div class="column">
                <b-field>
                    <b-select
                        v-model="select"
                        placeholder="Select..."
                        searchable
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
                            @click="select = null">
                            Clear
                        </button>
                    </p>
                    <p class="control">
                        <button
                            class="button"
                            @click="select = 'heisenberg'">
                            Set Heisenberg
                        </button>
                    </p>
                </b-field>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code2 | pre }}</code></pre>
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
                        searchable
                        expanded>
                        <b-option value="flint">Flint</b-option>
                        <b-option value="silver">Silver</b-option>
                    </b-select>
                </b-field>

                <b-field>
                    <b-select
                        placeholder="Default"
                        searchable
                        expanded>
                        <b-option value="flint">Flint</b-option>
                        <b-option value="silver">Silver</b-option>
                    </b-select>
                </b-field>

                <b-field>
                    <b-select
                        placeholder="Medium"
                        size="is-medium"
                        searchable
                        expanded>
                        <b-option value="flint">Flint</b-option>
                        <b-option value="silver">Silver</b-option>
                    </b-select>
                </b-field>

                <b-field>
                    <b-select
                        placeholder="Large"
                        size="is-large"
                        searchable
                        expanded>
                        <b-option value="flint">Flint</b-option>
                        <b-option value="silver">Silver</b-option>
                    </b-select>
                </b-field>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template3 | pre }}</code></pre>
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
    export default {
        data() {
            return {
                select: null,
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
                        name: '<code>searchable</code>',
                        description: 'Options can be searchable',
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
                        <b-select placeholder="Select a character">
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
                    </b-field>

                    <b-field label="Grouped">
                        <b-select placeholder="Select a character">
                            <b-option group="Black Sails" value="flint">
                                Flint
                            </b-option>
                            <b-option group="Black Sails" value="silver">
                                Silver
                            </b-option>
                            <b-option group="Black Sails" value="vane">
                                Vane
                            </b-option>
                            <b-option group="Black Sails" value="billy">
                                Billy
                            </b-option>
                            <b-option group="Black Sails" value="jack">
                                Jack
                            </b-option>

                            <b-option group="Breaking Bad" value="heisenberg">
                                Heisenberg
                            </b-option>
                            <b-option group="Breaking Bad" value="jesse">
                                Jesse
                            </b-option>
                            <b-option group="Breaking Bad" value="saul">
                                Saul
                            </b-option>
                            <b-option group="Breaking Bad" value="mike">
                                Mike
                            </b-option>

                            <b-option group="Game of Thrones" value="tyrion-lannister">
                                Tyrion Lannister
                            </b-option>
                            <b-option group="Game of Thrones" value="jamie-lannister">
                                Jamie Lannister
                            </b-option>
                            <b-option group="Game of Thrones" value="daenerys-targaryen">
                                Daenerys Targaryen
                            </b-option>
                            <b-option group="Game of Thrones" value="john-snow">
                                John Snow
                            </b-option>
                        </b-select>
                    </b-field>

                    <b-field
                        label="Searchable">
                        <b-select placeholder="Select a character" searchable>
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

                template2: `
                    <b-field>
                        <b-select
                            v-model="select"
                            placeholder="Selecione"
                            searchable
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
                                @click="select = null">
                                Clear
                            </button>
                        </p>
                        <p class="control">
                            <button
                                class="button"
                                @click="select = 'heisenberg'">
                                Set Heisenberg
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
                    <b-field>
                        <b-select
                            placeholder="Small"
                            size="is-small"
                            searchable
                            expanded>
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
                        </b-select>
                    </b-field>

                    <b-field>
                        <b-select
                            placeholder="Default"
                            searchable
                            expanded>
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
                        </b-select>
                    </b-field>

                    <b-field>
                        <b-select
                            placeholder="Medium"
                            size="is-medium"
                            searchable
                            expanded>
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
                        </b-select>
                    </b-field>

                    <b-field>
                        <b-select
                            placeholder="Large"
                            size="is-large"
                            searchable
                            expanded>
                            <b-option value="flint">Flint</b-option>
                            <b-option value="silver">Silver</b-option>
                        </b-select>
                    </b-field>`
            }
        }
    }
</script>
