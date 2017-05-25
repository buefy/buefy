<template>
    <div class="container">
        <h1 class="title is-spaced">Dropdown</h1>
        <h2 class="subtitle">
            Dropdowns are very versatile, you can use as a quick menu or even like a select.
            It's toggled by clicking, and looks like a modal when you're on tablet or smartphone
        </h2>
        <hr>

        <div class="example">
            <b-dropdown>
                <button class="button" slot="trigger">
                    <span>Dropdown</span>
                    <b-icon icon="arrow_drop_down"></b-icon>
                </button>

                <b-dropdown-option>Action</b-dropdown-option>
                <b-dropdown-option>Another action</b-dropdown-option>
                <b-dropdown-option>Something else</b-dropdown-option>
            </b-dropdown>

        </div>
        <pre class="content" v-highlight><code class="html">{{ template1 | pre }}</code></pre>

        <h2 class="subtitle">Use anything you want to trigger</h2>
        <div class="example is-flex">
            <b-dropdown>
                <figure slot="trigger">
                    <img src="../../../assets/buefy.png" width="94">
                </figure>

                <b-dropdown-option>Action</b-dropdown-option>
                <b-dropdown-option>Another action</b-dropdown-option>
                <b-dropdown-option>Something else</b-dropdown-option>
            </b-dropdown>

            <b-dropdown>
                <button class="button" slot="trigger">
                    <b-icon icon="more_vert"></b-icon>
                </button>

                <b-dropdown-option>Action</b-dropdown-option>
                <b-dropdown-option>Another action</b-dropdown-option>
                <b-dropdown-option>Something else</b-dropdown-option>
            </b-dropdown>

            <b-dropdown>
                <h1 class="title" slot="trigger">
                    Click me!
                </h1>

                <b-dropdown-option>Action</b-dropdown-option>
                <b-dropdown-option>Another action</b-dropdown-option>
                <b-dropdown-option>Something else</b-dropdown-option>
            </b-dropdown>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template2 | pre }}</code></pre>

        <h2 class="title">Nav</h2>
        <div class="example is-paddingless">
            <nav class="nav is-primary">
                <div class="nav-left">
                    <a class="nav-item">
                        <img src="../../../assets/buefy.png" alt="Buefy">
                    </a>
                </div>

                <div class="nav-center">
                    <a class="nav-item"><b-icon pack="fa" icon="github"></b-icon></a>
                    <a class="nav-item"><b-icon pack="fa" icon="twitter"></b-icon></a>
                </div>

                <div class="nav-right" style="overflow: visible">
                    <a class="nav-item">
                        <b-dropdown>
                            <template slot="trigger">Dropdown</template>

                            <b-dropdown-option>Action</b-dropdown-option>
                            <b-dropdown-option>Another action</b-dropdown-option>
                            <b-dropdown-option>Something else</b-dropdown-option>
                        </b-dropdown>
                    </a>
                </div>
            </nav>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template3 | pre }}</code></pre>

        <h2 class="title">Addons</h2>
        <div class="example">
            <b-field>
                <p class="control">
                    <button class="button">
                        Button
                    </button>
                </p>
                <b-dropdown>
                    <button class="button" slot="trigger">
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-dropdown-option>Action</b-dropdown-option>
                    <b-dropdown-option>Another action</b-dropdown-option>
                    <b-dropdown-option>Something else</b-dropdown-option>
                </b-dropdown>
            </b-field>

            <b-field>
                <p class="control">
                    <button class="button is-primary">
                        Button
                    </button>
                </p>
                <b-dropdown>
                    <button class="button is-primary" slot="trigger">
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-dropdown-option>Action</b-dropdown-option>
                    <b-dropdown-option>Another action</b-dropdown-option>
                    <b-dropdown-option>Something else</b-dropdown-option>
                </b-dropdown>
            </b-field>

            <b-field>
                <b-dropdown>
                    <button class="button" slot="trigger">
                        <span>Filters</span>
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-dropdown-option value="open_issues">Open Issues and Pull Requests</b-dropdown-option>
                    <b-dropdown-option value="your_issues">Your Issues</b-dropdown-option>
                    <b-dropdown-option value="pull_requests">Your Pull Requests</b-dropdown-option>
                    <b-dropdown-option value="everything">Everything</b-dropdown-option>
                </b-dropdown>
                <b-input icon="search" type="search" placeholder="Search..."></b-input>
            </b-field>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template4 | pre }}</code></pre>

        <h2 class="title">Icons and HTML</h2>
        <div class="example">
            <div class="block">
                <b-dropdown>
                    <button class="button" slot="trigger">
                        <span>Navigation</span>
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-dropdown-option subheader>Logged as Rafael Beraldo</b-dropdown-option>
                    <b-dropdown-option separator></b-dropdown-option>
                    <b-dropdown-option value="home">Home</b-dropdown-option>
                    <b-dropdown-option value="products">Products</b-dropdown-option>
                    <b-dropdown-option value="blog" disabled>Blog</b-dropdown-option>
                    <b-dropdown-option separator></b-dropdown-option>
                    <b-dropdown-option value="settings">Settings</b-dropdown-option>
                    <b-dropdown-option value="logout">Logout</b-dropdown-option>
                </b-dropdown>

                <b-dropdown narrowed>
                    <button class="button" slot="trigger">
                        <span>Narrowed</span>
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-dropdown-option subheader>Logged as Rafael Beraldo</b-dropdown-option>
                    <b-dropdown-option separator></b-dropdown-option>
                    <b-dropdown-option value="home">Home</b-dropdown-option>
                    <b-dropdown-option value="products">Products</b-dropdown-option>
                    <b-dropdown-option value="blog" disabled>Blog</b-dropdown-option>
                    <b-dropdown-option separator></b-dropdown-option>
                    <b-dropdown-option value="settings">Settings</b-dropdown-option>
                    <b-dropdown-option value="logout">Logout</b-dropdown-option>
                </b-dropdown>
            </div>

            <div class="field">
                <b-dropdown v-model="select">
                    <button class="button" slot="trigger">
                        <span>Icons, HTML and v-model</span>
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-dropdown-option
                        label="Logged as <b>Rafael Beraldo</b>"
                        subheader>
                    </b-dropdown-option>
                    <b-dropdown-option separator></b-dropdown-option>
                    <b-dropdown-option value="home" icon="home">Home</b-dropdown-option>
                    <b-dropdown-option value="products" icon="shopping_cart">Products</b-dropdown-option>
                    <b-dropdown-option value="blog" icon="art_track" disabled>Blog</b-dropdown-option>
                    <b-dropdown-option separator></b-dropdown-option>
                    <b-dropdown-option value="settings" icon="settings">Settings</b-dropdown-option>
                    <b-dropdown-option value="logout" icon="exit_to_app">Logout</b-dropdown-option>
                </b-dropdown>
            </div>
            <p><b>Selection:</b> {{ select }}</p>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template5 | pre }}</code></pre>
        <pre v-highlight><code class="javascript">{{ code5 | pre }}</code></pre>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <h3 class="subtitle">Dropdown</h3>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="dropdownProps" default-sort="name">
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
                <b-table :data="dropdownEvents" default-sort="name">
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

        <h2 class="subtitle">Dropdown Option</h2>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="optionProps" default-sort="name">
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                select: '',
                dropdownProps: [
                    {
                        name: '<code>v-model</code>',
                        description: 'Binding value',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>narrowed</code>',
                        description: 'Makes items narrower',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    }
                ],
                dropdownEvents: [
                    {
                        name: '<code>change</code>',
                        description: 'Triggers when an option is selected',
                        parameters: '<code>value: String</code>'
                    }
                ],
                optionProps: [
                    {
                        name: '<code>value</code>',
                        description: 'The value that will be returned on events and v-model',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>label</code>',
                        description: 'Option label, use this instead of the slot if you want to render HTML',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>separator</code>',
                        description: 'Set the option to be a separator',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>disabled</code>',
                        description: 'Option is disabled',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>subheader</code>',
                        description: 'Option is not a clickable item',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>icon</code>',
                        description: 'Icon name',
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
                template1: `
                <b-dropdown>
                    <button class="button" slot="trigger">
                        <span>Dropdown</span>
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-dropdown-option>Action</b-dropdown-option>
                    <b-dropdown-option>Another action</b-dropdown-option>
                    <b-dropdown-option>Something else</b-dropdown-option>
                </b-dropdown>`,
                template2: `
                <b-dropdown>
                    <figure slot="trigger">
                        <img src="assets/buefy.png" width="94">
                    </figure>

                    <b-dropdown-option>Action</b-dropdown-option>
                    <b-dropdown-option>Another action</b-dropdown-option>
                    <b-dropdown-option>Something else</b-dropdown-option>
                </b-dropdown>

                <b-dropdown>
                    <button class="button" slot="trigger">
                        <b-icon icon="more_vert"></b-icon>
                    </button>

                    <b-dropdown-option>Action</b-dropdown-option>
                    <b-dropdown-option>Another action</b-dropdown-option>
                    <b-dropdown-option>Something else</b-dropdown-option>
                </b-dropdown>

                <b-dropdown>
                    <h1 class="title" slot="trigger">
                        Click me!
                    </h1>

                    <b-dropdown-option>Action</b-dropdown-option>
                    <b-dropdown-option>Another action</b-dropdown-option>
                    <b-dropdown-option>Something else</b-dropdown-option>
                </b-dropdown>`,
                template3: `
                <nav class="nav is-primary">
                    <div class="nav-left">
                        <a class="nav-item">
                            <img src="../../../assets/buefy.png" alt="Buefy">
                        </a>
                    </div>

                    <div class="nav-center">
                        <a class="nav-item"><b-icon pack="fa" icon="github"></b-icon></a>
                        <a class="nav-item"><b-icon pack="fa" icon="twitter"></b-icon></a>
                    </div>

                    <div class="nav-right" style="overflow: visible">
                        <a class="nav-item">
                            <b-dropdown>
                                <template slot="trigger">Dropdown</template>

                                <b-dropdown-option>Action</b-dropdown-option>
                                <b-dropdown-option>Another action</b-dropdown-option>
                                <b-dropdown-option>Something else</b-dropdown-option>
                            </b-dropdown>
                        </a>
                    </div>
                </nav>`,
                template4: `
                <b-field>
                    <p class="control">
                        <button class="button">
                            Button
                        </button>
                    </p>
                    <b-dropdown>
                        <button class="button" slot="trigger">
                            <b-icon icon="arrow_drop_down"></b-icon>
                        </button>

                        <b-dropdown-option>Action</b-dropdown-option>
                        <b-dropdown-option>Another action</b-dropdown-option>
                        <b-dropdown-option>Something else</b-dropdown-option>
                    </b-dropdown>
                </b-field>

                <b-field>
                    <p class="control">
                        <button class="button is-primary">
                            Button
                        </button>
                    </p>
                    <b-dropdown>
                        <button class="button is-primary" slot="trigger">
                            <b-icon icon="arrow_drop_down"></b-icon>
                        </button>

                        <b-dropdown-option>Action</b-dropdown-option>
                        <b-dropdown-option>Another action</b-dropdown-option>
                        <b-dropdown-option>Something else</b-dropdown-option>
                    </b-dropdown>
                </b-field>

                <b-field>
                    <b-dropdown>
                        <button class="button" slot="trigger">
                            <span>Filters</span>
                            <b-icon icon="arrow_drop_down"></b-icon>
                        </button>

                        <b-dropdown-option value="open_issues">Open Issues and Pull Requests</b-dropdown-option>
                        <b-dropdown-option value="your_issues">Your Issues</b-dropdown-option>
                        <b-dropdown-option value="pull_requests">Your Pull Requests</b-dropdown-option>
                        <b-dropdown-option value="everything">Everything</b-dropdown-option>
                    </b-dropdown>
                    <b-input icon="search" type="search" placeholder="Search..."></b-input>
                </b-field>`,
                template5: `
                <div class="block">
                    <b-dropdown>
                        <button class="button" slot="trigger">
                            <span>Navigation</span>
                            <b-icon icon="arrow_drop_down"></b-icon>
                        </button>

                        <b-dropdown-option subheader>Logged as Rafael Beraldo</b-dropdown-option>
                        <b-dropdown-option separator></b-dropdown-option>
                        <b-dropdown-option value="home">Home</b-dropdown-option>
                        <b-dropdown-option value="products">Products</b-dropdown-option>
                        <b-dropdown-option value="blog" disabled>Blog</b-dropdown-option>
                        <b-dropdown-option separator></b-dropdown-option>
                        <b-dropdown-option value="settings">Settings</b-dropdown-option>
                        <b-dropdown-option value="logout">Logout</b-dropdown-option>
                    </b-dropdown>

                    <b-dropdown narrowed>
                        <button class="button" slot="trigger">
                            <span>Narrowed</span>
                            <b-icon icon="arrow_drop_down"></b-icon>
                        </button>

                        <b-dropdown-option subheader>Logged as Rafael Beraldo</b-dropdown-option>
                        <b-dropdown-option separator></b-dropdown-option>
                        <b-dropdown-option value="home">Home</b-dropdown-option>
                        <b-dropdown-option value="products">Products</b-dropdown-option>
                        <b-dropdown-option value="blog" disabled>Blog</b-dropdown-option>
                        <b-dropdown-option separator></b-dropdown-option>
                        <b-dropdown-option value="settings">Settings</b-dropdown-option>
                        <b-dropdown-option value="logout">Logout</b-dropdown-option>
                    </b-dropdown>
                </div>

                <div class="field">
                    <b-dropdown v-model="select">
                        <button class="button" slot="trigger">
                            <span>Icons, HTML and v-model</span>
                            <b-icon icon="arrow_drop_down"></b-icon>
                        </button>

                        <b-dropdown-option
                            label="Logged as <b>Rafael Beraldo</b>"
                            subheader>
                        </b-dropdown-option>
                        <b-dropdown-option separator></b-dropdown-option>
                        <b-dropdown-option value="home" icon="home">Home</b-dropdown-option>
                        <b-dropdown-option value="products" icon="shopping_cart">Products</b-dropdown-option>
                        <b-dropdown-option value="blog" icon="art_track" disabled>Blog</b-dropdown-option>
                        <b-dropdown-option separator></b-dropdown-option>
                        <b-dropdown-option value="settings" icon="settings">Settings</b-dropdown-option>
                        <b-dropdown-option value="logout" icon="exit_to_app">Logout</b-dropdown-option>
                    </b-dropdown>
                </div>
                <p><b>Selection:</b> {{ select }}</p>`,
                code5: `
                export default {
                    data() {
                        return {
                            select: ''
                        }
                    }
                }`
            }
        }
    }
</script>
