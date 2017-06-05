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

            <b-dropdown disabled>
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

        <hr>

        <h2 class="title is-spaced">Within a nav</h2>
        <h3 class="subtitle">Note that you need a <code>overflow: visible</code> at the wrapper</h3>
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
                    <b-dropdown v-model="navigation" position="is-bottom-left">
                        <a class="nav-item" slot="trigger">
                            <span>Menu</span>
                            <b-icon icon="arrow_drop_down"></b-icon>
                        </a>

                        <b-dropdown-option subheader>
                            Logged as <b>Rafael Beraldo</b>
                        </b-dropdown-option>
                        <b-dropdown-option separator />
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
                        <b-dropdown-option separator />
                        <b-dropdown-option value="settings">
                            <b-icon icon="settings"></b-icon>
                            Settings
                        </b-dropdown-option>
                        <b-dropdown-option value="logout">
                            <b-icon icon="exit_to_app"></b-icon>
                            Logout
                        </b-dropdown-option>
                    </b-dropdown>
                </div>
            </nav>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template3 | pre }}</code></pre>
        <pre class="content" v-highlight><code class="javascript">{{ code3 | pre }}</code></pre>

        <hr>

        <h2 class="title">With addons</h2>
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
        <pre class="content" v-highlight><code class="html">{{ template5 | pre }}</code></pre>
        <pre v-highlight><code class="javascript">{{ code5 | pre }}</code></pre>

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
                        name: '<code>position</code>',
                        description: 'Position of the dropdown relative to the trigger',
                        type: 'String',
                        values: '<code>is-top-right</code>, <code>is-top-left</code>, <code>is-bottom-right</code>, <code>is-bottom-left</code>',
                        default: '<code>is-bottom-right</code>'
                    },
                    {
                        name: '<code>disabled</code>',
                        description: 'Disables dropdown',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
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
                </b-dropdown>

                <b-dropdown disabled>
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
                        <b-dropdown v-model="navigation" position="is-bottom-left">
                            <a class="nav-item" slot="trigger">
                                <span>Menu</span>
                                <b-icon icon="arrow_drop_down"></b-icon>
                            </a>

                            <b-dropdown-option subheader>
                                Logged as <b>Rafael Beraldo</b>
                            </b-dropdown-option>
                            <b-dropdown-option separator />
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
                            <b-dropdown-option separator />
                            <b-dropdown-option value="settings">
                                <b-icon icon="settings"></b-icon>
                                Settings
                            </b-dropdown-option>
                            <b-dropdown-option value="logout">
                                <b-icon icon="exit_to_app"></b-icon>
                                Logout
                            </b-dropdown-option>
                        </b-dropdown>
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
                code5: `
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
