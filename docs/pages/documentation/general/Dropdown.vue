<template>
    <div class="container">
        <h1 class="title is-spaced">Dropdown</h1>
        <h2 class="subtitle">
            Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content
        </h2>
        <hr>

        <p class="content">
            While it appear as a modal for tablet and smartphones,
            Dropdowns with <code>hoverable</code> prop won't change it's behavior to avoid any malfunction with hover.
        </p>
        <div class="example">
            <b-dropdown>
                <button class="button is-primary" slot="trigger">
                    <span>Click me!</span>
                    <b-icon icon="arrow_drop_down"></b-icon>
                </button>

                <b-dropdown-option>Action</b-dropdown-option>
                <b-dropdown-option>Another action</b-dropdown-option>
                <b-dropdown-option>Something else</b-dropdown-option>
            </b-dropdown>

            <b-dropdown hoverable>
                <button class="button is-info" slot="trigger">
                    <span>Hover me!</span>
                    <b-icon icon="arrow_drop_down"></b-icon>
                </button>

                <b-dropdown-option>Action</b-dropdown-option>
                <b-dropdown-option>Another action</b-dropdown-option>
                <b-dropdown-option>Something else</b-dropdown-option>
            </b-dropdown>

            <b-dropdown disabled>
                <button class="button" slot="trigger">
                    <span>Disabled</span>
                    <b-icon icon="arrow_drop_down"></b-icon>
                </button>

                <b-dropdown-option>Action</b-dropdown-option>
                <b-dropdown-option>Another action</b-dropdown-option>
                <b-dropdown-option>Something else</b-dropdown-option>
            </b-dropdown>

            <b-dropdown>
                <p class="tag is-success" slot="trigger">
                    Custom trigger
                </p>

                <b-dropdown-option>Action</b-dropdown-option>
                <b-dropdown-option>Another action</b-dropdown-option>
                <b-dropdown-option>Something else</b-dropdown-option>
            </b-dropdown>
        </div>
        <pre class="block" v-highlight><code class="html">{{ template1 | pre }}</code></pre>

        <hr>

        <h2 class="title is-spaced">Dropdown content and position</h2>
        <p class="content">Add the <code>subheader</code> prop to the option to add <strong>any type of content</strong>.</p>
        <div class="example is-paddingless">
            <nav class="navbar">
                <div class="navbar-brand">
                    <a class="navbar-item">
                        <img src="../../../assets/buefy.png" alt="Buefy">
                    </a>
                    <a class="navbar-item"><b-icon pack="fa" icon="github"></b-icon></a>
                    <a class="navbar-item"><b-icon pack="fa" icon="twitter"></b-icon></a>
                </div>

                <div class="navbar-menu">
                    <div class="navbar-end">
                        <b-dropdown v-model="navigation" position="is-bottom-left">
                            <a class="navbar-item" slot="trigger">
                                <span>Login</span>
                                <b-icon icon="arrow_drop_down"></b-icon>
                            </a>

                            <b-dropdown-option subheader paddingless>
                                <form action="">
                                    <div class="modal-card" style="width:300px;">
                                        <section class="modal-card-body">
                                            <b-field label="Email">
                                                <b-input
                                                    type="email"
                                                    placeholder="Your email"
                                                    required>
                                                </b-input>
                                            </b-field>

                                            <b-field label="Password">
                                                <b-input
                                                    type="password"
                                                    password-reveal
                                                    placeholder="Your password"
                                                    required>
                                                </b-input>
                                            </b-field>

                                            <b-checkbox>Remember me</b-checkbox>
                                        </section>
                                        <footer class="modal-card-foot">
                                            <button class="button is-primary">Login</button>
                                        </footer>
                                    </div>
                                </form>
                            </b-dropdown-option>
                        </b-dropdown>
                    </div>
                </div>
            </nav>
        </div>
        <pre class="block" v-highlight><code class="html">{{ template2 | pre }}</code></pre>

        <hr>

        <p class="content">Add the <code>has-link</code> prop to add a anchor tag / router-link, or <code>disabled</code> to disable an option.</p>
        <div class="example is-paddingless">
            <nav class="navbar">
                <div class="navbar-brand">
                    <a class="navbar-item">
                        <img src="../../../assets/buefy.png" alt="Buefy">
                    </a>
                    <a class="navbar-item"><b-icon pack="fa" icon="github"></b-icon></a>
                    <a class="navbar-item"><b-icon pack="fa" icon="twitter"></b-icon></a>
                </div>

                <div class="navbar-menu">
                    <div class="navbar-end">
                        <b-dropdown v-model="navigation" position="is-bottom-left">
                            <a class="navbar-item" slot="trigger">
                                <span>Menu</span>
                                <b-icon icon="arrow_drop_down"></b-icon>
                            </a>

                            <b-dropdown-option subheader>
                                Logged as <b>Rafael Beraldo</b>
                            </b-dropdown-option>
                            <hr class="dropdown-divider">
                            <b-dropdown-option has-link>
                                <a href="https://google.com" target="_blank">
                                    <b-icon icon="link"></b-icon>
                                    Google (link)
                                </a>
                            </b-dropdown-option>
                            <b-dropdown-option value="home">
                                <b-icon icon="home"></b-icon>
                                Home
                            </b-dropdown-option>
                            <b-dropdown-option value="products">
                                <b-icon icon="shopping_cart"></b-icon>
                                Products
                            </b-dropdown-option>
                            <b-dropdown-option value="blog" disabled>
                                <b-icon icon="art_track"></b-icon>
                                Blog
                            </b-dropdown-option>
                            <hr class="dropdown-divider">
                            <b-dropdown-option value="settings">
                                <b-icon icon="settings"></b-icon>
                                Settings
                            </b-dropdown-option>
                            <b-dropdown-option value="logout">
                                <b-icon icon="exit_to_app"></b-icon>
                                Logout (link)
                            </b-dropdown-option>
                        </b-dropdown>
                    </div>
                </div>
            </nav>
        </div>
        <pre class="block" v-highlight><code class="html">{{ template3 | pre }}</code></pre>
        <pre class="block" v-highlight><code class="javascript">{{ code3 | pre }}</code></pre>

        <hr>

        <h2 class="title">Customizing with v-model</h2>
        <div class="example">
            <b-dropdown v-model="isPublic">
                <button class="button is-primary" type="button" slot="trigger">
                    <template v-if="isPublic">
                        <b-icon icon="public"></b-icon>
                        <span>Public</span>
                    </template>
                    <template v-else>
                        <b-icon icon="people"></b-icon>
                        <span>Friends</span>
                    </template>
                    <b-icon icon="arrow_drop_down"></b-icon>
                </button>

                <b-dropdown-option :value="true">
                    <div class="media">
                        <b-icon class="media-left" icon="public"></b-icon>
                        <div class="media-content">
                            <h3>Public</h3>
                            <small>Everyone can see</small>
                        </div>
                    </div>
                </b-dropdown-option>

                <b-dropdown-option :value="false">
                    <div class="media">
                        <b-icon class="media-left" icon="people"></b-icon>
                        <div class="media-content">
                            <h3>Friends</h3>
                            <small>Only friends can see</small>
                        </div>
                    </div>
                </b-dropdown-option>
            </b-dropdown>
        </div>
        <pre class="block" v-highlight><code class="html">{{ template4 | pre }}</code></pre>
        <pre v-highlight><code class="javascript">{{ code4 | pre }}</code></pre>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <h3 class="subtitle">Dropdown</h3>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="dropdownProps" default-sort="name">
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
                <b-table :data="dropdownEvents" default-sort="name">
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
                <b-table :data="dropdownMethods" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
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
                <b-table :data="optionEvents" default-sort="name">
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
        </b-tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navigation: 'home',
                isPublic: true,
                dropdownProps: [
                    {
                        name: '<code>v-model</code>',
                        description: 'Binding value',
                        type: 'Any',
                        values: '—',
                        default: '<code>null</code>'
                    },
                    {
                        name: '<code>hoverable</code>',
                        description: 'Dropdown will be triggered by hover instead of click',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>position</code>',
                        description: 'Optional, position of the dropdown relative to the trigger',
                        type: 'String',
                        values: '<code>is-top-right</code>, <code>is-top-left</code>, <code>is-bottom-left</code>',
                        default: 'Bottom right'
                    },
                    {
                        name: '<code>disabled</code>',
                        description: 'Disables dropdown',
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
                    },
                    {
                        name: '<code>active-change</code>',
                        description: 'Triggers when dropdown is activated or deactivated (visibility of list)',
                        parameters: '<code>active: Boolean</code>'
                    }
                ],
                dropdownMethods: [
                    {
                        name: '<code>toggle</code>',
                        description: 'Toggle activation (dropdown list visibility)'
                    }
                ],
                optionProps: [
                    {
                        name: '<code>value</code>',
                        description: 'The value that will be returned on events and v-model',
                        type: 'Any',
                        values: '—',
                        default: '<code>null</code>'
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
                        name: '<code>has-link</code>',
                        description: 'Use it if your option is an anchor tag or <code>router-link</code>',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>paddingless</code>',
                        description: 'Remove padding',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    }
                ],
                optionEvents: [
                    {
                        name: '<code>click</code>',
                        description: 'Triggers when the option is clicked',
                        parameters: '—'
                    }
                ],
                template1: `
                <b-dropdown>
                    <button class="button is-primary" slot="trigger">
                        <span>Click me!</span>
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-dropdown-option>Action</b-dropdown-option>
                    <b-dropdown-option>Another action</b-dropdown-option>
                    <b-dropdown-option>Something else</b-dropdown-option>
                </b-dropdown>

                <b-dropdown hoverable>
                    <button class="button is-info" slot="trigger">
                        <span>Hover me!</span>
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-dropdown-option>Action</b-dropdown-option>
                    <b-dropdown-option>Another action</b-dropdown-option>
                    <b-dropdown-option>Something else</b-dropdown-option>
                </b-dropdown>

                <b-dropdown disabled>
                    <button class="button" slot="trigger">
                        <span>Disabled</span>
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-dropdown-option>Action</b-dropdown-option>
                    <b-dropdown-option>Another action</b-dropdown-option>
                    <b-dropdown-option>Something else</b-dropdown-option>
                </b-dropdown>

                <b-dropdown>
                    <p class="tag is-success" slot="trigger">
                        Custom trigger
                    </p>

                    <b-dropdown-option>Action</b-dropdown-option>
                    <b-dropdown-option>Another action</b-dropdown-option>
                    <b-dropdown-option>Something else</b-dropdown-option>
                </b-dropdown>`,
                template2: `
                <nav class="navbar">
                    <div class="navbar-brand">
                        <a class="navbar-item">
                            <img src="../../../assets/buefy.png" alt="Buefy">
                        </a>
                        <a class="navbar-item"><b-icon pack="fa" icon="github"></b-icon></a>
                        <a class="navbar-item"><b-icon pack="fa" icon="twitter"></b-icon></a>
                    </div>

                    <div class="navbar-menu">
                        <div class="navbar-end">
                            <b-dropdown v-model="navigation" position="is-bottom-left">
                                <a class="navbar-item" slot="trigger">
                                    <span>Login</span>
                                    <b-icon icon="arrow_drop_down"></b-icon>
                                </a>

                                <b-dropdown-option subheader paddingless>
                                    <form action="">
                                        <div class="modal-card" style="width:300px;">
                                            <section class="modal-card-body">
                                                <b-field label="Email">
                                                    <b-input
                                                        type="email"
                                                        placeholder="Your email"
                                                        required>
                                                    </b-input>
                                                </b-field>

                                                <b-field label="Password">
                                                    <b-input
                                                        type="password"
                                                        password-reveal
                                                        placeholder="Your password"
                                                        required>
                                                    </b-input>
                                                </b-field>

                                                <b-checkbox>Remember me</b-checkbox>
                                            </section>
                                            <footer class="modal-card-foot">
                                                <button class="button is-primary">Login</button>
                                            </footer>
                                        </div>
                                    </form>
                                </b-dropdown-option>
                            </b-dropdown>
                        </div>
                    </div>
                </nav>`,
                template3: `
                <nav class="navbar">
                    <div class="navbar-brand">
                        <a class="navbar-item">
                            <img src="../../../assets/buefy.png" alt="Buefy">
                        </a>
                        <a class="navbar-item"><b-icon pack="fa" icon="github"></b-icon></a>
                        <a class="navbar-item"><b-icon pack="fa" icon="twitter"></b-icon></a>
                    </div>

                    <div class="navbar-menu">
                        <div class="navbar-end">
                            <b-dropdown v-model="navigation" position="is-bottom-left">
                                <a class="navbar-item" slot="trigger">
                                    <span>Menu</span>
                                    <b-icon icon="arrow_drop_down"></b-icon>
                                </a>

                                <b-dropdown-option subheader>
                                    Logged as <b>Rafael Beraldo</b>
                                </b-dropdown-option>
                                <hr class="dropdown-divider">
                                <b-dropdown-option has-link>
                                    <a href="https://google.com" target="_blank">
                                        <b-icon icon="link"></b-icon>
                                        Google (link)
                                    </a>
                                </b-dropdown-option>
                                <b-dropdown-option value="home">
                                    <b-icon icon="home"></b-icon>
                                    Home
                                </b-dropdown-option>
                                <b-dropdown-option value="products">
                                    <b-icon icon="shopping_cart"></b-icon>
                                    Products
                                </b-dropdown-option>
                                <b-dropdown-option value="blog" disabled>
                                    <b-icon icon="art_track"></b-icon>
                                    Blog
                                </b-dropdown-option>
                                <hr class="dropdown-divider">
                                <b-dropdown-option value="settings">
                                    <b-icon icon="settings"></b-icon>
                                    Settings
                                </b-dropdown-option>
                                <b-dropdown-option value="logout">
                                    <b-icon icon="exit_to_app"></b-icon>
                                    Logout (link)
                                </b-dropdown-option>
                            </b-dropdown>
                        </div>
                    </div>
                </nav>`,
                code3: `
                export default {
                    data() {
                        return {
                            navigation: 'home'
                        }
                    }
                }`,
                template4: `
                <b-dropdown v-model="isPublic">
                    <button class="button is-primary" type="button" slot="trigger">
                        <template v-if="isPublic">
                            <b-icon icon="public"></b-icon>
                            <span>Public</span>
                        </template>
                        <template v-else>
                            <b-icon icon="people"></b-icon>
                            <span>Friends</span>
                        </template>
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-dropdown-option :value="true">
                        <div class="media">
                            <b-icon class="media-left" icon="public"></b-icon>
                            <div class="media-content">
                                <h3>Public</h3>
                                <small>Everyone can see</small>
                            </div>
                        </div>
                    </b-dropdown-option>

                    <b-dropdown-option :value="false">
                        <div class="media">
                            <b-icon class="media-left" icon="people"></b-icon>
                            <div class="media-content">
                                <h3>Friends</h3>
                                <small>Only friends can see</small>
                            </div>
                        </div>
                    </b-dropdown-option>
                </b-dropdown>`,
                code4: `
                export default {
                    data() {
                        return {
                            isPublic: true
                        }
                    }
                }`
            }
        }
    }
</script>
