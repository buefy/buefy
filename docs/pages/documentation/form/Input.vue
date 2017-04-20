<template>
    <div>
        <h1 class="title is-spaced">Input</h1>
        <h2 class="subtitle">Inputs are wrapped on a Field, it's not <em>necessary</em> however some functionalities might not work otherwise</h2>
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
                <pre class="content" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
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
                <pre class="content" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
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
                <pre class="content" v-highlight><code class="html">{{ template3 | pre }}</code></pre>
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
                <pre class="content" v-highlight><code class="html">{{ template4 | pre }}</code></pre>
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
                <pre class="content" v-highlight><code class="html">{{ template5 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title is-spaced">Addons</h2>
        <h3 class="subtitle">Inputs, Selects, Dropdowns and <code>.control</code> elements are automatically unified when inside a Field</h3>
        <div class="example">
            <h3 class="subtitle">Which side you want</h3>
            <b-field>
                <b-input placeholder="Search..."
                    type="search"
                    icon="search">
                </b-input>
                <p class="control">
                    <button class="button is-primary">Search</button>
                </p>
            </b-field>

            <b-field position="centered">
                <b-input placeholder="Search..."
                    type="search"
                    icon="search">
                </b-input>
                <p class="control">
                    <button class="button is-dark">Search</button>
                </p>
            </b-field>

            <b-field position="right">
                <b-input placeholder="Search..."
                    type="search"
                    icon="search">
                </b-input>
                <p class="control">
                    <button class="button is-info">Search</button>
                </p>
            </b-field>

            <h3 class="subtitle">How many you need</h3>
            <b-field>
                <b-select placeholder="Currency">
                    <b-option>$</b-option>
                    <b-option>£</b-option>
                    <b-option>€</b-option>
                </b-select>
                <b-input placeholder="0,00"></b-input>
                <p class="control">
                    <button class="button">Cancel</button>
                </p>
                <p class="control">
                    <button class="button is-success">Transfer</button>
                </p>
            </b-field>

            <b-field>
                <p class="control">
                    <button class="button">
                        <b-icon icon="format_bold"></b-icon>
                    </button>
                </p>
                <p class="control">
                    <button class="button">
                        <b-icon icon="format_italic"></b-icon>
                    </button>
                </p>
                <p class="control">
                    <button class="button">
                        <b-icon icon="format_underlined"></b-icon>
                    </button>
                </p>
                <p class="control">
                    <button class="button">
                        <b-icon icon="format_align_left"></b-icon>
                    </button>
                </p>
                <p class="control">
                    <button class="button">
                        <b-icon icon="format_align_center"></b-icon>
                    </button>
                </p>
                <p class="control">
                    <button class="button">
                        <b-icon icon="format_align_right"></b-icon>
                    </button>
                </p>
                <b-input placeholder="Search..." type="search" icon="search"></b-input>
            </b-field>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template6 | pre }}</code></pre>

        <hr>
        <h2 class="title is-spaced">Group</h2>
        <h3 class="subtitle">Or grouped horizontally with the <code>grouped</code> property</h3>
        <p class="content">Note that you have to specify which one will be <code>expanded</code>.</p>
        <div class="example">
            <b-field grouped>
                <b-input placeholder="Search..." expanded></b-input>
                <p class="control">
                    <button class="button is-primary">Search</button>
                </p>
                <p class="control">
                    <button class="button">Clear</button>
                </p>
            </b-field>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template7 | pre }}</code></pre>

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
                <pre class="content" v-highlight><code class="html">{{ template8 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="subtitle">Input properties</h2>
        <b-table
            :data="inputProps"
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

        <h2 class="subtitle">Input events</h2>
        <b-table
            :data="inputEvents"
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

        <hr>
        <h2 class="subtitle">Field properties</h2>
        <b-table
            :data="fieldProps"
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
                inputProps: [
                    {
                        name: '<code>v-model</code>',
                        description: 'Binding value',
                        type: 'String, Number',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>type</code>',
                        description: 'Same as native input type',
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
                        name: '<code>autocomplete</code>',
                        description: 'Same as native <code>autocomplete</code>',
                        type: 'String',
                        values: '<code>on</code>, <code>off</code>',
                        default: '<code>on</code>'
                    },
                    {
                        name: '<code>required</code>',
                        description: 'Same as native <code>required</code>',
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
                        name: '<code>readonly</code>',
                        description: 'Same as native <code>readonly</code>',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>min</code>',
                        description: 'Same as native <code>min</code>',
                        type: 'Number',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>max</code>',
                        description: 'Same as native <code>max</code>',
                        type: 'Number',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>step</code>',
                        description: 'Same as native <code>step</code>',
                        type: 'Number',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>minlength</code>',
                        description: 'Same as native <code>minlength</code>',
                        type: 'Number',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>maxlength</code>',
                        description: 'Same as native <code>maxlength</code>, also adds character counter',
                        type: 'Number',
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
                        name: '<code>pattern</code>',
                        description: 'Same as native <code>pattern</code>',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>placeholder</code>',
                        description: 'Same as native <code>placeholder</code>',
                        type: 'String',
                        values: '—',
                        default: '—'
                    }
                ],
                inputEvents: [
                    {
                        name: '<code>click.native</code>',
                        description: 'Triggers when input is clicked',
                        parameters: '<code>event: $event</code>'
                    },
                    {
                        name: '<code>blur</code>',
                        description: 'Triggers when input has lost focus',
                        parameters: '<code>event: $event</code>'
                    },
                    {
                        name: '<code>focus</code>',
                        description: 'Triggers when input is focused',
                        parameters: '<code>event: $event</code>'
                    },
                    {
                        name: '<code>change</code>',
                        description: 'Triggers when input value is changed',
                        parameters: '<code>value: String/Number</code>'
                    }
                ],
                fieldProps: [
                    {
                        name: '<code>type</code>',
                        description: 'Type (color) of the field and help message, also adds a matching icon, optional',
                        type: 'String',
                        values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                            <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                            <code>is-warning</code>, <code>is-danger</code>,
                            and any other colors you've set in the <code>$colors</code> list on Sass`,
                        default: '—'
                    },
                    {
                        name: '<code>label</code>',
                        description: 'Field label',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>message</code>',
                        description: 'Help message text',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>grouped</code>',
                        description: 'Inputs and <code>.control</code> elements wrapped by Field will be grouped horizontally',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>position</code>',
                        description: 'Which position should the addons appear, optional',
                        type: 'Boolean',
                        values: '<code>left</code>, <code>centered</code>, <code>right</code>',
                        default: '<code>left</code>'
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
                    <h3 class="subtitle">Which side you want</h3>
                    <b-field>
                        <b-input placeholder="Search..."
                            type="search"
                            icon="search">
                        </b-input>
                        <p class="control">
                            <button class="button is-primary">Search</button>
                        </p>
                    </b-field>

                    <b-field position="centered">
                        <b-input placeholder="Search..."
                            type="search"
                            icon="search">
                        </b-input>
                        <p class="control">
                            <button class="button is-dark">Search</button>
                        </p>
                    </b-field>

                    <b-field position="right">
                        <b-input placeholder="Search..."
                            type="search"
                            icon="search">
                        </b-input>
                        <p class="control">
                            <button class="button is-info">Search</button>
                        </p>
                    </b-field>

                    <h3 class="subtitle">How many you need</h3>
                    <b-field>
                        <b-select placeholder="Currency">
                            <b-option>$</b-option>
                            <b-option>£</b-option>
                            <b-option>€</b-option>
                        </b-select>
                        <b-input placeholder="How much will you donate?"></b-input>
                        <p class="control">
                            <button class="button">Cancel</button>
                        </p>
                        <p class="control">
                            <button class="button is-success">Transfer</button>
                        </p>
                    </b-field>

                    <b-field>
                        <p class="control">
                            <button class="button">
                                <b-icon icon="format_bold"></b-icon>
                            </button>
                        </p>
                        <p class="control">
                            <button class="button">
                                <b-icon icon="format_italic"></b-icon>
                            </button>
                        </p>
                        <p class="control">
                            <button class="button">
                                <b-icon icon="format_underlined"></b-icon>
                            </button>
                        </p>
                        <p class="control">
                            <button class="button">
                                <b-icon icon="format_align_left"></b-icon>
                            </button>
                        </p>
                        <p class="control">
                            <button class="button">
                                <b-icon icon="format_align_center"></b-icon>
                            </button>
                        </p>
                        <p class="control">
                            <button class="button">
                                <b-icon icon="format_align_right"></b-icon>
                            </button>
                        </p>
                    </b-field>`,
                template7: `
                    <b-field grouped>
                        <b-input placeholder="Search..." expanded></b-input>
                        <p class="control">
                            <button class="button is-primary">Search</button>
                        </p>
                        <p class="control">
                            <button class="button">Clear</button>
                        </p>
                    </b-field>`,
                template8: `
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
