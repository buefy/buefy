<template>
    <div class="container">
        <h1 class="title is-spaced">Radio</h1>
        <h2 class="subtitle">Radios are wrapped on a Radio Group</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <div class="block">
                    <b-radio-group v-model="radio">
                        <b-radio value="Flint">Flint</b-radio>
                        <b-radio value="Silver">Silver</b-radio>
                        <b-radio value="Jack">Jack</b-radio>
                        <b-radio value="Vane" disabled>Vane</b-radio>
                    </b-radio-group>
                </div>
                <p class="content"><b>Selection:</b> {{ radio }}</p>

                <h3 class="subtitle">Vertical example</h3>
                <b-radio-group v-model="radio">
                    <div class="field">
                        <b-radio value="Flint">Flint</b-radio>
                    </div>
                    <div class="field">
                        <b-radio value="Silver">Silver</b-radio>
                    </div>
                    <div class="field">
                        <b-radio value="Jack">Jack</b-radio>
                    </div>
                    <div class="field">
                        <b-radio value="Vane" disabled>Vane</b-radio>
                    </div>
                </b-radio-group>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code1 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Radio Button</h2>
        <div class="example">
            <b-radio-group v-model="radioButton">
                <b-radio-button type="is-danger" value="Nop">
                    <b-icon icon="clear"></b-icon> Nop
                </b-radio-button>

                <b-radio-button type="is-success" value="Yep">
                    <b-icon icon="done"></b-icon> Yep
                </b-radio-button>

                <b-radio-button value="Default">Default</b-radio-button>

                <b-radio-button value="Disabled" disabled>
                    Disabled
                </b-radio-button>
            </b-radio-group>

            <p class="content"><b>Selection:</b> {{ radioButton }}</p>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
        <pre v-highlight><code class="javascript">{{ code2 | pre }}</code></pre>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <h3 class="subtitle">Radio</h3>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="radioProps" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name"
                            :content="props.row.name">
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620"
                            :content="props.row.description">
                        </b-table-column>
                        <b-table-column field="type" label="Type"
                            :content="props.row.type">
                        </b-table-column>
                        <b-table-column field="values" label="Values"
                            :content="props.row.values">
                        </b-table-column>
                        <b-table-column field="default" label="Default"
                            :content="props.row.default">
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>

            <b-tab-item label="Events">
                <b-table :data="radioButtonProps" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name"
                            :content="props.row.name">
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620"
                            :content="props.row.description">
                        </b-table-column>
                        <b-table-column field="type" label="Type"
                            :content="props.row.type">
                        </b-table-column>
                        <b-table-column field="values" label="Values"
                            :content="props.row.values">
                        </b-table-column>
                        <b-table-column field="default" label="Default"
                            :content="props.row.default">
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>
        </b-tabs>

        <h3 class="subtitle">Radio Group</h3>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="radioGroupProps" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name"
                            :content="props.row.name">
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620"
                            :content="props.row.description">
                        </b-table-column>
                        <b-table-column field="type" label="Type"
                            :content="props.row.type">
                        </b-table-column>
                        <b-table-column field="values" label="Values"
                            :content="props.row.values">
                        </b-table-column>
                        <b-table-column field="default" label="Default"
                            :content="props.row.default">
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>

            <b-tab-item label="Events">
                <b-table :data="radioGroupEvents" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name"
                            :content="props.row.name">
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620"
                            :content="props.row.description">
                        </b-table-column>
                        <b-table-column field="parameters" label="Parameters"
                            :content="props.row.parameters">
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
                radio: 'Vane',
                radioButton: '',
                radioProps: [
                    {
                        name: '<code>value</code>',
                        description: 'Same as native <code>value</code>',
                        type: 'String, Number, Boolean',
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
                        name: '<code>name</code>',
                        description: 'Same as native <code>name</code>',
                        type: 'String',
                        values: '—',
                        default: '—'
                    }
                ],
                radioButtonProps: [
                    {
                        name: '<code>value</code>',
                        description: 'Same as native <code>value</code>',
                        type: 'String, Number, Boolean',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>type</code>',
                        description: 'Type (color) of the button <strong>when checked</strong>',
                        type: 'String',
                        values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                            <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                            <code>is-warning</code>, <code>is-danger</code>,
                            and any other colors you've set in the <code>$colors</code> list on Sass`,
                        default: '<code>is-primary</code>'
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
                radioGroupProps: [
                    {
                        name: '<code>v-model</code>',
                        description: 'Binding value',
                        type: 'String, Number, Boolean',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>button-size</code>',
                        description: 'Radio Buttons size, optional',
                        type: 'String',
                        values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                        default: '—'
                    }
                ],
                radioGroupEvents: [
                    {
                        name: '<code>change</code>',
                        description: 'Triggers when the value of any radio changes',
                        parameters: '<code>value:</code> value prop, <code>event: $event</code>'
                    }
                ],
                template1: `
                <div class="block">
                    <b-radio-group v-model="radio">
                        <b-radio value="Flint">Flint</b-radio>
                        <b-radio value="Silver">Silver</b-radio>
                        <b-radio value="Jack">Jack</b-radio>
                        <b-radio value="Vane" disabled>Vane</b-radio>
                    </b-radio-group>
                </div>
                <p class="content"><b>Selection:</b> {{ radio }}</p>

                <h3 class="subtitle">Vertical example</h3>
                <b-radio-group v-model="radio">
                    <div class="field">
                        <b-radio value="Flint">Flint</b-radio>
                    </div>
                    <div class="field">
                        <b-radio value="Silver">Silver</b-radio>
                    </div>
                    <div class="field">
                        <b-radio value="Jack">Jack</b-radio>
                    </div>
                    <div class="field">
                        <b-radio value="Vane" disabled>Vane</b-radio>
                    </div>
                </b-radio-group>`,
                code1: `
                export default {
                    data() {
                        return {
                            radio: 'Vane'
                        }
                    }
                }`,
                template2: `
                <b-radio-group v-model="radioButton">
                    <b-radio-button type="is-danger" value="Nop">
                        <b-icon icon="clear"></b-icon> Nop
                    </b-radio-button>

                    <b-radio-button type="is-success" value="Yep">
                        <b-icon icon="done"></b-icon> Yep
                    </b-radio-button>

                    <b-radio-button value="Default">Default</b-radio-button>

                    <b-radio-button value="Disabled" disabled>
                        Disabled
                    </b-radio-button>
                </b-radio-group>

                <p class="content"><b>Selection:</b> {{ radioButton }}</p>`,
                code2: `
                export default {
                    data() {
                        return {
                            radioButton: ''
                        }
                    }
                }`
            }
        }
    }
</script>
