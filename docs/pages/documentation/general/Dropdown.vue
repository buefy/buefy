<template>
    <div>
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

                <b-option>Action</b-option>
                <b-option>Another action</b-option>
                <b-option>Something else</b-option>
            </b-dropdown>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template1 | pre }}</code></pre>

        <h2 class="subtitle">Use anything you want to trigger</h2>
        <div class="example is-flex">
            <b-dropdown>
                <figure slot="trigger">
                    <img src="../../../assets/buefy.png" width="94">
                </figure>

                <b-option>Action</b-option>
                <b-option>Another action</b-option>
                <b-option>Something else</b-option>
            </b-dropdown>

            <b-dropdown>
                <button class="button" slot="trigger">
                    <b-icon icon="more_vert"></b-icon>
                </button>

                <b-option>Action</b-option>
                <b-option>Another action</b-option>
                <b-option>Something else</b-option>
            </b-dropdown>

            <b-dropdown>
                <h1 class="title" slot="trigger">
                    Click me!
                </h1>

                <b-option>Action</b-option>
                <b-option>Another action</b-option>
                <b-option>Something else</b-option>
            </b-dropdown>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template2 | pre }}</code></pre>

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

                    <b-option>Action</b-option>
                    <b-option>Another action</b-option>
                    <b-option>Something else</b-option>
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

                    <b-option>Action</b-option>
                    <b-option>Another action</b-option>
                    <b-option>Something else</b-option>
                </b-dropdown>
            </b-field>

            <b-field>
                <b-dropdown>
                    <button class="button" slot="trigger">
                        <span>Filters</span>
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-option value="open_issues">Open Issues and Pull Requests</b-option>
                    <b-option value="your_issues">Your Issues</b-option>
                    <b-option value="pull_requests">Your Pull Requests</b-option>
                    <b-option value="everything">Everything</b-option>
                </b-dropdown>
                <b-input icon="search" type="search" placeholder="Search..."></b-input>
            </b-field>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template3 | pre }}</code></pre>

        <h2 class="title">Icons and HTML</h2>
        <div class="example">
            <div class="block">
                <b-dropdown>
                    <button class="button" slot="trigger">
                        <span>Navigation</span>
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-option value="profile" subheader>Logged as Rafael Beraldo</b-option>
                    <b-option separator></b-option>
                    <b-option value="home">Home</b-option>
                    <b-option value="products">Products</b-option>
                    <b-option value="blog" disabled>Blog</b-option>
                    <b-option separator></b-option>
                    <b-option value="settings">Settings</b-option>
                    <b-option value="logout">Logout</b-option>
                </b-dropdown>

                <b-dropdown narrowed>
                    <button class="button" slot="trigger">
                        <span>Narrowed</span>
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-option value="profile" subheader>Logged as Rafael Beraldo</b-option>
                    <b-option separator></b-option>
                    <b-option value="home">Home</b-option>
                    <b-option value="products">Products</b-option>
                    <b-option value="blog" disabled>Blog</b-option>
                    <b-option separator></b-option>
                    <b-option value="settings">Settings</b-option>
                    <b-option value="logout">Logout</b-option>
                </b-dropdown>
            </div>

            <div class="field">
                <b-dropdown v-model="select">
                    <button class="button" slot="trigger">
                        <span>Icons, HTML and v-model</span>
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-option
                        value="profile"
                        label="Logged as <b>Rafael Beraldo</b>"
                        subheader>
                    </b-option>
                    <b-option separator></b-option>
                    <b-option value="home" icon="home">Home</b-option>
                    <b-option value="products" icon="shopping_cart">Products</b-option>
                    <b-option value="blog" icon="art_track" disabled>Blog</b-option>
                    <b-option separator></b-option>
                    <b-option value="settings" icon="settings">Settings</b-option>
                    <b-option value="logout" icon="exit_to_app">Logout</b-option>
                </b-dropdown>
            </div>
            <p><b>Selection:</b> {{ select }}</p>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template4 | pre }}</code></pre>
        <pre v-highlight><code class="javascript">{{ code4 | pre }}</code></pre>

        <h2 class="subtitle">Dropdown properties</h2>
        <b-table
            :data="dropdownProps"
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

        <h2 class="subtitle">Dropdown events</h2>
        <b-table
            :data="dropdownEvents"
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
                        description: 'Option label, use this instead of the slot if you want to render HTML.',
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

                        <b-option>Action</b-option>
                        <b-option>Another action</b-option>
                        <b-option>Something else</b-option>
                    </b-dropdown>`,

                template2: `
                    <b-dropdown>
                        <figure slot="trigger">
                            <img src="assets/buefy.png" width="94">
                        </figure>

                        <b-option>Action</b-option>
                        <b-option>Another action</b-option>
                        <b-option>Something else</b-option>
                    </b-dropdown>

                    <b-dropdown>
                        <button class="button" slot="trigger">
                            <b-icon icon="more_vert"></b-icon>
                        </button>

                        <b-option>Action</b-option>
                        <b-option>Another action</b-option>
                        <b-option>Something else</b-option>
                    </b-dropdown>

                    <b-dropdown>
                        <h1 class="title" slot="trigger">
                            Click me!
                        </h1>

                        <b-option>Action</b-option>
                        <b-option>Another action</b-option>
                        <b-option>Something else</b-option>
                    </b-dropdown>`,

                template3: `
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

                            <b-option>Action</b-option>
                            <b-option>Another action</b-option>
                            <b-option>Something else</b-option>
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

                            <b-option>Action</b-option>
                            <b-option>Another action</b-option>
                            <b-option>Something else</b-option>
                        </b-dropdown>
                    </b-field>

                    <b-field>
                        <b-dropdown>
                            <button class="button" slot="trigger">
                                <span>Filters</span>
                                <b-icon icon="arrow_drop_down"></b-icon>
                            </button>

                            <b-option value="open_issues">Open Issues and Pull Requests</b-option>
                            <b-option value="your_issues">Your Issues</b-option>
                            <b-option value="pull_requests">Your Pull Requests</b-option>
                            <b-option value="everything">Everything</b-option>
                        </b-dropdown>
                        <b-input icon="search" type="search" placeholder="Search..."></b-input>
                    </b-field>`,
                template4: `
                    <div class="block">
                        <b-dropdown>
                            <button class="button" slot="trigger">
                                <span>Navigation</span>
                                <b-icon icon="arrow_drop_down"></b-icon>
                            </button>

                            <b-option value="profile" subheader>Logged as Rafael Beraldo</b-option>
                            <b-option separator></b-option>
                            <b-option value="home">Home</b-option>
                            <b-option value="products">Products</b-option>
                            <b-option value="blog" disabled>Blog</b-option>
                            <b-option separator></b-option>
                            <b-option value="settings">Settings</b-option>
                            <b-option value="logout">Logout</b-option>
                        </b-dropdown>

                        <b-dropdown narrowed>
                            <button class="button" slot="trigger">
                                <span>Narrowed</span>
                                <b-icon icon="arrow_drop_down"></b-icon>
                            </button>

                            <b-option value="profile" subheader>Logged as Rafael Beraldo</b-option>
                            <b-option separator></b-option>
                            <b-option value="home">Home</b-option>
                            <b-option value="products">Products</b-option>
                            <b-option value="blog" disabled>Blog</b-option>
                            <b-option separator></b-option>
                            <b-option value="settings">Settings</b-option>
                            <b-option value="logout">Logout</b-option>
                        </b-dropdown>
                    </div>

                    <div class="field">
                        <b-dropdown v-model="select">
                            <button class="button" slot="trigger">
                                <span>Icons, HTML and v-model</span>
                                <b-icon icon="arrow_drop_down"></b-icon>
                            </button>

                            <b-option
                                value="profile"
                                label="Logged as <b>Rafael Beraldo</b>"
                                subheader>
                            </b-option>
                            <b-option separator></b-option>
                            <b-option value="home" icon="home">Home</b-option>
                            <b-option value="products" icon="shopping_cart">Products</b-option>
                            <b-option value="blog" icon="art_track" disabled>Blog</b-option>
                            <b-option separator></b-option>
                            <b-option value="settings" icon="settings">Settings</b-option>
                            <b-option value="logout" icon="exit_to_app">Logout</b-option>
                        </b-dropdown>
                    </div>
                    <p><b>Selection:</b> {{ select }}</p>`,
                code4: `
                    export default {
                        data() {
                            return {
                                select: null
                            }
                        }
                    }`
            }
        }
    }
</script>
