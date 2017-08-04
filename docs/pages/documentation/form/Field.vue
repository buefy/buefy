<template>
    <div class="container">
        <h1 class="title is-spaced">Field</h1>
        <h2 class="subtitle">Fields are used to add functionality to controls and to attach/group components and elements together</h2>
        <hr>

        <div class="content">
            <p>These components should be used as a <strong>direct child</strong> of Field:</p>
            <ul>
                <li>Input</li>
                <li>Select</li>
                <li>Autocomplete</li>
                <li>Radio Button</li>
                <li><code>.control</code> elements (html class)</li>
            </ul>
        </div>
        <hr>

        <div class="columns">
            <div class="column">
                <b-field label="Name">
                    <b-input value="Kevin Garvey"></b-input>
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

                <b-field label="Password"
                    type="is-warning"
                    :message="['Password is too short', 'Password must have at least 8 characters']">
                    <b-input value="123" type="password" maxlength="30"></b-input>
                </b-field>

                <b-field label="Subject">
                    <b-select placeholder="Select a subject">
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </b-select>
                </b-field>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title is-spaced">Addons</h2>
        <h3 class="subtitle">Those components are automatically attached together when inside a Field</h3>
        <p class="content">Use the <code>expanded</code> prop <u>on the control</u> to <b>fill up the remaining space</b>.</p>
        <b-message type="is-warning">
            <b>Note:</b> Beware of its responsiveness, avoid large groups of addons since they don't break lines.
        </b-message>
        <div class="columns">
            <div class="column">
                <b-field>
                    <b-input placeholder="Search..."
                        type="search"
                        icon="search">
                    </b-input>
                    <p class="control">
                        <button class="button is-primary">Search</button>
                    </p>
                </b-field>

                <b-field>
                    <b-input placeholder="This is expanded" expanded></b-input>
                    <p class="control">
                        <span class="button is-static">@gmail.com</span>
                    </p>
                </b-field>

                <hr>

                <b-field>
                    <b-select placeholder="Currency">
                        <option>$</option>
                        <option>£</option>
                        <option>€</option>
                    </b-select>
                    <b-input type="number" placeholder="0,00"></b-input>
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

                <b-field>
                    <p class="control">
                        <button class="button is-primary">
                            Button
                        </button>
                    </p>
                    <p class="control">
                        <b-dropdown>
                            <button class="button is-primary" slot="trigger">
                                <b-icon icon="arrow_drop_down"></b-icon>
                            </button>

                            <b-dropdown-item>Action</b-dropdown-item>
                            <b-dropdown-item>Another action</b-dropdown-item>
                            <b-dropdown-item>Something else</b-dropdown-item>
                        </b-dropdown>
                    </p>
                </b-field>

                <b-field>
                    <p class="control">
                        <b-dropdown>
                            <button class="button" slot="trigger">
                                <span>Filters</span>
                                <b-icon icon="arrow_drop_down"></b-icon>
                            </button>

                            <b-dropdown-item value="open_issues">Open Issues and Pull Requests</b-dropdown-item>
                            <b-dropdown-item value="your_issues">Your Issues</b-dropdown-item>
                            <b-dropdown-item value="pull_requests">Your Pull Requests</b-dropdown-item>
                            <b-dropdown-item value="everything">Everything</b-dropdown-item>
                        </b-dropdown>
                    </p>
                    <b-input icon="search" type="search" placeholder="Search..."></b-input>
                </b-field>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title is-spaced">Groups</h2>
        <div class="content">
            <p>You can group those components together with the <code>grouped</code> property.</p>
            <p>Use the <code>expanded</code> prop <u>on the control</u> to <b>fill up the remaining space</b>.</p>
        </div>
        <div class="example">
            <b-field grouped>
                <b-input placeholder="Search..."></b-input>
                <p class="control">
                    <button class="button is-primary">Search</button>
                </p>
            </b-field>

            <b-field grouped>
                <b-input placeholder="Search..." expanded></b-input>
                <p class="control">
                    <button class="button is-primary">Search</button>
                </p>
            </b-field>
        </div>
        <pre class="block" v-highlight><code class="html">{{ template3 | pre }}</code></pre>

        <p class="content">
            Nested Fields can be grouped as well,
            you have to use the <code>expanded</code> prop <u>on the Field</u> to <b>fill up the remaining space</b>.
        </p>
        <div class="example">
            <b-field grouped>
                <b-field label="Personal title">
                    <b-select>
                        <option>Mr.</option>
                        <option>Ms.</option>
                    </b-select>
                </b-field>
                <b-field label="Name" expanded>
                    <b-input></b-input>
                </b-field>
                <b-field label="Email" expanded>
                    <b-input></b-input>
                </b-field>
            </b-field>
        </div>
        <pre class="block" v-highlight><code class="html">{{ template4 | pre }}</code></pre>

        <div class="tags has-addons">
            <span class="tag is-success">New!</span>
            <span class="tag is-info">0.5.0</span>
        </div>
        <p class="content">
            Add the <code>group-multiline</code> prop to allow controls to fill up <b>multiple lines</b>.
            This is ideal for a long list of controls.
        </p>
        <div class="columns">
            <div class="column">
                <b-field grouped group-multiline>
                    <b-input></b-input>
                    <p class="control">
                        <button class="button">First</button>
                    </p>
                    <p class="control">
                        <button class="button">Second</button>
                    </p>
                    <p class="control">
                        <button class="button">Third</button>
                    </p>
                    <p class="control">
                        <button class="button">Fourth</button>
                    </p>
                    <p class="control">
                        <button class="button">Fifth</button>
                    </p>
                    <p class="control">
                        <button class="button">Sixth</button>
                    </p>
                    <p class="control">
                        <button class="button">Seventh</button>
                    </p>
                    <p class="control">
                        <button class="button">Eighth</button>
                    </p>
                </b-field>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template5 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h3 class="title">Positions</h3>
        <p class="content">Add the <code>position</code> prop to modify its alignment.</p>
        <div class="example">
            <b-field position="is-centered">
                <b-input placeholder="Search..." type="search" icon="search">
                </b-input>
                <p class="control">
                    <button class="button is-info">Search</button>
                </p>
            </b-field>

            <hr>

            <b-field grouped position="is-right">
                <b-input placeholder="Search..." type="search" icon="search">
                </b-input>
                <p class="control">
                    <button class="button is-info">Search</button>
                </p>
            </b-field>
        </div>
        <pre class="block" v-highlight><code class="html">{{ template6 | pre }}</code></pre>

        <hr>
        <h3 class="title">Combining addons and groups</h3>
        <div class="example">
            <b-field grouped>
                <b-field label="Name" expanded>
                    <b-field>
                        <b-select placeholder="Title">
                            <option>Mr.</option>
                            <option>Ms.</option>
                        </b-select>
                        <b-input placeholder="Name" expanded></b-input>
                    </b-field>
                </b-field>
                <b-field label="Email" expanded>
                    <b-input placeholder="some@email.com"></b-input>
                </b-field>
            </b-field>
        </div>
        <pre class="block" v-highlight><code class="html">{{ template7 | pre }}</code></pre>

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
        </b-tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                props: [
                    {
                        name: '<code>type</code>',
                        description: 'Type (color) of the field and help message, also adds a matching icon, optional. Used by Input, Select and Autocomplete',
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
                        type: 'String, Array<String>',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>grouped</code>',
                        description: 'Direct child components/elements of Field will be grouped horizontally (see which ones at the top of the page)',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>group-multiline</code>',
                        description: 'Allow controls to fill up multiple lines, making it responsive',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>position</code>',
                        description: 'Which position should the addons appear, optional',
                        type: 'String',
                        values: '<code>is-centered</code>, <code>is-right</code>',
                        default: '—'
                    },
                    {
                        name: '<code>addons</code>',
                        description: 'Field automatically attach controls together',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>true</code>'
                    }
                ],
                template1: `
                <b-field label="Name">
                    <b-input value="Kevin Garvey"></b-input>
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

                <b-field label="Password"
                    type="is-warning"
                    :message="['Password is too short', 'Password must have at least 8 characters']">
                    <b-input value="123" type="password" maxlength="30"></b-input>
                </b-field>

                <b-field label="Subject">
                    <b-select placeholder="Select a subject">
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </b-select>
                </b-field>`,
                template2: `
                <b-field>
                    <b-input placeholder="Search..."
                        type="search"
                        icon="search">
                    </b-input>
                    <p class="control">
                        <button class="button is-primary">Search</button>
                    </p>
                </b-field>

                <b-field>
                    <b-input placeholder="This is expanded" expanded></b-input>
                    <p class="control">
                        <span class="button is-static">@gmail.com</span>
                    </p>
                </b-field>

                <hr>

                <b-field>
                    <b-select placeholder="Currency">
                        <option>$</option>
                        <option>£</option>
                        <option>€</option>
                    </b-select>
                    <b-input type="number" placeholder="0,00"></b-input>
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

                <b-field>
                    <p class="control">
                        <button class="button is-primary">
                            Button
                        </button>
                    </p>
                    <p class="control">
                        <b-dropdown>
                            <button class="button is-primary" slot="trigger">
                                <b-icon icon="arrow_drop_down"></b-icon>
                            </button>

                            <b-dropdown-item>Action</b-dropdown-item>
                            <b-dropdown-item>Another action</b-dropdown-item>
                            <b-dropdown-item>Something else</b-dropdown-item>
                        </b-dropdown>
                    </p>
                </b-field>

                <b-field>
                    <p class="control">
                        <b-dropdown>
                            <button class="button" slot="trigger">
                                <span>Filters</span>
                                <b-icon icon="arrow_drop_down"></b-icon>
                            </button>

                            <b-dropdown-item value="open_issues">Open Issues and Pull Requests</b-dropdown-item>
                            <b-dropdown-item value="your_issues">Your Issues</b-dropdown-item>
                            <b-dropdown-item value="pull_requests">Your Pull Requests</b-dropdown-item>
                            <b-dropdown-item value="everything">Everything</b-dropdown-item>
                        </b-dropdown>
                    </p>
                    <b-input icon="search" type="search" placeholder="Search..."></b-input>
                </b-field>`,
                template3: `
                <b-field grouped>
                    <b-input placeholder="Search..."></b-input>
                    <p class="control">
                        <button class="button is-primary">Search</button>
                    </p>
                </b-field>

                <b-field grouped>
                    <b-input placeholder="Search..." expanded></b-input>
                    <p class="control">
                        <button class="button is-primary">Search</button>
                    </p>
                </b-field>`,
                template4: `
                <b-field grouped>
                    <b-field label="Personal title">
                        <b-select>
                            <option>Mr.</option>
                            <option>Ms.</option>
                        </b-select>
                    </b-field>
                    <b-field label="Name" expanded>
                        <b-input></b-input>
                    </b-field>
                    <b-field label="Email" expanded>
                        <b-input></b-input>
                    </b-field>
                </b-field>`,
                template5: `
                <b-field grouped group-multiline>
                    <b-input></b-input>
                    <p class="control">
                        <button class="button">First</button>
                    </p>
                    <p class="control">
                        <button class="button">Second</button>
                    </p>
                    <p class="control">
                        <button class="button">Third</button>
                    </p>
                    <p class="control">
                        <button class="button">Fourth</button>
                    </p>
                    <p class="control">
                        <button class="button">Fifth</button>
                    </p>
                    <p class="control">
                        <button class="button">Sixth</button>
                    </p>
                    <p class="control">
                        <button class="button">Seventh</button>
                    </p>
                    <p class="control">
                        <button class="button">Eighth</button>
                    </p>
                </b-field>`,
                template6: `
                <b-field position="is-centered">
                    <b-input placeholder="Search..." type="search" icon="search">
                    </b-input>
                    <p class="control">
                        <button class="button is-info">Search</button>
                    </p>
                </b-field>

                <hr>

                <b-field grouped position="is-right">
                    <b-input placeholder="Search..." type="search" icon="search">
                    </b-input>
                    <p class="control">
                        <button class="button is-info">Search</button>
                    </p>
                </b-field>`,
                template7: `
                <b-field grouped>
                    <b-field label="Name" expanded>
                        <b-field>
                            <b-select placeholder="Title">
                                <option>Mr.</option>
                                <option>Ms.</option>
                            </b-select>
                            <b-input placeholder="Name" expanded></b-input>
                        </b-field>
                    </b-field>
                    <b-field label="Email" expanded>
                        <b-input placeholder="some@email.com"></b-input>
                    </b-field>
                </b-field>`
            }
        }
    }
</script>
