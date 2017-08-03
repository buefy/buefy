<template>
    <div class="container">
        <h1 class="title is-spaced">Input</h1>
        <h2 class="subtitle">
            Get user Input.
            Use with <strong><router-link to="/documentation/field">Field</router-link></strong> to access all functionalities
        </h2>
        <hr>

        <div class="columns">
            <div class="column">
                <b-field label="Name">
                    <b-input value="John Silver"></b-input>
                </b-field>

                <b-field label="Email"
                    type="is-danger"
                    message="This email is invalid">
                    <b-input type="email"
                        value="john@"
                        maxlength="30">
                    </b-input>
                </b-field>

                <b-field label="Username"
                    type="is-success"
                    message="This username is available">
                    <b-input value="johnsilver" maxlength="30"></b-input>
                </b-field>

                <b-field label="Password">
                    <b-input type="password"
                        value="iwantmytreasure"
                        password-reveal>
                    </b-input>
                </b-field>

                <b-field label="Message">
                    <b-input maxlength="200" type="textarea"></b-input>
                </b-field>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Types & States</h2>
        <div class="columns">
            <div class="column">
                <b-field>
                    <b-input placeholder="No label"></b-input>
                </b-field>

                <b-field label="Label">
                    <b-input placeholder="Text input"></b-input>
                </b-field>

                <b-field label="Success" type="is-success">
                    <b-input placeholder="Success"></b-input>
                </b-field>

                <b-field label="Error"
                    type="is-danger"
                    message="You can have a message too">
                    <b-input placeholder="Error"></b-input>
                </b-field>

                <b-field label="Info" type="is-info">
                    <b-input placeholder="Info"></b-input>
                </b-field>

                <b-field label="Warning" type="is-warning">
                    <b-input placeholder="Warning"></b-input>
                </b-field>

                <b-field label="Disabled">
                    <b-input placeholder="Disabled" disabled></b-input>
                </b-field>

                <b-field label="Loading">
                    <b-input placeholder="Loading" loading></b-input>
                </b-field>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Icons</h2>
        <div class="columns">
            <div class="column">
                <h3 class="subtitle">With Material Design Icons</h3>
                <b-field>
                    <b-input placeholder="Search..."
                        type="search"
                        icon="search">
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Email"
                        type="email"
                        icon="email">
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Credit card"
                        icon="payment">
                    </b-input>
                </b-field>

                <h3 class="subtitle">With FontAwesome</h3>
                <b-field>
                    <b-input placeholder="Search..."
                        type="search"
                        icon-pack="fa"
                        icon="search">
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Email"
                        type="email"
                        icon-pack="fa"
                        icon="envelope">
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Credit card"
                        icon-pack="fa"
                        icon="credit-card">
                    </b-input>
                </b-field>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template3 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title is-spaced">Validation</h2>
        <h3 class="subtitle">Automatic HTML5 validation on-blur</h3>
        <div class="columns">
            <div class="column">
                <b-field>
                    <b-input placeholder="Email" type="email"></b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Number"
                        type="number"
                        min="10"
                        max="20">
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="URL" type="url"></b-input>
                </b-field>

                <b-field>
                    <b-input type="textarea"
                        minlength="10"
                        maxlength="100"
                        placeholder="Maxlength automatically counts characters">
                    </b-input>
                </b-field>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template4 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Password</h2>
        <div class="columns">
            <div class="column">
                <b-field>
                    <b-input type="password"
                        placeholder="Regular password input">
                    </b-input>
                </b-field>

                <b-field>
                    <b-input type="password"
                        placeholder="Password reveal input"
                        password-reveal>
                    </b-input>
                </b-field>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template5 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Sizes</h2>
        <div class="columns">
            <div class="column">
                <b-field>
                    <b-input placeholder="Small"
                        size="is-small"
                        icon="person">
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Default"
                        icon="person">
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Medium"
                        size="is-medium"
                        icon="person">
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Large"
                        size="is-large"
                        icon="person">
                    </b-input>
                </b-field>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template6 | pre }}</code></pre>
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
    export default {
        data() {
            return {
                props: [
                    {
                        name: '<code>v-model</code>',
                        description: 'Binding value',
                        type: 'String, Number',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>type</code>',
                        description: 'Input type, like native',
                        type: 'String',
                        values: 'Any native input type, and <code>textarea</code>',
                        default: '<code>text</code>'
                    },
                    {
                        name: '<code>size</code>',
                        description: 'Vertical size of input, optional',
                        type: 'String',
                        values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                        default: '—'
                    },
                    {
                        name: '<code>expanded</code>',
                        description: 'Makes input full width when inside a grouped or addon field',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>password-reveal</code>',
                        description: 'Add the reveal password functionality',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>loading</code>',
                        description: 'Add the loading state to the input',
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
                    },
                    {
                        name: '<code>maxlength</code>',
                        description: 'Same as native <code>maxlength</code>, plus character counter',
                        type: 'String, Number',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: 'Any native attribute',
                        description: '—',
                        type: '—',
                        values: '—',
                        default: '—'
                    }
                ],
                events: [
                    {
                        name: '<code>input</code>',
                        description: 'Triggers when value is changed',
                        parameters: '<code>value: String|Number</code>'
                    },
                    {
                        name: 'Any native event',
                        description: 'Listen to any native event',
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
                        description: 'Set focus (internally uses the native <code>.select()</code> method)',
                        return: '—'
                    }
                ],
                template1: `
                <b-field label="Name">
                    <b-input value="John Silver"></b-input>
                </b-field>

                <b-field label="Email"
                    type="is-danger"
                    message="This email is invalid">
                    <b-input type="email"
                        value="john@"
                        maxlength="30">
                    </b-input>
                </b-field>

                <b-field label="Username"
                    type="is-success"
                    message="This username is available">
                    <b-input value="johnsilver" maxlength="30"></b-input>
                </b-field>

                <b-field label="Password">
                    <b-input type="password"
                        value="iwantmytreasure"
                        password-reveal>
                    </b-input>
                </b-field>

                <b-field label="Message">
                    <b-input maxlength="200" type="textarea"></b-input>
                </b-field>`,
                template2: `
                <b-field>
                    <b-input placeholder="No label"></b-input>
                </b-field>

                <b-field label="Label">
                    <b-input placeholder="Text input"></b-input>
                </b-field>

                <b-field label="Success" type="is-success">
                    <b-input placeholder="Success"></b-input>
                </b-field>

                <b-field label="Error"
                    type="is-danger"
                    message="You can have a message too">
                    <b-input placeholder="Error"></b-input>
                </b-field>

                <b-field label="Info" type="is-info">
                    <b-input placeholder="Info"></b-input>
                </b-field>

                <b-field label="Warning" type="is-warning">
                    <b-input placeholder="Warning"></b-input>
                </b-field>

                <b-field label="Disabled">
                    <b-input placeholder="Disabled" disabled></b-input>
                </b-field>

                <b-field label="Loading">
                    <b-input placeholder="Loading" loading></b-input>
                </b-field>`,
                template3: `
                <h3 class="subtitle">With Material Design Icons</h3>
                <b-field>
                    <b-input placeholder="Search..."
                        type="search"
                        icon="search">
                    </b-input>
                </b-field>
                <b-field>
                    <b-input placeholder="Email"
                        type="email"
                        icon="email">
                    </b-input>
                </b-field>
                <b-field>
                    <b-input placeholder="Credit card"
                        icon="payment">
                    </b-input>
                </b-field>

                <h3 class="subtitle">With FontAwesome</h3>
                <b-field>
                    <b-input placeholder="Search..."
                        type="search"
                        icon-pack="fa"
                        icon="search">
                    </b-input>
                </b-field>
                <b-field>
                    <b-input placeholder="Email"
                        type="email"
                        icon-pack="fa"
                        icon="envelope">
                    </b-input>
                </b-field>
                <b-field>
                    <b-input placeholder="Credit card"
                        icon-pack="fa"
                        icon="credit-card">
                    </b-input>
                </b-field>`,
                template4: `
                <b-field>
                    <b-input placeholder="Email" type="email"></b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Number"
                        type="number"
                        min="10"
                        max="20">
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="URL" type="url"></b-input>
                </b-field>

                <b-field>
                    <b-input type="textarea"
                        minlength="10"
                        maxlength="100"
                        placeholder="Maxlength automatically counts characters">
                    </b-input>
                </b-field>`,
                template5: `
                <b-field>
                    <b-input type="password"
                        placeholder="Regular password input">
                    </b-input>
                </b-field>

                <b-field>
                    <b-input type="password"
                        placeholder="Password reveal input"
                        password-reveal>
                    </b-input>
                </b-field>`,
                template6: `
                <b-field>
                    <b-input placeholder="Small"
                        size="is-small"
                        icon="person">
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Default"
                        icon="person">
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Medium"
                        size="is-medium"
                        icon="person">
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Large"
                        size="is-large"
                        icon="person">
                    </b-input>
                </b-field>`
            }
        }
    }
</script>
